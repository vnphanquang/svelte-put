import { resolveInlineSvgConfig, resolveSources, transform } from './internals.js';

/**
 * @param {import('./types').SourceConfig | import('./types').SourceConfig[]} [sources] - sources to search for svg
 * @param {import('./types').InlineSvgConfig} [config] - global options to configure preprocessor input & output
 * @returns {import('svelte/compiler').PreprocessorGroup}
 */
export function inlineSvg(sources, config) {
	const rSources = resolveSources(sources);
	const rConfig = resolveInlineSvgConfig(config);

	return {
		markup({ content, filename }) {
			if (!filename) return;
			return transform(content, filename, rSources, rConfig);
		},
	};
}

export default inlineSvg;
