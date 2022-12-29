import { copyToClipboard } from './copy.helpers';
import type { CopyParameters, CopyAttributes, CopyDetail, TextResolver } from './copy.types';

// ambient typing
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace svelteHTML {
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
export function copy<K extends keyof HTMLElementEventMap>(
  node: HTMLElement,
  parameters: Partial<CopyParameters<K>> = {},
) {
  let { trigger, enabled, text, events } = resolveParameters(node, parameters);

  async function handler(e: HTMLElementEventMap[K]) {
    const rText = await text({ node, trigger, event: e });
    copyToClipboard(rText);
    const detail: CopyDetail = { text: rText };
    node.dispatchEvent(new CustomEvent('copy', { detail }));
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
    update(update: Partial<CopyParameters<K>> = {}) {
      removeEvents();
      ({ trigger, enabled, text, events } = resolveParameters(node, update));
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
  const { trigger = node, enabled = true } = parameters;
  const text =
    typeof parameters.text === 'function'
      ? parameters.text
      : ((() => parameters.text ?? node.innerText) as TextResolver<K>);
  const events =
    typeof parameters.event === 'string'
      ? [parameters.event]
      : parameters.event ?? (['click'] as K[]);
  return { trigger, enabled, text, events };
}
