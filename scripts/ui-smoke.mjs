import { createServer } from 'node:http';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';

const root = process.cwd();
const distDir = join(root, 'dist');
const basePath = process.env.UI_BASE_PATH ?? '/model-practice-hub';
const externalOrigin = process.env.UI_ORIGIN?.replace(/\/$/, '');
const chromeCandidates = [
	process.env.CHROME_PATH,
	'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
	'/Applications/Chromium.app/Contents/MacOS/Chromium',
	'/usr/bin/google-chrome',
	'/usr/bin/google-chrome-stable',
	'/usr/bin/chromium',
	'/usr/bin/chromium-browser',
].filter(Boolean);
const chromePath = chromeCandidates.find((candidate) => existsSync(candidate));

const mimeTypes = {
	'.css': 'text/css; charset=utf-8',
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.webp': 'image/webp',
	'.xml': 'application/xml; charset=utf-8',
};

function listen(server) {
	return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server.address().port)));
}

function servePath(urlPath) {
	let path = decodeURIComponent(urlPath.split('?')[0] ?? '/');
	if (path === basePath) path = `${basePath}/`;
	if (path.startsWith(`${basePath}/`)) path = path.slice(basePath.length);
	if (path === '/') return join(distDir, 'index.html');
	const fullPath = join(distDir, path);
	if (existsSync(fullPath) && statSync(fullPath).isDirectory()) return join(fullPath, 'index.html');
	return fullPath;
}

function startServer() {
	const server = createServer((req, res) => {
		const file = servePath(req.url ?? '/');
		if (!existsSync(file) || statSync(file).isDirectory()) {
			res.writeHead(404).end('Not found');
			return;
		}
		res.writeHead(200, { 'content-type': mimeTypes[extname(file)] ?? 'application/octet-stream' });
		createReadStream(file).pipe(res);
	});
	return listen(server).then((port) => ({ server, port }));
}

function waitForProcessExit(child, timeoutMs = 2_000) {
	if (child.exitCode !== null || child.signalCode !== null) return Promise.resolve();
	return new Promise((resolve) => {
		const timer = setTimeout(resolve, timeoutMs);
		child.once('exit', () => {
			clearTimeout(timer);
			resolve();
		});
	});
}

async function removeDir(path) {
	for (let attempt = 0; attempt < 5; attempt += 1) {
		try {
			await rm(path, { recursive: true, force: true });
			return;
		} catch (error) {
			if (attempt === 4) throw error;
			await new Promise((resolve) => setTimeout(resolve, 300));
		}
	}
}

async function waitForJson(url, timeoutMs = 30_000) {
	const deadline = Date.now() + timeoutMs;
	while (Date.now() < deadline) {
		try {
			const response = await fetch(url);
			if (response.ok) return await response.json();
		} catch {}
		await new Promise((resolve) => setTimeout(resolve, 150));
	}
	throw new Error(`Timed out waiting for ${url}`);
}

function createCdpClient(webSocketUrl) {
	let id = 0;
	const pending = new Map();
	const events = new Map();
	const socket = new WebSocket(webSocketUrl);

	socket.addEventListener('message', (event) => {
		const message = JSON.parse(event.data);
		if (message.id && pending.has(message.id)) {
			const { resolve, reject } = pending.get(message.id);
			pending.delete(message.id);
			message.error ? reject(new Error(message.error.message)) : resolve(message.result);
			return;
		}
		if (message.method && events.has(message.method)) {
			for (const resolve of events.get(message.method).splice(0)) resolve(message.params);
		}
	});

	const ready = new Promise((resolve, reject) => {
		socket.addEventListener('open', resolve, { once: true });
		socket.addEventListener('error', reject, { once: true });
	});

	return {
		async send(method, params = {}) {
			await ready;
			const messageId = ++id;
			socket.send(JSON.stringify({ id: messageId, method, params }));
			return new Promise((resolve, reject) => pending.set(messageId, { resolve, reject }));
		},
		once(method) {
			return new Promise((resolve) => {
				if (!events.has(method)) events.set(method, []);
				events.get(method).push(resolve);
			});
		},
		close() {
			socket.close();
		},
	};
}

async function evaluated(cdp, expression) {
	const result = await cdp.send('Runtime.evaluate', {
		expression,
		awaitPromise: true,
		returnByValue: true,
	});
	if (result.exceptionDetails) {
		const detail = result.exceptionDetails.exception?.description ?? result.exceptionDetails.text;
		throw new Error(detail);
	}
	return result.result.value;
}

async function waitFor(cdp, expression, label, timeoutMs = 8_000) {
	const deadline = Date.now() + timeoutMs;
	while (Date.now() < deadline) {
		if (await evaluated(cdp, expression)) return;
		await new Promise((resolve) => setTimeout(resolve, 150));
	}
	throw new Error(`Timed out waiting for ${label}`);
}

async function navigate(cdp, url) {
	const loaded = cdp.once('Page.loadEventFired');
	await cdp.send('Page.navigate', { url });
	await loaded;
}

