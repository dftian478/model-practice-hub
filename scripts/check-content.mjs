import { readFile } from 'node:fs/promises';
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const docsDir = join(root, 'src/content/docs');
const policyFile = join(root, 'content-policy/sensitive-terms.txt');
const scanExtensions = new Set(['.md', '.mdx', '.yml', '.yaml', '.json', '.html']);

function walk(dir) {
	const files = [];
	for (const entry of readdirSync(dir)) {
		const path = join(dir, entry);
		const stat = statSync(path);
		if (stat.isDirectory()) files.push(...walk(path));
		else files.push(path);
	}
	return files;
}

function extension(path) {
	const match = path.match(/\.[^.]+$/);
	return match ? match[0] : '';
}

const terms = (await readFile(policyFile, 'utf8'))
	.split(/\r?\n/)
	.map((line) => line.trim())
	.filter((line) => line && !line.startsWith('#'));

const files = [
	...walk(docsDir),
	join(root, 'astro.config.mjs'),
	join(root, 'public/admin/config.yml'),
].filter((file) => scanExtensions.has(extension(file)) || file.endsWith('.mjs'));

const findings = [];

for (const file of files) {
	const text = await readFile(file, 'utf8');
	const lines = text.split(/\r?\n/);
	for (const term of terms) {
		const needle = term.toLowerCase();
		lines.forEach((line, index) => {
			if (line.toLowerCase().includes(needle)) {
				findings.push(`${relative(root, file)}:${index + 1} contains blocked term "${term}"`);
			}
		});
	}

	lines.forEach((line, index) => {
		if (/sk-[A-Za-z0-9_-]{20,}/.test(line)) {
			findings.push(`${relative(root, file)}:${index + 1} contains a possible API key`);
		}
		if (/@(company|corp|internal)\./i.test(line)) {
			findings.push(`${relative(root, file)}:${index + 1} contains a possible internal email/domain`);
		}
	});
}

if (findings.length > 0) {
	console.error('Content policy check failed:\n');
	for (const finding of findings) console.error(`- ${finding}`);
	process.exit(1);
}

console.log(`Content policy check passed for ${files.length} files.`);
