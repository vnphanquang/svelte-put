import path from 'path';

import { inlineSvg } from '@svelte-put/inline-svg/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import postcssColorScheme from 'postcss-color-scheme';
import postcssCustomMedia from 'postcss-custom-media';
import postcssCustomSelectors from 'postcss-custom-selectors';
import { defineConfig } from 'vite';

export default defineConfig({
	css: {
		postcss: {
			plugins: [postcssCustomMedia(), postcssCustomSelectors(), postcssColorScheme()],
		},
	},
	plugins: [
		inlineSvg(
			[
				{
					directories: [path.resolve(__dirname, 'src/lib/assets/images/svg')],
					attributes: {
						height: '24',
						width: '24',
					},
				},
			],
			{
				inlineSrcAttributeName: 'inline-src',
				typedef: true,
			},
		),
		enhancedImages(),
		sveltekit(),
	],
	define: {
		__BUILD_TIMESTAMP__: JSON.stringify(Date.now().toString()),
	},
	build: {
		rollupOptions: {
			external: ['/pagefind/pagefind.js'],
		},
	},
	assetsInclude: '**/pagefind.js',
	server: {
		fs: {
			strict: false,
		},
	},
});
