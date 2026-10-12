import { resolveAttributesOptions } from '../attributes/options.js';

/** @import { ResolvedTocAnchor, TocAnchorOptions } from './types.public' */

/**
 * @param {TocAnchorOptions | boolean} [options]
 * @returns {ResolvedTocAnchor}
 */
export function resolveAnchorOptions(options) {
	const defaults = DEFAULT_ANCHOR_OPTIONS;
	if (options === undefined || options === null) return { ...defaults };
	if (typeof options === 'boolean') {
		return { ...defaults, enabled: options };
	}
	return {
		...defaults,
		...options,
		attributes: resolveAttributesOptions(defaults.attributes, options.attributes),
	};
}

export const DEFAULT_ANCHOR_OPTIONS = /** @type {ResolvedTocAnchor} */ ({
	enabled: true,
	position: 'content',
	content: '#',
	attributes: ({ defaults }) => defaults,
	href: (slug) => `#${slug}`,
});
