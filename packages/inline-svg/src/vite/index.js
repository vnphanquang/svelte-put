import { preprocessor } from '../preprocessor/index.js';
import { resolveInlineSvgConfig, resolveSources } from '../preprocessor/internals.js';

/**
 * create a Vite plugin that wraps a Svelte preprocessor to
 * inline SVG from disk to source code at compile time
 * @param {import('../preprocessor/types.d.ts').SourceConfig[]} [sources]
 * @param {import('../preprocessor/types.d.ts').InlineSvgConfig} [config]
 * @returns {import('vite').Plugin}
 */
export function inlineSvg(sources, config) {
	const rConfig = resolveInlineSvgConfig(config);
	const rSources = resolveSources(sources);
	return {
		name: 'vite-plugin-svelte-preprocess-inline-svg',
		api: {
			sveltePreprocess: preprocessor(rSources, rConfig),
		},
	};
}
