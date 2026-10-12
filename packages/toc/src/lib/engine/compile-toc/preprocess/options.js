/** @import { CompileTocOptions, ResolvedCompileToc } from './types.public' */

/**
 * @param {CompileTocOptions} [options]
 * @returns {ResolvedCompileToc}
 */
export function resolveCompileTocOptions(options) {
	const defaults = DEFAULT_COMPILE_TOC_OPTIONS;
	if (!options) return { ...defaults };
	return {
		...defaults,
		...options,
		autoDeclare: resolveAutoDeclare(options.autoDeclare),
	};
}

/**
 * @param {CompileTocOptions['autoDeclare']} [options]
 * @returns {ResolvedCompileToc['autoDeclare']}
 */
export function resolveAutoDeclare(options) {
	const defaults = DEFAULT_COMPILE_TOC_OPTIONS.autoDeclare;
	if (options === undefined || options === null) return { ...defaults };
	if (typeof options === 'boolean') {
		return { ...defaults, enabled: () => options };
	}

	const enabled = options.enabled;
	return {
		...defaults,
		...options,
		enabled: typeof enabled === 'function' ? enabled : () => enabled,
	};
}

export const DEFAULT_COMPILE_TOC_OPTIONS = /** @type {ResolvedCompileToc} */ ({
	importSource: '@svelte-put/toc',
	autoDeclare: {
		enabled: () => false,
		identifier: 'toc',
	},
});
