import { calculateDimensions } from '../internals.js';

/**
 * Svelte action for dynamically inlining remote-fetched SVG into DOM
 * @example
 *
 * ```html
 * <script>
 *   import { inlineSvg } from '@svelte-put/inline-svg;
 * </script>
 *
 * <svg use:inlineSvg={"http://example.com/icon.svg"}></svg>
 * ```
 * @param {SVGElement} node - SVGElement to inline SVG into
 * @param {import('./types.public').InlineSvgActionParameter} param - config for the action.
 * @returns {import('./types.public').InlineSvgActionReturn}
 */
export function inlineSvg(node, param) {
	let config = resolveConfig(param);
	async function op() {
		if (config.src) {
			const response = await fetch(config.src, { cache: config.cache });
			const str = config.transform(await response.text());
			const svg = new DOMParser().parseFromString(str, 'image/svg+xml').documentElement;
			for (let i = 0; i < svg.attributes.length; i++) {
				const attr = svg.attributes[i];
				if (!node.hasAttribute(attr.name) && !['width', 'height'].includes(attr.name)) {
					node.setAttribute(attr.name, attr.value);
				}
			}
			if (config.autoDimensions) {
				const dimensions = calculateDimensions(node, svg);
				node.setAttribute('width', dimensions.width);
				node.setAttribute('height', dimensions.height);
			} else {
				node.setAttribute('width', node.getAttribute('width') || '');
				node.setAttribute('height', node.getAttribute('height') || '');
			}
			node.innerHTML = svg.innerHTML;
		}
	}
	op();
	return {
		update(update) {
			config = resolveConfig(update);
			op();
		},
	};
}

/**
 * @type {Required<import('./types.public').InlineSvgActionConfig>}
 */
export const DEFAULT_INLINE_SVG_ACTION_CONFIG = {
	src: '',
	cache: 'no-cache',
	autoDimensions: true,
	transform: (svg) => svg,
};

/**
 * resolve the input parameters of `inlineSvg` action to an internally usable config
 * @param {import('./types.public').InlineSvgActionParameter | undefined} param
 * @returns {Required<import('./types.public').InlineSvgActionConfig>}
 */
export function resolveConfig(param = '') {
	if (typeof param === 'string') {
		return {
			...DEFAULT_INLINE_SVG_ACTION_CONFIG,
			src: param,
		};
	}

	return {
		...DEFAULT_INLINE_SVG_ACTION_CONFIG,
		...param,
	};
}

export * from './types.public.js';
