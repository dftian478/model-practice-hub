import { readFile } from 'node:fs/promises';
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const docsDir = join(root, 'src/content/docs');
const placeholderUrl = 'https://api.example.com/v1';
const placeholderKey = 'replace-with-your-key';
const allowedModels = new Set(['gpt-5.5', 'gpt-5.4-mini', 'gpt-5.4-nano']);

function walk(dir) {
	const files = [];
	for (const entry of readdirSync(dir)) {
		const path = join(dir, entry);
		const stat = statSync(path);
		if (stat.isDirectory()) files.push(...walk(path));
		else if (path.endsWith('.md') || path.endsWith('.mdx')) files.push(path);
	}
	return files;
}

function extractBlocks(text, language) {
	const blocks = [];
	const fence = new RegExp(`(^|\\n)\\\`\\\`\\\`${language}\\n([\\s\\S]*?)\\n\\\`\\\`\\\``, 'g');
	for (const match of text.matchAll(fence)) blocks.push(match[2]);
	return blocks;
}

function normalizeShell(block) {
	return block
		.replaceAll('https://api.example.com/v1', 'http://127.0.0.1:9/v1')
		.replaceAll('replace-with-your-key', 'test-redacted-key');
}

function captureCurl(block) {
	const script = `
curl() {
  node - "$@" <<'NODE'
const args = process.argv.slice(2);
const headers = [];
let url = '';
let data = '';
for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  if (arg === '-H' || arg === '--header') {
    headers.push(args[++i]);
  } else if (arg === '-d' || arg === '--data' || arg === '--data-raw' || arg === '--data-binary') {
    data = args[++i];
  } else if (!arg.startsWith('-') && !url) {
    url = arg;
  }
}
console.log(JSON.stringify({ url, headers, data }));
NODE
}
${normalizeShell(block)}
`;
	const result = spawnSync('bash', ['-lc', script], {
		encoding: 'utf8',
		env: {
			...process.env,
			OPENAI_BASE_URL: 'http://127.0.0.1:9/v1',
			OPENAI_API_KEY: 'test-redacted-key',
			MODEL_NAME: 'gpt-5.5',
		},
	});
	if (result.status !== 0) return { error: result.stderr || result.stdout || `exit ${result.status}` };
	try {
		return { captured: JSON.parse(result.stdout.trim().split(/\r?\n/).at(-1)) };
	} catch (error) {
		return { error: `could not parse fake curl output: ${error.message}` };
	}
}

const findings = [];
let curlCount = 0;
let exportCount = 0;

for (const file of walk(docsDir)) {
	const rel = relative(root, file);
	const text = await readFile(file, 'utf8');
	if (/\bPA\b|pa\//.test(text)) findings.push(`${rel} contains PA-specific text`);
	if (/sk-[A-Za-z0-9_-]{20,}/.test(text)) findings.push(`${rel} contains a possible real API key`);
	if (/https?:\/\/(?!api\.example\.com\b|developers\.openai\.com\b|openai\.com\b)[^\s)"'`<>]+/i.test(text)) {
		findings.push(`${rel} contains a non-placeholder or non-official URL`);
	}

	for (const block of extractBlocks(text, 'bash')) {
		if (block.includes('export OPENAI_BASE_URL')) {
			exportCount += 1;
			if (!block.includes(`export OPENAI_BASE_URL="${placeholderUrl}"`)) {
				findings.push(`${rel} has an OPENAI_BASE_URL export that is not the placeholder URL`);
			}
			if (!block.includes(`export OPENAI_API_KEY="${placeholderKey}"`)) {
				findings.push(`${rel} has an OPENAI_API_KEY export that is not the placeholder key`);
			}
		}

		if (!/\bcurl\b/.test(block)) continue;
		curlCount += 1;
		if (!block.includes('$OPENAI_BASE_URL/responses')) {
			findings.push(`${rel} curl example does not call "$OPENAI_BASE_URL/responses"`);
		}
		if (!block.includes('Authorization: Bearer $OPENAI_API_KEY')) {
			findings.push(`${rel} curl example does not use OPENAI_API_KEY`);
		}
		if (!block.includes('"model": "\'"$MODEL_NAME"\'"')) {
			findings.push(`${rel} curl example does not use MODEL_NAME interpolation`);
		}

		const { captured, error } = captureCurl(block);
		if (error || !captured) {
			findings.push(`${rel} curl example did not run in the local fake curl harness: ${error}`);
			continue;
		}
		if (captured.url !== 'http://127.0.0.1:9/v1/responses') {
			findings.push(`${rel} curl example did not target the configured /v1/responses URL`);
		}
		if (!captured.headers.some((header) => header === 'Authorization: Bearer test-redacted-key')) {
			findings.push(`${rel} curl example did not send the redacted bearer token`);
		}
		try {
			const payload = JSON.parse(captured.data);
			if (!allowedModels.has(payload.model)) {
				findings.push(`${rel} curl payload uses unexpected model "${payload.model}"`);
			}
			if (typeof payload.input !== 'string' || payload.input.length === 0) {
				findings.push(`${rel} curl payload is missing a non-empty input string`);
			}
			if (!Number.isInteger(payload.max_output_tokens) || payload.max_output_tokens < 1) {
				findings.push(`${rel} curl payload is missing a positive max_output_tokens integer`);
			}
		} catch (error) {
			findings.push(`${rel} curl payload is not valid JSON: ${error.message}`);
		}
	}
}

if (curlCount === 0) findings.push('No curl examples were found');
if (exportCount === 0) findings.push('No shared environment export blocks were found');

if (findings.length > 0) {
	console.error('Curl example check failed:\n');
	for (const finding of findings) console.error(`- ${finding}`);
	process.exit(1);
}

console.log(`Curl example check passed for ${curlCount} curl examples and ${exportCount} setup blocks.`);
