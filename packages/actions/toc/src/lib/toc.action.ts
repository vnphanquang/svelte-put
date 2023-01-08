import { tick } from 'svelte';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Action, ActionReturn } from 'svelte/action';
import { writable } from 'svelte/store';

import { compare, resolve } from './toc.parameters';
import type {
  ResolvedTocParameters,
  TocAttributes,
  TocDataAttributes,
  TocItem,
  TocInitEventDetails,
  TocChangeEventDetails,
  TocCacheItem,
  UserTocParameters,
} from './toc.types';
import { slugify } from './toc.utils';

// ambient typing
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace svelteHTML {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface HTMLAttributes extends TocDataAttributes {}
  }
}

/**
 * all relevant data attribute name literals
 * @internal
 */
export const ATTRIBUTES = {
  autoslug: 'data-auto-slug',
  autoSlugAnchor: 'data-auto-slug-anchor',
  toc: 'data-toc',
  anchor: 'data-toc-anchor',
  id: 'data-toc-id',
  ignore: 'data-toc-ignore',
  strategy: 'data-toc-strategy',
  threshold: 'data-toc-threshold',
};

/**
 * all relevant event name literals
 * @internal
 */
export const EVENTS = {
  init: 'tocinit',
  change: 'tocchange',
};

const cache: Record<string, TocCacheItem> = {};

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
 *   import { toc, createTocStore  } from '@svelte-put/clickoutside';
 *   import type { TocInitEventDetails, TocChangeEventDetails  } from '@svelte-put/clickoutside';
 *
 *   const tocStore = createTocStore();
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
 * <main use:toc on:tocinit={handleTocInit} on:tocchange={handleTocChange}>
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
  const activeTocItemStore = writable<string | undefined>(undefined);

  const activeTocItemStoreUnsubscribe = activeTocItemStore.subscribe((activeTocItemId) => {
    if (activeTocItemId) {
      const detail: TocChangeEventDetails = {
        id: resolved.id,
        activeItem: items[activeTocItemId] as TocItem,
      };
      node.dispatchEvent(new CustomEvent(EVENTS.change, { detail }));
      resolved.store?.set({ ...detail, items });
    }
  });

  const createObserverCallback: (tocId: string) => IntersectionObserverCallback =
    (tocId) => (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && tocId) {
          activeTocItemStore.set(tocId);
        }
      }
    };

  tick().then(async () => {
    const { id, selector, anchor, observe, scrollMarginTop } = resolved;
    const elements: HTMLElement[] = Array.from(node.querySelectorAll(selector));
    if (cache[id] && compare(cache[id].parameters, resolved)) {
      items = cache[id].items;
    } else {
      items = {};
      for (const element of elements) {
        if (element.hasAttribute(ATTRIBUTES.ignore)) continue;

        let a: HTMLAnchorElement | undefined = undefined;

        let tocId = element.id;
        let text = '';
        if (element.hasAttribute(ATTRIBUTES.autoslug)) {
          // pre-processed by `@svelte-put/preprocess-auto-slug`
          // must strip out `textContent` from any nested anchor element
          text = Array.from(element.childNodes).reduce((acc, child) => {
            if (
              child.nodeType !== Node.ELEMENT_NODE ||
              !(child as Element).hasAttribute(ATTRIBUTES.autoSlugAnchor)
            ) {
              acc += child.textContent || '';
            }
            return acc;
          }, '');
        } else {
          text = element.textContent || '';
        }
        const dataTocId = element.getAttribute(ATTRIBUTES.id);
        if (dataTocId) {
          tocId = dataTocId;
        } else if (!tocId) {
          element.id = tocId = slugify(text);
        }

        if (scrollMarginTop) {
          const rScrollMarginTop =
            typeof scrollMarginTop === 'function' ? scrollMarginTop(element) : scrollMarginTop;
          element.style.scrollMarginTop =
            typeof rScrollMarginTop === 'number' ? `${rScrollMarginTop}px` : rScrollMarginTop;
        }

        if (!element.hasAttribute(ATTRIBUTES.autoslug)) {
          // only handle anchor & DOM transformation if not already done
          // by `@svelte-put/preprocess-auto-slug`
          if (anchor.enabled) {
            a = document.createElement('a');
            for (const [key, value] of Object.entries(anchor.properties)) {
              a.setAttribute(key, value);
            }
            a.href = typeof anchor.href === 'function' ? anchor.href(tocId) : `#${tocId}`;
            a.textContent = anchor.content;
            switch (anchor.position) {
              case 'before':
                element.parentNode?.insertBefore(a, element);
                break;
              case 'prepend':
                element.insertBefore(a, element.firstChild);
                break;
              case 'wrap':
                a.innerHTML = element.outerHTML;
                element.parentNode?.replaceChild(a, element);
                break;
              case 'append':
                element.appendChild(a);
                break;
              case 'after':
                element.parentNode?.insertBefore(a, element.nextSibling);
                break;
            }
            a.setAttribute(ATTRIBUTES.anchor, '');
          }
        }

        let rObserve: TocItem['observe'] = undefined;
        if (observe.enabled) {
          const parentElement = element.parentElement;
          let rStrategy: Exclude<ResolvedTocParameters['observe']['strategy'], 'auto'>;
          const userDefinedStrategy =
            (element.getAttribute(
              ATTRIBUTES.strategy,
            ) as ResolvedTocParameters['observe']['strategy']) || observe.strategy;
          if (typeof userDefinedStrategy !== 'number' && userDefinedStrategy !== 'auto') {
            rStrategy = userDefinedStrategy;
          } else if (parentElement && parentElement.offsetHeight / window.innerHeight < 0.8) {
            rStrategy = 'parent';
          } else {
            rStrategy = 'self';
          }
          let nodeToObserve: HTMLElement;
          switch (rStrategy) {
            case 'self':
              nodeToObserve = element;
              break;
            case 'parent':
              nodeToObserve = element.parentElement as HTMLElement;
              break;
          }
          let threshold: number;
          if (element.hasAttribute(ATTRIBUTES.threshold)) {
            threshold = parseFloat(element.getAttribute(ATTRIBUTES.threshold) || '0');
          } else {
            threshold =
              typeof observe.threshold === 'function'
                ? observe.threshold(element)
                : observe.threshold;
          }
          const { root, rootMargin } = observe;
          const observer = new IntersectionObserver(createObserverCallback(tocId), {
            threshold,
            rootMargin,
            root,
          });
          observer.observe(nodeToObserve);
          rObserve = { strategy: rStrategy, observer, threshold };
        }

        element.setAttribute(ATTRIBUTES.toc, '');
        items[tocId] = {
          element,
          id: tocId,
          text,
          anchor: a,
          observe: rObserve,
        };
      }
      cache[id] = { parameters: resolved, items };
    }

    const detail: TocInitEventDetails = { items, id };
    node.dispatchEvent(new CustomEvent(EVENTS.init, { detail }));
    resolved.store?.update((store) => ({
      ...detail,
      activeItem:
        store.activeItem && items[store.activeItem.id] ? items[store.activeItem.id] : undefined,
    }));
  });

  return {
    update(update) {
      resolved = resolve(update);
    },
    destroy() {
      activeTocItemStoreUnsubscribe();
    },
  };
};
