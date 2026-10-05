import { toc as createPreprocessor } from '../preprocessor/index.js';

/** @import { TocViteOptions, FilterIdSpecs } from './types.public.js' */
/** @import { Plugin, TransformResult } from 'vite' */

/**
 * create a Vite plugin wrapping a preprocessor that search for table of contents
 * @param {TocViteOptions} [options] - behavioral configurations
 * @returns {Plugin} - vite plugin that wraps a Svelte preprocessor
 */
export function toc(options = {}) {
	/** @type {FilterIdSpecs | null} */
	let svelteIdFilter = null;
	const preprocessor = createPreprocessor(options?.preprocessor);

	return {
		name: 'vite-plugin-svelte-preprocess-toc',
		configResolved(c) {
			svelteIdFilter = c.plugins.find((p) => p.name === 'vite-plugin-svelte:config')?.api?.filter
				.id;
		},

		transform: {
			/// reference: https://github.com/sveltejs/vite-plugin-svelte/blob/8d032b286f0e2374173258b9f1cbabc309fe0d3e/docs/advanced-usage.md#transform-svelte-files-with-vite-plugins
			order: 'pre',
			filter: {
				id: {
					include: options?.include || svelteIdFilter || /\.svelte$/,
					exclude: options?.exclude,
				},
			},
			async handler(content, filename) {
				return /** @type {TransformResult} */ (preprocessor.markup?.({ content, filename }));
			},
		},
	};
}

export * from './types.public.js';
