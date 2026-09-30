import child_process from 'node:child_process';

import adapter from '@sveltejs/adapter-cloudflare';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { gach } from '@vnphanquang/gach/vite';
import { defineConfig } from 'vite';
import { qrcode } from 'vite-plugin-qrcode';

import pkg from './package.json' with { type: 'json' };
// import { autoSlug } from '@svelte-put/preprocess-auto-slug';
// import { externalLink } from '@svelte-put/preprocess-external-link';

const commitHash = child_process.execSync('git rev-parse --short HEAD').toString().trim();

export default defineConfig({
	server: { port: 4545 },
	plugins: [
		qrcode(),
		gach({ markdown: true }),
		enhancedImages(),
		// FIXME: add auto-slug, inline-svg, external-link, etc.
		// autoSlug((defaultOptions) => ({
		// 	include: /data\/posts\/.*\.svelte$/,
		// 	tags: ['h2', 'h3', 'h4', 'h5', 'h6'],
		// 	anchor: {
		// 		content: '#',
		// 		position: 'prepend',
		// 		properties: {
		// 			...defaultOptions.anchor?.properties,
		// 			class: 'heading-anchor',
		// 		},
		// 	},
		// })),
		// externalLink(['vnphanquang.com']),
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
				explicitEnvironmentVariables: true,
			},
			inspector: {
				toggleKeyCombo: 'alt-shift',
				holdMode: true,
				showToggleButton: 'always',
				toggleButtonPos: 'bottom-left',
			},
		}),
	],
});
