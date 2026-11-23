import path from 'node:path';

import { externalLink } from '@svelte-put/preprocess-external-link';
import { toc } from '@svelte-put/toc/vite';
import adapter from '@sveltejs/adapter-auto';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteDevtools } from '@sveltejs/vite-devtools-svelte';
import { gach } from '@vnphanquang/gach/vite';
import { myBad } from 'my-bad/vite';
import { defineConfig } from 'vite';
import { qrcode } from 'vite-plugin-qrcode';

export default defineConfig({
	devtools: { apply: 'serve' },
	server: { port: 4545 },
	plugins: [
		svelteDevtools(),
		myBad(),
		qrcode(),
		gach({ markdown: true }),
		enhancedImages(),
		sveltekit({
			adapter: adapter(),
			compilerOptions: {
				modernAst: true,
				experimental: {
					async: true,
				},
			},
			files: {
				appTemplate: path.resolve(import.meta.dirname, './app.html'),
			},
		}),
		externalLink(),
		toc({
			include: /doc\.svelte$/,
			preprocessor: {
				compileToc: {
					autoDeclare: true,
				},
			},
		}),
	],
});
