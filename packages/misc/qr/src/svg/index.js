import { createSVGParts } from '../qr';

/**
 * Svelte action for rendering a QR as innerHTML of this SVGElement
 * @public
 * @param {SVGElement} node
 * @param {import('./types').SvgQRParameter} param
 * @returns {import('./types').SvgQRActionReturn}
 */
export function qr(node, param) {
  async function init() {
    const { anchors, attributes, logo, modules } = createSVGParts(param);
    for (const [name, value] of Object.entries(attributes)) {
      node.setAttribute(name, value);
    }
    node.innerHTML = `${anchors}${modules}${logo}`;
    node.dispatchEvent(new CustomEvent('qr:init', { detail: node }));
  }

  init();

  return {
    update(update) {
      if (JSON.stringify(param) !== JSON.stringify(update)) {
        param = update;
        init();
      }
    },
  };
}
