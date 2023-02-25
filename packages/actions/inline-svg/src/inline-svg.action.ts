import type { Action } from 'svelte/action';

import { resolveParameters, type InlineSvgActionParameters } from './inline-svg.parameters';
import { calculateDimensions } from './inline-svg.utils';

/**
 * @public
 * Svelte action for dynamically inlining remote-fetched SVG into DOM
 *
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
 * @remarks
 *
 * For a static solution for inlining SVG at build time, use {@link https://svelte-put.vnphanquang.com/docs/preprocess-inline-svg | @svelte-put/preprocess-inline-svg},
 * which is also conveniently re-exported by this package
 *
 * ```javascript
 * // svelte.config.js
 * import inlineSvg from '@svelte-put/preprocess-inline-svg';
 *
 * \/** @type {import('@sveltejs/kit').Config} *\/
 * const config = {
 *   preprocess: [inlineSvg()],
 * };
 * export default config;
 * ```
 *
 * @param node - SVGElement to inline SVG into
 * @param parameters - config for the action.
 * @returns
 */
export const inlineSvg: Action<SVGElement, InlineSvgActionParameters> = function (
  node,
  parameters,
) {
  let config = resolveParameters(parameters);
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
      config = resolveParameters(update);
      op();
    },
  };
};
