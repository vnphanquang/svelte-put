import path from 'path';
import { fileURLToPath } from 'url';

import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import inlineSvg from '@svelte-put/preprocess-inline-svg';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		inlineSvg(
			[
				{
					directories: [path.resolve(__dirname, 'src/lib/assets/svg')],
					attributes: {
						height: '24',
						width: '24',
					},
				},
			],
		),
		vitePreprocess(),
	],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
