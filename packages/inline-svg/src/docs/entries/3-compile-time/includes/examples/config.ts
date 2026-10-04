import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

import { inlineSvg } from '@svelte-put/inline-svg/vite';

export default defineConfig({
	plugins: [
		svelte(), // or import('@sveltejs/kit/vite').sveltekit
		inlineSvg([
			// [!code info:13]
			{
				directories: 'src/assets/icons',
				attributes: {
					class: 'icon',
					width: '20',
					height: '20',
				},
			},
			{
				directories: 'src/assets/pictograms',
			},
		]),
	],
});
