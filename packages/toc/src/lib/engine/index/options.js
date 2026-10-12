import { resolveAttributesOptions } from '../attributes/options.js';

/** @import { TocIndexOptions, TocRuntimeIndexOptions, ResolvedTocIndex, TocSharedIndexOptions } from './types.public' */

/**
 * @template {boolean} [R=false]
 * @template {TocRuntimeIndexOptions | TocIndexOptions} [O=R extends true ? TocRuntimeIndexOptions : TocIndexOptions]
 * @param {O | undefined} options
 * @param {R} [runtime]
 * @returns {ResolvedTocIndex<R>}
 */
export function resolveIndexOptions(options, runtime = /** @type {R} */ (false)) {
	const defaults = /** @type {ResolvedTocIndex<R>} */ (
		/** @type {unknown} */ (runtime ? DEFAULT_RUNTIME_INDEX_OPTIONS : DEFAULT_INDEX_OPTIONS)
	);
	if (!options) return { ...defaults };
	return {
		...defaults,
		...options,
		attributes: resolveAttributesOptions(defaults.attributes, options.attributes),
	};
}

export const SHARED_OPTIONS = /** @type {TocSharedIndexOptions} */ ({
	idAttribute: 'id',
	slug: ({ generated }) => generated,
	attributes: ({ defaults }) => defaults,
});

export const DEFAULT_INDEX_OPTIONS = /** @type {ResolvedTocIndex} */ ({
	...SHARED_OPTIONS,
	tags: ['h2', 'h3', 'h4', 'h5', 'h6'],
});

export const DEFAULT_RUNTIME_INDEX_OPTIONS = /** @type {ResolvedTocIndex<true>} */ ({
	...SHARED_OPTIONS,
	selector: ':is(h2, h3, h4, h5, h6)',
});
