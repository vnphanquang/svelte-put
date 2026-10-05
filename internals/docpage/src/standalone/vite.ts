import path from 'node:path';

import { externalLink } from '@svelte-put/preprocess-external-link';
import { toc } from '@svelte-put/toc/vite';
import adapter from '@sveltejs/adapter-auto';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { gach } from '@vnphanquang/gach/vite';
import { defineConfig } from 'vite';
import { qrcode } from 'vite-plugin-qrcode';

export default defineConfig({
	server: { port: 4545 },
	plugins: [
		qrcode(),
		gach({ markdown: true }),
		enhancedImages(),
		// FIXME: add auto-slug, inline-svg, external-link, etc.
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
			inspector: {
				toggleKeyCombo: 'alt-shift',
				holdMode: true,
				showToggleButton: 'always',
				toggleButtonPos: 'bottom-left',
			},
		}),
		externalLink(),
		toc({
			include: /doc\.svelte$/,
			preprocessor: {
				anchor: {
					properties: (defaultProps) => ({
						...defaultProps,
						class: 'heading-anchor',
					}),
				},
				autoDeclare: true,
			},
		}),
	],
});
