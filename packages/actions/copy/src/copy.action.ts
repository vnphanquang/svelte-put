import type { ActionReturn } from 'svelte/action';

import { copyToClipboard } from './copy.helpers';
import type { CopyParameters, TextResolver, CopyAttributes, CopyDetail } from './copy.types';

/**
 * Copy text to clipboard on `click` event
 * @public
 *
 * @param node - HTMLElement to register action
 * @param parameters - svelte action parameters
 * @returns svelte {@link ActionReturn }
 */
export function copy<K extends keyof HTMLElementEventMap>(
  node: HTMLElement,
  parameters: Partial<CopyParameters<K>> = {},
): ActionReturn<Partial<CopyParameters<K>>, CopyAttributes> {
  let { trigger, enabled, text, events, synthetic } = resolveParameters(node, parameters);

  async function handler(e: HTMLElementEventMap[K]) {
    const rText = await text({ node, trigger, event: e });
    copyToClipboard(rText);
    const detail: CopyDetail = { text: rText };
    node.dispatchEvent(new CustomEvent('copied', { detail }));
    if (synthetic) {
      const clipboardData = new DataTransfer();
      clipboardData.setData('text/plain', rText);
      const event = new ClipboardEvent('copy', {
        clipboardData: clipboardData,
        dataType: 'text/plain',
        data: rText,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      node.dispatchEvent(event);
    }
  }

  function addEvents() {
    if (trigger) {
      for (const event of events) {
        trigger.addEventListener<K>(event, handler);
      }
    }
  }

  function removeEvents() {
    if (trigger) {
      for (const event of events) {
        trigger.removeEventListener(event, handler);
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
 */
function resolveParameters<K extends keyof HTMLElementEventMap>(
  node: HTMLElement,
  parameters: Partial<CopyParameters<K>> = {},
) {
  const { trigger = node, enabled = true, synthetic = false } = parameters;
  const text =
    typeof parameters.text === 'function'
      ? parameters.text
      : ((() => parameters.text ?? node.innerText) as TextResolver<K>);
  const events =
    typeof parameters.event === 'string'
      ? [parameters.event]
      : parameters.event ?? (['click'] as K[]);
  return { trigger, enabled, text, events, synthetic };
}
