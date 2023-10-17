import { createBase64Image } from '../qr/index.js';

export const DEFAULT_FILLS = {
  moduleFill: 'black',
  anchorOuterFill: 'black',
  anchorInnerFill: 'black',
};

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
 * @public
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

    node.src = createBase64Image(
      /** @type {import('./QR.svelte').QRProps} */ ({
        ...DEFAULT_FILLS,
        ...param,
        logo,
      }),
    );

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
