import child_process from 'child_process';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import preaction from '@svelte-put/preaction/preprocess';
import autoSlug from '@svelte-put/preprocess-auto-slug';
import externalLink from '@svelte-put/preprocess-external-link';
import { markdown, enhanceCodeBlock } from '@svelte-put/preprocess-markdown';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const commitHash = child_process.execSync('git rev-parse --short HEAD').toString().trim();

/** @type {import('@sveltejs/kit').Config} */
export default {
	extensions: ['.md.svelte', '.svelte'],
	preprocess: [
		markdown(),
		preaction(),
		enhanceCodeBlock(),
		externalLink(['svelte-put.vnphanquang.com']),
		autoSlug((defaultOptions) => ({
			tags: ['h2', 'h3', 'h4', 'h5', 'h6'],
			anchor: {
				content: '#',
				position: 'prepend',
				properties: {
					...defaultOptions.anchor.properties,
					class: 'heading-anchor',
				},
			},
		})),
		vitePreprocess(),
	],
	kit: {
		prerender: {
			origin: 'https://svelte-put.vnphanquang.com',
		},
		adapter: adapter({
			routes: {
				include: ['/*'],
				exclude: ['<build>', '<prerendered>', '/pagefind/*', '/images/*'],
			},
		}),
		version: {
			name: `${pkg.version} (#${commitHash}@${Date.now()})`,
			// pollInterval: 10_000, // every 10 seconds
		},
		alias: {
			$routes: path.resolve(__dirname, 'src/routes'),
			$packages: path.resolve(__dirname, 'src/packages'),
			'@pagefind': path.resolve(__dirname, '/pagefind/pagefind.js'),
		},
	},
	compilerOptions: {
		modernAst: true,
	},
	vitePlugin: {
		inspector: {
			toggleKeyCombo: 'alt-shift',
			holdMode: true,
			showToggleButton: 'always',
			toggleButtonPos: 'bottom-left',
		},
	},
};
