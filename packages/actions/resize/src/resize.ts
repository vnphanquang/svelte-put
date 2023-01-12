// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Action, ActionReturn } from 'svelte/action';

import { ResizeAttributes, ResizeDetail, ResizeParameters } from './resize.types';

/**
 * Create an {@link https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver | ResizeObserver} that observers this node
 * @public
 *
 * @example
 *
 * ```html
 * <script lang="ts">
 *  import { resize, type ResizeDetail } from '@svelte-put/resize';
 *
 *  function onResized(event: CustomEvent<ResizeDetail>) {
 *    const { observer, entries } = event.detail;
 *    console.log('action resize was used on element', observer.target);
 *    console.log('list of ResizeObserverEntry:', entries);
 *
 *   // see MDN docs for what you can do with ResizeObserverEntry
 *   // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry
 *  }
 * </script>
 *
 * <section use:resize on:resized={onResized}>
 *   ...
 * </section
 * ```
 *
 * @remarks
 *
 * As with any svelte action, `resize` should be use with element and not component.
 *
 * ```html
 * <-- correct usage-->
 *  <div use:resize />
 *
 * <-- incorrect usage-->
 * <Component use:resize/>
 * ```
 *
 * @param node - HTMLElement to observe
 * @param parameters - svelte action parameters
 * @returns svelte {@link ActionReturn}
 */
export const resize: Action<HTMLElement, ResizeParameters, ResizeAttributes> = function (
  node,
  parameters = {},
) {
  let { enabled = true, observer = 'singleton' } = parameters;

  let rObserver = resolveObserver(observer);

  if (enabled) {
    rObserver.observe(node);
  }
  return {
    update(update) {
      const newObserver = update.observer ?? 'singleton';
      const newEnabled = update.enabled ?? true;

      if (newObserver !== observer) {
        rObserver.unobserve(node);
        rObserver = resolveObserver(observer);
      }

      if (!enabled && newEnabled) {
        rObserver.observe(node);
      } else if (enabled && !newEnabled) {
        rObserver.unobserve(node);
      }

      enabled = newEnabled;
      observer = newObserver;
    },
    destroy() {
      rObserver.disconnect();
    },
  };
};

/**
 * ResizeObserverCallback
 * @internal
 */
const callback: ResizeObserverCallback = function (entries) {
  for (const entry of entries) {
    const detail: ResizeDetail = { observer: observerSingleton, entry };
    entry.target.dispatchEvent(new CustomEvent('resized', { detail }));
  }
};

/**
 * singleton for all actions to use
 * @internal
 */
let observerSingleton: ResizeObserver;

/**
 * resolve to a ResizeObserver for use in action
 * @internal
 */
function resolveObserver(input: ResizeParameters['observer'] = 'singleton'): ResizeObserver {
  if (input === 'singleton') {
    if (!observerSingleton) {
      observerSingleton = new ResizeObserver(callback);
    }
    return observerSingleton;
  }
  if (input === 'new') {
    return new ResizeObserver(callback);
  }
  return input;
}
