import { createQrSvgParts } from '../qr';

/**
 * Svelte action for rendering a QR as innerHTML of this SVGElement
 * @param {SVGElement} node
 * @param {import('./types.public').SvgQRParameter} param
 * @returns {import('./types.public').SvgQRActionReturn}
 */
export function qr(node, param) {
	async function init() {
		const { anchors, attributes, logo, modules } = createQrSvgParts(param);
		for (const [name, value] of Object.entries(attributes)) {
			node.setAttribute(name, value);
		}
		node.innerHTML = `${anchors}${modules}${logo}`;
		node.dispatchEvent(new CustomEvent('qrinit', { detail: node }));
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

export * from './types.public.js';

