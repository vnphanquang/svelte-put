/** @import { TocAttributes, ResolvedTocAttributes, TocAttributesResolver } from './types.public' */

/**
 * @param {ResolvedTocAttributes} defaults
 * @param {TocAttributes | TocAttributesResolver} [props]
 * @returns {ResolvedTocAttributes}
 */
export function resolveAttributesOptions(defaults, props) {
	if (!props) return defaults;
	if (typeof props === 'function') return props;
	return () => props;
}
