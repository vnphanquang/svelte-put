import child_process from 'node:child_process';

import { externalLink } from '@svelte-put/preprocess-external-link';
import { toc } from '@svelte-put/toc/vite';
import adapter from '@sveltejs/adapter-cloudflare';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { gach } from '@vnphanquang/gach/vite';
import { defineConfig } from 'vite';
import { qrcode } from 'vite-plugin-qrcode';

import pkg from './package.json' with { type: 'json' };

const commitHash = child_process.execSync('git rev-parse --short HEAD').toString().trim();

export default defineConfig({
	server: { port: 4545 },
	plugins: [
		qrcode(),
		gach({ markdown: true }),
		enhancedImages(),
		sveltekit({
			adapter: adapter(),
			version: {
				name: `${pkg.version} (#${commitHash})@${Date.now()}`,
			},
			compilerOptions: {
				modernAst: true,
				experimental: {
					async: true,
				},
			},
			experimental: {
				remoteFunctions: true,
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
				compileToc: {
					autoDeclare: true,
				},
			},
		}),
	],
});
