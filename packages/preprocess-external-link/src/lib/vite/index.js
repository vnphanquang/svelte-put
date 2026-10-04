import { externalLink as createPreprocessor } from '../preprocessor/index.js';

/** @import { ExternalLinkViteOptions, FilterIdSpecs } from './types.public.js' */
/** @import { ExternalLinkPreprocessorOptions } from '../preprocessor' */
/** @import { Plugin, TransformResult } from 'vite' */

/**
 * create a Vite plugin wrapping a preprocessor that searches for external links and adds appropriate attributes
 * @param {ExternalLinkViteOptions | ExternalLinkPreprocessorOptions['hosts']} [input] - behavioral configurations
 * @returns {Plugin} - vite plugin that wraps a Svelte preprocessor
 */
export function externalLink(input = {}) {
	/** @type {FilterIdSpecs | null} */
	let svelteIdFilter = null;
	const preprocessor = createPreprocessor(Array.isArray(input) ? input : input.preprocessor);
	const { include, exclude } = Array.isArray(input) ? {} : input;

	return {
		name: 'vite-plugin-svelte-preprocess-external-link',
		configResolved(c) {
			svelteIdFilter = c.plugins.find((p) => p.name === 'vite-plugin-svelte:config')?.api?.filter
				.id;
		},

		transform: {
			/// reference: https://github.com/sveltejs/vite-plugin-svelte/blob/8d032b286f0e2374173258b9f1cbabc309fe0d3e/docs/advanced-usage.md#transform-svelte-files-with-vite-plugins
			order: 'pre',
			filter: {
				id: {
					include: include || svelteIdFilter || /\.svelte$/,
					exclude,
				},
			},
			async handler(content, filename) {
				return /** @type {TransformResult} */ (preprocessor.markup?.({ content, filename }));
			},
		},
	};
}

export * from './types.public.js';
