import { calculateDimensions } from './inline-svg.internal.js';

/**
 *
 *Svelte action for dynamically inlining remote-fetched SVG into DOM
 * @example
 *
 * ```html
 * <script>
 *   import { inlineSvg } from '@svelte-put/inline-svg;
 * </script>
 *
 * <svg use:inlineSvg={"http://example.com/icon.svg"}></svg>
 * ```
 *
 *
 *
 * For a static solution for inlining SVG at build time, use {@link https://svelte-put.vnphanquang.com/docs/preprocess-inline-svg | @svelte-put/preprocess-inline-svg},
 * which is also conveniently re-exported by this package
 *
 * ```javascript
 * // svelte.config.js
 * import inlineSvg from '@svelte-put/preprocess-inline-svg';
 *
 * const config = {
 *   preprocess: [inlineSvg()],
 * };
 * export default config;
 * ```
 * @param {SVGElement} node - SVGElement to inline SVG into
 * @param {import('./public.js').InlineSvgParameter} param - config for the action.
 * @returns {import('./public').InlineSvgActionReturn}
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
 * @package
 * @type {Required<import('./public.js').InlineSvgConfig>}
 */
export const DEFAULT_INLINE_SVG_ACTION_CONFIG = {
	src: '',
	cache: 'no-cache',
	autoDimensions: true,
	transform: (svg) => svg,
};

/**
 * resolve the input parameters of `inlineSvg` action to an internally usable config
 * @package
 * @param {import('./public').InlineSvgParameter | undefined} param
 * @returns {Required<import('./public.js').InlineSvgConfig>}
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

/**
 * Deprecated, use `InlineSvgParameter` and `InlineSvgConfig` instead
 * @typedef {import('./public').InlineSvgParameter} InlineSvgParameters
 */
