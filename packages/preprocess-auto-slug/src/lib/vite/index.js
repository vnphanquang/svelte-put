import { autoSlug as createPreprocessor } from '../preprocessor/index.js';

/** @import { AutoSlugViteOptions, FilterIdSpecs } from './types.public.js' */
/** @import { Plugin, TransformResult } from 'vite' */

/**
 * create a Vite plugin wrapping a preprocessor that slugifies matching elements in svelte markup
 * @param {AutoSlugViteOptions} [options] - behavioral configurations
 * @returns {Plugin} - vite plugin that wraps a Svelte preprocessor
 */
export function autoSlug(options = {}) {
	/** @type {FilterIdSpecs | null} */
	let svelteIdFilter = null;
	const preprocessor = createPreprocessor(options.preprocessor);

	return {
		name: 'vite-plugin-svelte-preprocess-auto-slug',
		configResolved(c) {
			svelteIdFilter = c.plugins.find((p) => p.name === 'vite-plugin-svelte:config')?.api?.filter
				.id;
		},

		transform: {
			/// reference: https://github.com/sveltejs/vite-plugin-svelte/blob/8d032b286f0e2374173258b9f1cbabc309fe0d3e/docs/advanced-usage.md#transform-svelte-files-with-vite-plugins
			order: 'pre',
			filter: {
				id: {
					include: options.include || svelteIdFilter || /\.svelte$/,
					exclude: options.exclude,
				},
			},
			async handler(content, filename) {
				return /** @type {TransformResult} */ (preprocessor.markup?.({ content, filename }));
			},
		},
	};
}

export * from './types.public.js';
