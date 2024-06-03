import { resolveInlineSvgConfig, resolveSources, transform } from './internals.js';

/**
 * create a preprocessor that inlines SVG from disk to source code at compile time
 * @param {import('./types').SourceConfig | import('./types').SourceConfig[]} [sources] - sources to search for svg
 * @param {import('./types').InlineSvgConfig} [config] - global options to configure preprocessor input & output
 * @returns {import('svelte/compiler').PreprocessorGroup} - Svelte preprocessor interface
 */
export function inlineSvg(sources, config) {
	const rSources = resolveSources(sources);
	const rConfig = resolveInlineSvgConfig(config);

	return {
		name: 'preprocess-inline-svg',
		markup({ content, filename }) {
			if (!filename) return;
			return transform(content, filename, rSources, rConfig);
		},
	};
}

export default inlineSvg;
