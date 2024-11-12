import path from 'path';

// import postcssGlobalData from '@csstools/postcss-global-data';
import { inlineSvg } from '@svelte-put/inline-svg/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
// import tailwindcss from '@tailwindcss/postcss';
import postcssCustomMedia from 'postcss-custom-media';
import postcssCustomSelectors from 'postcss-custom-selectors';
import postcssMixins from 'postcss-mixins';
import { defineConfig } from 'vite';

export default defineConfig({
	css: {
		transformer: 'postcss',
		postcss: {
			plugins: [
				// postcssGlobalData({
				// 	files: [
				// 		path.resolve(__dirname, 'src/lib/styles/globals/custom-medias.css'),
				// 		path.resolve(__dirname, 'src/lib/styles/globals/custom-selectors.css'),
				// 	],
				// }),
				// postcssMixins({
				// 	mixinsDir: path.resolve(__dirname, 'src/lib/styles/globals/mixins'),
				// }),
				postcssMixins(),
				postcssCustomMedia(),
				postcssCustomSelectors(),
				// tailwindcss(),
			],
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
		tailwindcss(),
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
