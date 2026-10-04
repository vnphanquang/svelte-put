import { autoSlug } from '@svelte-put/preprocess-auto-slug';
import { externalLink } from '@svelte-put/preprocess-external-link';
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
			inspector: {
				toggleKeyCombo: 'alt-shift',
				holdMode: true,
				showToggleButton: 'always',
				toggleButtonPos: 'bottom-left',
			},
		}),
		externalLink(),
		autoSlug({
			preprocessor: (defaultOptions) => ({
				tags: ['h2', 'h3', 'h4', 'h5', 'h6'],
				anchor: {
					content: '#',
					position: 'prepend',
					properties: {
						...defaultOptions.anchor.properties,
						class: 'heading-anchor',
					},
				},
			}),
		}),
	],
});