async function clickSelector(cdp, selector, label = selector) {
	await waitFor(
		cdp,
		`Array.from(document.querySelectorAll(${JSON.stringify(selector)})).some((el) => {
			const rect = el.getBoundingClientRect();
			const style = getComputedStyle(el);
			return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
		})`,
		label
	);
	const box = await evaluated(
		cdp,
		`(() => {
			const el = Array.from(document.querySelectorAll(${JSON.stringify(selector)})).find((candidate) => {
				const rect = candidate.getBoundingClientRect();
				const style = getComputedStyle(candidate);
				return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
			});
			if (!el) return null;
			el.scrollIntoView({ block: 'center', inline: 'center' });
			const rect = el.getBoundingClientRect();
			return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
		})()`
	);
	if (!box) throw new Error(`Missing clickable element: ${label}`);
	await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: box.x, y: box.y });
	await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: box.x, y: box.y, button: 'left', clickCount: 1 });
	await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: box.x, y: box.y, button: 'left', clickCount: 1 });
}

async function selectValue(cdp, selector, value, label = selector) {
	await waitFor(cdp, `!!document.querySelector(${JSON.stringify(selector)})`, label);
	const changed = await evaluated(
		cdp,
		`(() => {
			const el = document.querySelector(${JSON.stringify(selector)});
			if (!el) return false;
			el.value = ${JSON.stringify(value)};
			el.dispatchEvent(new Event('change', { bubbles: true }));
			return true;
		})()`
	);
	if (!changed) throw new Error(`Missing select element: ${label}`);
}

async function run() {
	if (!chromePath) throw new Error(`Chrome was not found. Set CHROME_PATH or install Chrome/Chromium.`);
	if (!globalThis.WebSocket) throw new Error('This Node.js runtime does not provide WebSocket.');

	const localServer = externalOrigin ? null : await startServer();
	const userDataDir = await mkdtemp(join(tmpdir(), 'model-practice-hub-chrome-'));
	const debugPort = 30_000 + Math.floor(Math.random() * 10_000);
	const chrome = spawn(chromePath, [
		'--headless=new',
		'--remote-debugging-address=127.0.0.1',
		`--remote-debugging-port=${debugPort}`,
		`--user-data-dir=${userDataDir}`,
		'--no-sandbox',
		'--disable-dev-shm-usage',
		'--disable-gpu',
		'--no-first-run',
		'--no-default-browser-check',
		'about:blank',
	], { stdio: 'ignore' });

	try {
		await waitForJson(`http://127.0.0.1:${debugPort}/json/version`);
		const targets = await waitForJson(`http://127.0.0.1:${debugPort}/json/list`);
		const pageTarget = targets.find((target) => target.type === 'page' && target.webSocketDebuggerUrl);
		if (!pageTarget) throw new Error('Chrome did not expose a debuggable page target.');
		const cdp = createCdpClient(pageTarget.webSocketDebuggerUrl);
		await cdp.send('Page.enable');
		await cdp.send('Runtime.enable');
		await cdp.send('Input.setIgnoreInputEvents', { ignore: false });

		const origin = externalOrigin ?? `http://127.0.0.1:${localServer.port}${basePath}`;
		await navigate(cdp, `${origin}/`);
		await waitFor(cdp, 'document.documentElement?.lang === "zh-CN" && document.body?.innerText.includes("模型实践中心")', 'Chinese home');
		await clickSelector(cdp, 'a[href="openai/"]', 'Chinese OpenAI hero button');
		await waitFor(cdp, `location.pathname === "${basePath}/openai/" && document.body?.innerText.includes("OpenAI 实践指南")`, 'Chinese OpenAI page');
		await clickSelector(cdp, 'a[href="../quickstart/"], a[href="./quickstart/"]', 'OpenAI quickstart link');
		await waitFor(cdp, `location.pathname === "${basePath}/openai/quickstart/" && document.body?.innerText.includes("快速开始")`, 'Chinese quickstart page');

		await navigate(cdp, `${origin}/`);
		await selectValue(cdp, 'starlight-lang-select select', `${basePath}/en/`, 'language switcher');
		await waitFor(
			cdp,
			`location.pathname === "${basePath}/en/" && document.documentElement?.lang === "en" && document.body?.innerText.includes("Model Practice Hub") && !!document.querySelector('a[href="openai/"]')`,
			'English home'
		);
		await clickSelector(cdp, 'a[href="openai/"]', 'English OpenAI hero button');
		await waitFor(cdp, `location.pathname === "${basePath}/en/openai/" && document.body?.innerText.includes("OpenAI Practice Guide")`, 'English OpenAI page');

		await navigate(cdp, `${origin}/`);
		await selectValue(cdp, 'starlight-theme-select select', 'light', 'theme switcher');
		await waitFor(cdp, 'document.documentElement?.dataset.theme === "light"', 'light theme');
		await selectValue(cdp, 'starlight-theme-select select', 'dark', 'theme switcher');
		await waitFor(cdp, 'document.documentElement?.dataset.theme === "dark"', 'dark theme');

		await waitFor(cdp, '!document.querySelector("site-search button[data-open-modal]")?.disabled', 'search button enabled', 12_000);
		await clickSelector(cdp, 'site-search button[data-open-modal]', 'search button');
		await waitFor(cdp, 'document.querySelector("site-search dialog")?.open === true', 'search dialog');

		cdp.close();
		console.log('UI smoke test passed.');
	} finally {
		chrome.kill('SIGTERM');
		await waitForProcessExit(chrome);
		if (chrome.exitCode === null && chrome.signalCode === null) {
			chrome.kill('SIGKILL');
			await waitForProcessExit(chrome);
		}
		localServer?.server.close();
		await removeDir(userDataDir);
	}
}

run().catch((error) => {
	console.error(error.message);
	process.exit(1);
});
