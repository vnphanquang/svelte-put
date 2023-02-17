import { tick } from 'svelte';
import type { Action } from 'svelte/action';
import type { Unsubscriber } from 'svelte/store';

import type { TocEventAttributes } from './toc.attributes';
import { ATTRIBUTES } from './toc.attributes';
import { dispatchChange, dispatchInit } from './toc.events';
import {
  cache,
  extractElementText,
  extractTocItemId,
  findTocRoot,
  processAnchor,
  processObserve,
  processScrollMarginTop,
} from './toc.internal';
import type { TocCacheItem } from './toc.internal';
import type { TocItem } from './toc.item';
import {
  resolveTocParameters,
  resolveTocLinkParameters,
  type TocLinkParameters,
  DEFAULT_TOC_LINK_PARAMETERS,
} from './toc.parameters';
import type { TocParameters } from './toc.parameters';
import { updateStore } from './toc.store';

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
 * ```
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
 * @returns svelte {@link svelte/action#ActionReturn | ActionReturn}
 */
export const toc: Action<HTMLElement, TocParameters, TocEventAttributes> = function (
  node,
  parameters = {},
) {
  let resolved = resolveTocParameters(parameters);
  let items: TocCacheItem['items'] = {};

  // stay minimal by reusing as few `IntersectionObserver` as possible
  // only create new `IntersectionObserver` for each new `threshold`
  const intersectionObservers: Record<number, IntersectionObserver> = {};
  let mutationObserver: MutationObserver;

  let observeThrottled = false;
  function change(activeTocItemId = '') {
    if (!observeThrottled) {
      node.setAttribute(ATTRIBUTES.observeActiveId, activeTocItemId);
    }
  }

  let tocObserveThrottleTimeoutId: ReturnType<typeof setTimeout>;
  function observeActiveIdAttribute() {
    mutationObserver = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'attributes') {
          switch (mutation.attributeName) {
            case ATTRIBUTES.observeActiveId: {
              const activeTocItemId = (mutation.target as HTMLElement).getAttribute(
                ATTRIBUTES.observeActiveId,
              );
              if (activeTocItemId && activeTocItemId !== cache[resolved.id].activeTocItemId) {
                cache[resolved.id].activeTocItemId = activeTocItemId;
                const detail = dispatchChange(node, {
                  activeItem: items[activeTocItemId] as TocItem,
                  id: resolved.id,
                  items,
                });
                updateStore(resolved.store, detail);
              }
              break;
            }
            case ATTRIBUTES.observeThrottled: {
              const throttled = (mutation.target as HTMLElement).getAttribute(
                ATTRIBUTES.observeThrottled,
              );
              if (!observeThrottled && throttled) {
                observeThrottled = true;
                clearTimeout(tocObserveThrottleTimeoutId);
                let ms = parseInt(throttled);
                if (Number.isNaN(ms)) ms = DEFAULT_TOC_LINK_PARAMETERS.observe.throttleOnClick;
                tocObserveThrottleTimeoutId = setTimeout(() => {
                  observeThrottled = false;
                  node.toggleAttribute(ATTRIBUTES.observeThrottled, false);
                }, ms);
              }
              break;
            }
          }
        }
      }
    });
    mutationObserver.observe(node, {
      attributes: true,
      attributeFilter: [ATTRIBUTES.observeActiveId, ATTRIBUTES.observeThrottled],
    });
  }

  tick().then(async () => {
    const { id, selector, anchor, observe, scrollMarginTop } = resolved;
    const elements: HTMLElement[] = Array.from(node.querySelectorAll(selector));
    const observePromises: Promise<TocItem['observe']>[] = [];
    if (cache[id]) {
      items = cache[id].items;
    } else {
      items = {};

      for (const element of elements) {
        if (element.hasAttribute(ATTRIBUTES.ignore)) continue;

        const text = extractElementText(element);

        const tocId = extractTocItemId(element, text);
        element.id = tocId;

        processScrollMarginTop(element, scrollMarginTop);
        const a = processAnchor(element, anchor, tocId);

        items[tocId] = { element, id: tocId, text, anchor: a };

        if (observe.enabled) {
          // process observe async to avoid blocking main thread,
          // which should be prioritized for rendering initial TOC
          observePromises.push(
            new Promise((resolve) => {
              const rObserve = processObserve(
                element,
                observe,
                tocId,
                change,
                intersectionObservers,
              );
              items[tocId].observe = rObserve;
              resolve(rObserve);
            }),
          );
        }

        // mark that this element has been processed by `toc`
        element.toggleAttribute(ATTRIBUTES.toc, true);
      }
      cache[id] = { parameters: resolved, items };
    }

    const detail = dispatchInit(node, { id, items });
    updateStore(resolved.store, detail);
    if (observePromises.length) {
      Promise.all(observePromises).then(() => {
        observeActiveIdAttribute();
        change(cache[id].activeTocItemId);
      });
    }

    // mark this element as toc root
    node.setAttribute(ATTRIBUTES.root, id);
  });

  return {
    update(update) {
      resolved = resolveTocParameters(update);
      // right now `toc` does not support dynamic parameter updates
      // meaning it'll only run once on component initialization
      // and not on subsequent updates
      // this is because the effort to support dynamic updates is rather high:
      // - revert all previous operation (or detect which ones are still valid/invalid)
      // - re-run operations
    },
    destroy() {
      for (const observer of Object.values(intersectionObservers)) {
        observer.disconnect();
      }
      mutationObserver?.disconnect();
      clearTimeout(tocObserveThrottleTimeoutId);
    },
  };
};

/**
 * @public
 * complementary action to `use:toc` applies to anchor elements
 * that will link to a matching toc item on `click`
 *
 * See example for the functionalities this action provides
 *
 * @example
 *
 * `toclink` will do the following:
 *
 * 1. add `href` attribute in the form of `#${tocItem.id}` if not already
 *
 * 2. add `textContent` from `tocItem.text` if not already
 *
 * 3. add click event listener that will throttle `toc` observe,
 * customizable through `observe.throttleOnClick`
 *
 * 4. update `data-toc-link-active` attribute when the linked `tocItem` is active,
 * customizable through `observe.attribute`.
 *
 * ```html
 * <script>
 *   import { toc, toclink, createTocStore } from '@svelte-put/toc';
 *   const tocStore = createTocStore();
 * </script>
 *
 * <main use:toc={{ store: tocStore, observe: true }}>
 *   ...
 *   {#if Object.values($tocStore.items).length}
 *    <ul>
 *      {#each Object.values($tocStore.items) as tocItem}
 *        <li>
 *          <!-- svelte-ignore a11y-missing-attribute -->
 *          <a use:toclink={{
 *            tocItem,
 *            store: tocStore,
 *            observe: {
 *              attribute: ['aria-current', 'data-active'],
 *              throttleOnClick: 1000,
 *            },
 *          }}></a>
 *        </li>
 *      {/each}
 *    </ul>
 *   {/if}
 *   ...
 * </main>
 * ```
 *
 */
