import path from 'path';

import { inlineSvg } from '@svelte-put/inline-svg/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [
		inlineSvg([{
			directories: [path.resolve(__dirname, 'src/lib/assets/images/svg')],
			attributes: {
				height: '24',
				width: '24',
			},
		}], {
			inlineSrcAttributeName: 'inline-src',
			typedef: path.resolve(__dirname, 'src/static-svg.generated.d.ts')
		}),
		enhancedImages(),
		sveltekit(),
	],
	define: {
		__BUILD_TIMESTAMP__: JSON.stringify(Date.now().toString()),
	},
	server: {
		fs: {
			strict: false,
		},
	},
};

export default config;

