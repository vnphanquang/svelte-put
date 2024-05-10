import { createQrPngDataUrl } from '../qr';

/**
 * Fetch a remote image and convert to base64 string
 * @param {string} url
 * @returns {Promise<string>}
 */
export async function toDataURL(url) {
	return fetch(url)
		.then((response) => response.blob())
		.then(
			(blob) =>
				new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.onloadend = () => resolve(/** @type {string} */ (reader.result) ?? '');
					reader.onerror = reject;
					reader.readAsDataURL(blob);
				}),
		);
}

/**
 * Svelte action for rendering a QR as base64 data URL into the src attribute of this HTMLImageElement
 * @param {HTMLImageElement} node
 * @param {import('./types').ImgQRParameter} param
 * @returns {import('./types').ImgQRActionReturn}
 */
export function qr(node, param) {
	async function init() {
		let logo = param.logo;
		if (logo?.startsWith('http')) {
			logo = await toDataURL(logo);
		}

		/** @type {import('./types').ImgQRParameter} */
		const rConfig = {
			...param,
			width: parseInt(node.getAttribute('width') || '') || param.width,
			height: parseInt(node.getAttribute('height') || '') || param.height,
			logo,
		}
		const pngBase64 = await createQrPngDataUrl(rConfig)

		node.src = pngBase64;
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
