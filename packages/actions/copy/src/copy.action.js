/** @typedef {import('svelte/action').ActionReturn} */

import { copyToClipboard } from './copy.helpers.js';

/**
 * Copy text to clipboard on `click` event
 * @public
 *
 * @template {keyof HTMLElementEventMap} K
 * @param {HTMLElement} node - HTMLElement to register action
 * @param {Partial<import('./public.js').CopyParameters<K>> | undefined} parameters - svelte action parameters
 * @returns {import('./public.js').CopyReturn<K>}
 */
export function copy(node, parameters = {}) {
  let { trigger, enabled, text, events, synthetic } = resolveParameters(node, parameters);

  /** @param {HTMLElementEventMap[K]} e */
  async function handler(e) {
    const rText = await text({ node, trigger, event: e });
    copyToClipboard(rText);
    /** @type {import('./public').CopyDetail} */
    const detail = { text: rText };
    node.dispatchEvent(new CustomEvent('copied', { detail }));
    if (synthetic) {
      const clipboardData = new DataTransfer();
      clipboardData.setData('text/plain', rText);
      const event = new ClipboardEvent(
        'copy',
        /** @type {any} */ ({
          clipboardData: clipboardData,
          dataType: 'text/plain',
          data: rText,
        }),
      );
      node.dispatchEvent(event);
    }
  }

  function addEvents() {
    if (trigger) {
      for (const event of events) {
        trigger.addEventListener(/** @type {K} */ (event), handler);
      }
    }
  }

  function removeEvents() {
    if (trigger) {
      for (const event of events) {
        trigger.removeEventListener(/** @type {K} */ (event), handler);
      }
    }
  }

  if (enabled) addEvents();

  return {
    update(update = {}) {
      removeEvents();
      ({ trigger, enabled, text, events, synthetic } = resolveParameters(node, update));
      addEvents();
    },
    destroy() {
      removeEvents();
    },
  };
}

/**
 * @internal
 * @template {keyof HTMLElementEventMap} K
 * @param {HTMLElement} node
 * @param {Partial<import('./public').CopyParameters<K>>} parameters
 */
function resolveParameters(node, parameters = {}) {
  const { trigger = node, enabled = true, synthetic = false } = parameters;
  const text =
    typeof parameters.text === 'function'
      ? parameters.text
      : /** @type {import('./public.js').TextResolver<K>} */ (
          () => parameters.text ?? node.innerText
        );
  const events =
    typeof parameters.event === 'string' ? [parameters.event] : parameters.event ?? ['click'];
  return { trigger, enabled, text, events, synthetic };
}
