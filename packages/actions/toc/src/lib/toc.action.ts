import { tick } from 'svelte';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Action, ActionReturn } from 'svelte/action';

import {
  ATTRIBUTES,
  cache,
  dispatchChange,
  dispatchInit,
  extractElementText,
  extractTocId,
  processAnchor,
  processObserve,
  processScrollMarginTop,
  updateStore,
} from './toc.internal';
import { compare, resolve } from './toc.parameters';
import type { TocAttributes, TocItem, TocCacheItem, UserTocParameters } from './toc.types';

/**
 * search for matching elements, inject anchor element, watch for active element
 * in viewport with `IntersectionObserver`. All for building table of contents.
 *
 * For comprehensive documentation, see {@link https://svelte-put.vnphanquang.com/docs/toc | docs site }
 *
 * @public
 *
 * @remarks
 *
 * As with any svelte action, `clickoutside` should be use with element and not component.
 *
 * ```html
 * <-- correct usage-->
 *  <div use:toc />
 *
 * <-- incorrect usage-->
 * <Component use:toc/>
 *
 * @example
 *
 * Minimal use with idiomatic svelte store
 *
 * ```html
 * <script lang="ts">
 *   import { toc, createTocStore  } from '@svelte-put/clickoutside';
 *
 *   const tocStore = createTocStore();
 *
 *   $: {
 *      const { activeItem, items } = $tocStore;
 *      console.log('all extracted toc items', items);
 *      console.log('activeItem', activeItem); // only if `observer: true`
 *   }
 * </script>
 *
 * <main use:toc={{ store: tocStore, observe: true }}>
 *   <h1>Page heading</h1>
 *   <section>
 *     <h2>Section heading</h2>
 *   </section>
 *   ...
 * </main>
 * ```
 *
 * @example
 *
 * Usage with callbacks (alternative to svelte store)
 *
 * ```html
 * <script lang="ts">
 *   import { toc } from '@svelte-put/clickoutside';
 *   import type { TocInitEventDetails, TocChangeEventDetails } from '@svelte-put/clickoutside';
 *
 *   function handleTocInit(event: CustomEvent<TocInitEventDetails>) {
 *      const { items } = event.detail;
 *   }
 *
 *   function handleTocChange(event: CustomEvent<TocChangeEventDetails>) {
 *      const { activeItem } = event.detail;
 *   }
 * </script>
 *
 * <main use:toc={{ observe: true }} on:tocinit={handleTocInit} on:tocchange={handleTocChange}>
 *  ...
 * </main>
 * ```
 *
 * @param node - root node to search for matching elements in descendants
 * @param parameters - instructions for `toc` behavior
 * @returns svelte {@link ActionReturn}
 * ```
 */
export const toc: Action<HTMLElement, UserTocParameters, TocAttributes> = function (
  node,
  parameters = {},
) {
  let resolved = resolve(parameters);

  let items: TocCacheItem['items'] = {};

  // stay minimal by reusing as few `IntersectionObserver` as possible
  // only create new `IntersectionObserver` for each new `threshold`
  const observers: Record<number, IntersectionObserver> = {};

  function change(activeTocItemId?: string) {
    if (activeTocItemId) {
      cache[resolved.id].activeTocItemId = activeTocItemId;
      const detail = dispatchChange(node, {
        activeItem: items[activeTocItemId] as TocItem,
        id: resolved.id,
        items,
      });
      updateStore(resolved.store, detail);
    }
  }

  tick().then(async () => {
    const { id, selector, anchor, observe, scrollMarginTop } = resolved;
    const elements: HTMLElement[] = Array.from(node.querySelectorAll(selector));
    const observePromises: Promise<TocItem['observe']>[] = [];
    if (cache[id] && compare(cache[id].parameters, resolved)) {
      items = cache[id].items;
    } else {
      items = {};

      for (const element of elements) {
        if (element.hasAttribute(ATTRIBUTES.ignore)) continue;

        const text = extractElementText(element);
        const tocId = extractTocId(element, text);
        processScrollMarginTop(element, scrollMarginTop);
        const a = processAnchor(element, anchor, tocId);

        items[tocId] = { element, id: tocId, text, anchor: a };

        if (observe.enabled) {
          // process observe async to avoid blocking main thread,
          // which should be prioritized for rendering initial TOC
          observePromises.push(
            new Promise((resolve) => {
              const rObserve = processObserve(element, observe, tocId, change, observers);
              items[tocId].observe = rObserve;
              resolve(rObserve);
            }),
          );
        }

        // mark that this element has been processed by `toc`
        element.setAttribute(ATTRIBUTES.toc, '');
      }
      cache[id] = { parameters: resolved, items };
    }

    const detail = dispatchInit(node, { id, items });
    updateStore(resolved.store, detail);
    if (observePromises.length) {
      Promise.all(observePromises).then(() => {
        change(cache[id].activeTocItemId);
      });
    }
  });

  return {
    update(update) {
      resolved = resolve(update);
      // right now `toc` does not support dynamic parameter updates
      // meaning it'll only run once on component initialization
      // and not on subsequent updates
      // this is because the effort to support dynamic updates is rather high:
      // - revert all previous operation (or detect which ones are still valid/invalid)
      // - re-run operations
    },
    destroy() {
      for (const observer of Object.values(observers)) {
        observer.disconnect();
      }
    },
  };
};