export const toclink: Action<HTMLAnchorElement, TocLinkParameters> = function (
  node,
  parameters = {},
) {
  let resolved = resolveTocLinkParameters(parameters);
  let tocRoot: Element | null = null;
  let tocItemId: string;
  let storeUnsubscribe: Unsubscriber;
  let mutationObserver: MutationObserver;

  function handleClick() {
    if (tocRoot && tocItemId) {
      tocRoot.setAttribute(ATTRIBUTES.observeActiveId, tocItemId);
      tocRoot.setAttribute(
        ATTRIBUTES.observeThrottled,
        resolved.observe.throttleOnClick.toString(),
      );
    }
  }

  function updateCurrent(current: boolean) {
    for (const attribute of resolved.observe.attribute) {
      node.setAttribute(attribute, current.toString());
    }
  }

  function execute() {
    tocItemId = node.href.slice(1);
    if (resolved.tocItem) {
      tocItemId = typeof resolved.tocItem === 'string' ? resolved.tocItem : resolved.tocItem.id;
      if (!node.href) {
        node.href = `#${tocItemId}`;
      }
      if (!node.textContent && typeof resolved.tocItem !== 'string') {
        node.textContent = resolved.tocItem.text;
      }
    }
    node.setAttribute(ATTRIBUTES.linkFor, tocItemId);

    tocRoot = findTocRoot(node, resolved.tocId ?? resolved.store?.id());
    if (!tocRoot || !resolved.observe.enabled) return;
    if (resolved.observe.throttleOnClick) {
      node.addEventListener('click', handleClick);
    }
    if (resolved.observe.attribute.length) {
      if (resolved.store) {
        storeUnsubscribe = resolved.store.subscribe(({ activeItem }) => {
          updateCurrent(activeItem?.id === tocItemId);
        });
      } else {
        mutationObserver = new MutationObserver((mutationList) => {
          for (const mutation of mutationList) {
            if (
              mutation.type === 'attributes' &&
              mutation.attributeName === ATTRIBUTES.observeActiveId
            ) {
              const currentTocId = (mutation.target as HTMLElement).getAttribute(
                ATTRIBUTES.observeActiveId,
              );
              updateCurrent(currentTocId === tocItemId);
            }
          }
        });
        mutationObserver.observe(tocRoot, {
          attributes: true,
          attributeFilter: [ATTRIBUTES.observeActiveId],
        });
      }
    }
  }

  function cleanup() {
    node.removeEventListener('click', handleClick);
    storeUnsubscribe?.();
    mutationObserver?.disconnect();
  }

  execute();

  return {
    update(update = {}) {
      resolved = resolveTocLinkParameters(update);
      // as with `toc` action, we do not support dynamic update right now
    },
    destroy() {
      cleanup();
    },
  };
};
