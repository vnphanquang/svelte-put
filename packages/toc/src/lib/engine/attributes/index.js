/** @import { TocItem } from '../toc/types.public' */
/** @import { TocAttributesResolver, TocAttributes } from './types.public' */

/**
 * @typedef ResolveAttributesInput
 * @property {TocItem[]} items
 * @property {TocItem} item
 * @property {TocAttributesResolver} resolver
 * @property {TocAttributes} defaults
 */

/**
 * @param {ResolveAttributesInput} input
 * @returns {{ map: Record<string, string>; str: string }}
 */
export function resolveAttributes(input) {
	const { defaults, ...rest } = input;
	const map = input.resolver({
		...rest,
		defaults: defaults,
	});
	const str = Object.entries(map)
		.map(([key, value]) => {
			if (value === '') return key;
			return `${key}="${value}"`;
		})
		.join(' ');
	return { map, str };
}
