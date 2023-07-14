import { tick } from 'svelte';

import { ATTRIBUTES } from '../attributes/index.js';
import { dispatchChange, dispatchInit } from '../events/index.js';
import {
  cache,
  extractElementText,
  extractTocItemId,
  findTocRoot,
  processAnchor,
  processObserve,
  processScrollMarginTop,
} from '../internal/index.js';
import { DEFAULT_TOC_LINK_PARAMETER } from '../parameter/const.js';
import {
  resolveTocConfig,
  resolveTocLinkConfig,
  compareTocLinkConfig,
} from '../parameter/index.js';
import { updateStore } from '../store/index.js';

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
 * @param {HTMLElement} node - root node to search for matching elements in descendants
 * @param {import('../parameter/parameter').TocParameter} param - instructions for `toc` behavior
 * @returns {import('./action').TocActionReturn}
 */
export function toc(node, param = {}) {
  let resolved = resolveTocConfig(param);

  // stay minimal by reusing as few `IntersectionObserver` as possible
  // only create new `IntersectionObserver` for each new `threshold`
  /** @type {Record<number, IntersectionObserver>} */
  const intersectionObservers = {};
  /** @type {MutationObserver} */
  let mutationObserver;

  function change(activeTocItemId = '') {
    if (!cache[resolved.id].observeThrottled) {
      node.setAttribute(ATTRIBUTES.observeActiveId, activeTocItemId);
    }
  }

  /** @type {ReturnType<typeof setTimeout>} */
  let tocObserveThrottleTimeoutId;
  function observeActiveIdAttribute() {
    mutationObserver = new MutationObserver((mutationList) => {
      if (!node.isConnected) return;
      for (const mutation of mutationList) {
        if (mutation.type === 'attributes') {
          switch (mutation.attributeName) {
            case ATTRIBUTES.observeActiveId: {
              const activeTocItemId = /** @type {HTMLElement} */ (mutation.target).getAttribute(
                ATTRIBUTES.observeActiveId,
              );
              const cached = cache[resolved.id];
              if (activeTocItemId && activeTocItemId !== cached.activeTocItemId) {
                cached.activeTocItemId = activeTocItemId;
                const activeItem = cached.items[activeTocItemId];
                if (activeItem) {
                  const detail = dispatchChange(node, {
                    activeItem,
                    id: resolved.id,
                    items: cached.items,
                  });
                  updateStore(resolved.store, detail);
                }
              }
              break;
            }
            case ATTRIBUTES.observeThrottled: {
              const throttled = /** @type {HTMLElement} */ (mutation.target).getAttribute(
                ATTRIBUTES.observeThrottled,
              );
              const cached = cache[resolved.id];
              if (!cached.observeThrottled && throttled) {
                cached.observeThrottled = true;
                clearTimeout(tocObserveThrottleTimeoutId);
                let ms = parseInt(throttled);
                if (Number.isNaN(ms)) ms = DEFAULT_TOC_LINK_PARAMETER.observe.throttleOnClick;
                tocObserveThrottleTimeoutId = setTimeout(() => {
                  cached.observeThrottled = false;
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
    /** @type {HTMLElement[]} */
    const elements = Array.from(node.querySelectorAll(selector));
    /** @type {Promise<import('./action').TocItem['observe']>[]} */
    const observePromises = [];

    /** @type {import('../internal/internal').TocCacheItem} */
    const cached = {
      config: resolved,
      items: {},
      activeTocItemId: '',
      observeThrottled: false,
    };
    cache[id] = cached;
    node.setAttribute(ATTRIBUTES.observeActiveId, '');
    for (const element of elements) {
      if (element.hasAttribute(ATTRIBUTES.ignore)) continue;

      const text = extractElementText(element);

      const tocId = extractTocItemId(element, text);
      element.id = tocId;

      processScrollMarginTop(element, scrollMarginTop);
      const a = processAnchor(element, anchor, tocId);

      cached.items[tocId] = { element, id: tocId, text, anchor: a };

      if (observe.enabled) {
        // process observe async to avoid blocking main thread,
        // which should be prioritized for rendering initial TOC
        observePromises.push(
          new Promise((resolve) => {
            const rObserve = processObserve(element, observe, tocId, change, intersectionObservers);
            cached.items[tocId].observe = rObserve;
            resolve(rObserve);
          }),
        );
      }

      // mark that this element has been processed by `toc`
      element.toggleAttribute(ATTRIBUTES.toc, true);
    }

    const detail = dispatchInit(node, { id, items: cached.items });
    updateStore(resolved.store, detail);
    if (observePromises.length) {
      Promise.all(observePromises).then(() => {
        observeActiveIdAttribute();
        change(cached.activeTocItemId);
      });
    }

    // mark this element as toc root
    node.setAttribute(ATTRIBUTES.root, id);
  });

  return {
    update(update) {
      resolved = resolveTocConfig(update);
      // right now `toc` does not support dynamic parameter updates
      // meaning it'll only run once on component initialization
      // and not on subsequent updates
      // this is because the effort to support dynamic updates is rather high:
      // - revert all previous operation (or detect which ones are still valid/invalid)
      // - re-run operations
    },
    destroy() {
      mutationObserver?.disconnect();
      for (const observer of Object.values(intersectionObservers)) {
        observer.disconnect();
      }
      clearTimeout(tocObserveThrottleTimeoutId);
    },
  };
}

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
 * @param {HTMLAnchorElement} node
 * @param {import('../parameter/parameter').TocLinkParameter} param
 * @returns {import('./action').TocLinkActionReturn}
 */
export function toclink(node, param = {}) {
  // initial safe keep
  const initialHref = node.href;
  const initialTextContent = node.textContent;

  let resolved = resolveTocLinkConfig(param);
  /** @type {Element | null} */
  let tocRoot = null;
  /** @type {string} */
  let tocItemId;
  /** @type {import('svelte/store').Unsubscriber} */
  let storeUnsubscribe;
  /** @type {MutationObserver} */
  let mutationObserver;

  function handleClick() {
    if (tocRoot && tocItemId) {
      tocRoot.setAttribute(
        ATTRIBUTES.observeThrottled,
        resolved.observe.throttleOnClick.toString(),
      );
      tocRoot.setAttribute(ATTRIBUTES.observeActiveId, tocItemId);
    }
  }

  /**
   * @param {boolean} current
   */
  function updateCurrent(current) {
    for (const attribute of resolved.observe.attribute) {
      node.setAttribute(attribute, current.toString());
    }
  }

  function resolveAttributes() {
    tocItemId = node.href.split('#')[1] ?? '';
    if (resolved.tocItem) {
      tocItemId = typeof resolved.tocItem === 'string' ? resolved.tocItem : resolved.tocItem.id;
      if (!initialHref) {
        node.href = `#${tocItemId}`;
      }
      if (!initialTextContent && typeof resolved.tocItem !== 'string') {
        node.textContent = resolved.tocItem.text;
      }
    }
    node.setAttribute(ATTRIBUTES.linkFor, tocItemId);
  }

  function execute() {
    resolveAttributes();

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
              const currentTocId = /** @type {HTMLElement} */ (mutation.target).getAttribute(
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
    mutationObserver?.disconnect();
    node.removeEventListener('click', handleClick);
    storeUnsubscribe?.();
    updateCurrent(false);
  }

  execute();

  return {
    update(update = {}) {
      if (!compareTocLinkConfig(param, update)) {
        cleanup();
        param = update;
        resolved = resolveTocLinkConfig(param);
        resolveAttributes();
        execute();
      }
      tocRoot = findTocRoot(node, resolved.tocId ?? resolved.store?.id());
    },
    destroy() {
      cleanup();
    },
  };
}
