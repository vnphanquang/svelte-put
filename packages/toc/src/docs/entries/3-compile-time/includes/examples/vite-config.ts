import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

import { toc } from '@svelte-put/toc/vite'; // [!code ++]

export default defineConfig({
	plugins: [
		svelte(), // or import('@sveltejs/kit/vite').sveltekit
		// [!code ++:4]
		toc({
			// setting \`include\` field is recommended to avoid processing non-indexible files
			include: /content\.svelte$/,
		}),
	],
});
