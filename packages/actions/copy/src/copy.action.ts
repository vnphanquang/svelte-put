import { CopyParameters, CopyAttributes, CopyDetail } from './copy.types';
import { copyToClipboard } from './copy.utils';

// ambient typing
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace svelte.JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface HTMLAttributes extends CopyAttributes {}
  }
}

/**
 * Copy text to clipboard on `click` event
 * @public
 *
 * @param node - HTMLElement to register action
 * @param parameters - svelte action parameters
 * @returns svelte action interface
 */
export function copy(node: HTMLElement, parameters: Partial<CopyParameters> = {}) {
  let { trigger = node, enabled = true, text } = parameters;

  function defaultText() {
    return node.innerText;
  }

  async function handler() {
    const rText = (typeof text === 'function' ? await text() : text) ?? defaultText();
    copyToClipboard(rText);
    const detail: CopyDetail = { text: rText };
    node.dispatchEvent(new CustomEvent('copy', { detail }));
  }

  if (enabled) {
    trigger?.addEventListener('click', handler);
  }

  return {
    update(update: Partial<CopyParameters> = {}) {
      const newEnabled = update.enabled ?? true;
      const newTrigger = update.trigger ?? node;
      if (!trigger?.isSameNode(newTrigger)) {
        trigger?.removeEventListener('click', handler);
        trigger = newTrigger;
        if (newEnabled) {
          trigger?.addEventListener('click', handler);
        }
      } else {
        if (newEnabled && !enabled) {
          // from disabled to enabled
          trigger?.addEventListener('click', handler);
        } else if (!newEnabled && enabled) {
          // from enabled to disabled
          trigger?.removeEventListener('click', handler);
        }
      }
      enabled = newEnabled;
      text = update.text;
    },
    destroy() {
      trigger?.removeEventListener('click', handler);
    },
  };
}
