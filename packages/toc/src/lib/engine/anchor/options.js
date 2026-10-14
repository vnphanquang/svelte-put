import { resolveAttributesOptions } from '../attributes/options.js';

/** @import { ResolvedTocAnchor, ResolvedTocAnchorPosition, TocAnchorOptions } from './types.public' */

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
		position: resolveAnchorPosition(options.position),
		attributes: resolveAttributesOptions(defaults.attributes, options.attributes),
	};
}

/**
 * @param {TocAnchorOptions['position']} position
 * @returns {ResolvedTocAnchorPosition}
 */
function resolveAnchorPosition(position) {
	const defaults = DEFAULT_ANCHOR_OPTIONS.position;
	if (!position) return { ...defaults };
	if (Array.isArray(position)) {
		return {
			try: position[0],
			fallback: position[1],
		};
	}
	return {
		...defaults,
		try: position,
	};
}

const DEFAULT_ANCHOR_OPTIONS = /** @type {ResolvedTocAnchor} */ ({
	enabled: true,
	position: {
		try: 'content',
		fallback: 'prepend',
	},
	content: '#',
	attributes: ({ defaults }) => defaults,
	href: (slug) => `#${slug}`,
});
