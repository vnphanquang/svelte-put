import { rm } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import * as pagefind from 'pagefind';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BUILD_PATH = path.resolve(__dirname, '../.svelte-kit/cloudflare');
const OUTPUT_PATH = path.resolve(__dirname, '../static/pagefind');

const { index } = await pagefind.createIndex();
await index.addDirectory({
	path: BUILD_PATH,
});

await index.writeFiles({
	outputPath: OUTPUT_PATH,
})

const EXCLUDE_PATHS = [
	'pagefind-highlight.js',
	'pagefind-modular-ui.css',
	'pagefind-modular-ui.js',
	'pagefind-ui.css',
	'pagefind-ui.js',
];
await Promise.allSettled(EXCLUDE_PATHS.map(f => rm(path.join(OUTPUT_PATH, f))));

// clean up once complete
await pagefind.close();

