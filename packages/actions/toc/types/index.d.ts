declare module '@svelte-put/toc' {
  import type { ActionReturn } from 'svelte/action';
  /**
   * create a idiomatic svelte store to use with `toc` action
   * @example
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
   * <main use:toc={{ store: tocStore, observe: true }}>...</main
   * ```
   */
  export function createTocStore(): {
    subscribe: (
      this: void,
      run: import('svelte/store').Subscriber<TocStoreValue>,
      invalidate?: ((value?: TocStoreValue | undefined) => void) | undefined,
    ) => import('svelte/store').Unsubscriber;
    set: (this: void, value: TocStoreValue) => void;
    update: (this: void, updater: import('svelte/store').Updater<TocStoreValue>) => void;
    id: () => string | undefined;
  };
  /**
   * search for matching elements, inject anchor element, watch for active element
   * in viewport with `IntersectionObserver`. All for building table of contents.
   *
   * For comprehensive documentation, see {@link https://svelte-put.vnphanquang.com/docs/toc | docs site }
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
   * @param param - instructions for `toc` behavior
   * */
  export function toc(node: HTMLElement, param?: TocParameter): TocActionReturn;
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
   * */
  export function toclink(node: HTMLAnchorElement, param?: TocLinkParameter): TocLinkActionReturn;
  /**
   * value of the `store` provided to {@link TocParameters}
   * */
  type TocStoreValue = {
    /** the ID of this toc operation. see {@link TocParameters}, set on mount (`tocinit`) */
    id?: string;
    /** the extracted toc items, populated on mount (`tocinit`) */
    items: TocInitEventDetail['items'];
    /** the active toc items, set on update (`tocchange`) if `observer` is set to true */
    activeItem?: TocChangeEventDetail['activeItem'];
  };

  /**
   * The store type inferred from {@link createTocStore}
   * */
  type TocStore = ReturnType<typeof createTocStore>;
  /**
   * options to config how `toc` action create `IntersectionObserver` for each
   * matching toc element
   * */
  interface TocObserveConfig extends Omit<IntersectionObserverInit, 'threshold'> {
    /**
     * whether to add `IntersectionObserver` to each matching toc element
     * to track active active element in the viewport.
     * Default to: `true`
     */
    enabled?: boolean;
    /**
     * strategy to observe matching toc elements.
     *
     * - `'parent'` — observe the parent element of the matching toc element
     *
     * - `'self'` — observe the matching toc element itself
     *
     * - `'auto'` — attempt to compare matching toc element & its parent `offsetHeight` with
     * `window.innerHeight` to determine the best strategy.
     *
     * Default to: `auto`
     *
     * @remarks
     *
     * Alternatively, this can be override per element by setting the `data-toc-strategy` attribute
     * on that element.
     */
    strategy?: 'parent' | 'self' | 'auto';
    /**
     * threshold passed to `IntersectionObserver`.
     * Default to: `(element) => Math.min((0.8 * window.innerHeight) / element.offsetHeight, 1)`
     *
     * @remarks
     *
     * Alternatively, `data-toc-threshold` (number) attribute can be set on
     * the matching toc element
     */
    threshold?: number | ((element: HTMLElement) => number);
  }

  /**
   * options to config how `toc` action inject anchor tag for each matching toc element
   * */
  interface TocAnchorConfig {
    /** whether to insert an anchor tag for each matching node */
    enabled?: boolean;
    /**
     * where to create the anchor tag
     *
     * - 'prepend' — inject link before the target tag text
     *
     * - 'append' — inject link after the target tag text
     *
     * - 'wrap' — wrap the whole target tag text with the link
     *
     * - 'before' — insert link before the target tag
     *
     * - 'after' — insert link after the target tag
     * Default to: 'prepend'
     */
    position?: 'prepend' | 'append' | 'wrap' | 'before' | 'after';
    /**
     * content of the inserted anchor tag,
     * ignored when behavior is `wrap`.
     * Default to: '#
     */
    content?: string;
    /**
     * properties set to the inserted anchor tag,
     * Default to: `{ 'aria-hidden': 'true', 'tab-index': '-1' }`
     */
    properties?: Record<string, string>;
    /**
     * href attribute of the inserted anchor tag
     * Default to: `href: (id) => '#' + id`
     */
    href?: (id: string) => string;
  }

  interface TocConfig {
    /**
     * A unique ID representing
     * the operation. This is used for caching so that if the action
     * is run multiple times it can use the results
     * from previous execution.
     * Default to: `crypto.randomUUID()`
     */
    id?: string;
    /**
     * the query selector used to find all matching
     * DOM elements.
     * Default to: `:where(h1, h2, h3, h4, h5, h6)`
     */
    selector?: string;
    /**
     * query selector(s) that match DOM elements to ignore
     * Each selector is used as `:not(selector)`.
     * Default to: `.toc-exclude`
     *
     * @remarks
     *
     * Alternatively, you can set the `data-toc-ignore` attribute on the element
     * Default to: `[]`
     */
    ignore?: string[] | string;
    /**
     * inline `scroll-margin-top` value applied matching elements.
     * Default to: `0`
     */
    scrollMarginTop?: number | string | ((element: HTMLElement) => number | string);
    /**
     * instructions to add the anchor tag.
     * Default to: `true`
     */
    anchor?: TocAnchorConfig | boolean;
    /**
     * instructions to track the active element in the viewport using `IntersectionObserver`.
     * Default to: `false`
     */
    observe?: TocObserveConfig | boolean;
    /**
     * a svelte store that, if provides, will update with the list of extracted
     * toc elements, and the active one (if `observe` is enabled)
     *
     * Default to: undefined
     *
     * @remarks
     * This provides an alternative to `on:tocinit` & `on:tocchange` with less code
     */
    store?: TocStore;
  }

  type TocParameter = TocConfig | undefined;

  /**
   * @public
   * configure relationship between the `observe` functionality of `toc` and `toclink`
   */
  interface TocLinkObserveConfig {
    /**
     * whether to enable this configuration
     * Default to: `false`
     */
    enabled?: boolean;
    /**
     * throttle the observe of `use:toc` on click
     *
     * @remarks
     * This ensures that the active toc item will be
     * the same one that this link is pointing to.
     * Otherwise, it is not guaranteed so, because `observe`
     * is handled with `IntersectionObserver` the next items might
     * already comes into viewport when this link is clicked.
     *
     * Set to 0 to disable throttling.
     *
     * Default to: `500`
     */
    throttleOnClick?: number;
    /**
     * boolean attribute(s) to indicate if this
     * is linking to the active toc item
     *
     * @remarks
     * For this to work, it is required that `tocItem` be provided
     * or the href is in the form `'#<toc-item-id>'`
     *
     * By default, `toclink` uses {@link https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver | MutationObserver}
     *  . For better performance, provide `store`
     *
     * Set `false` to disable this behavior
     *
     * Default to: `'data-toc-link-active'`
     */
    attribute?: string | string[] | boolean;
  }

  /**
   * @public
   * options to configure the behavior of the `toclink` svelte action
   */
  interface TocLinkConfig {
    /**
     * the ID of the toc operations.
     * If not provided will search for the closest toc root
     * (where `use:toc` is used)
     *
     * @remarks
     * In case where the element of `use:toc` and element of `use:toclink`
     * live in 2 different DOM subtrees, this is required otherwise `toclink`
     * will not take no effect.
     *
     * This option is recommended where possible as an optimization
     * to skip the search for the closest toc root.
     *
     * Alternatively, this can be skipped if the `store` option is provided
     */
    tocId?: string;
    /**
     * the matching toc item or its id to link to
     *
     * @remarks
     * if provided, href will be added automatically if not already there
     * Otherwise, you have to do that manually.
     *
     * @see {@link TocItem}
     */
    tocItem?: string | TocItem;
    /**
     * connect and reflect the `observe` functionality of `toc`
     * @see {@link TocObserveConfig}
     *
     * Default to: `false`
     */
    observe?: TocLinkObserveConfig | boolean;
    /**
     * svelte store as used in `use:toc`
     *
     * @remarks
     * recommended as an optimization when `observe.current` is enabled
     */
    store?: TocStore;
  }

  type TocLinkParameter = TocLinkConfig | undefined;
  /**
   * information about an extracted toc item
   * */
  interface TocItem {
    /**
     * the DOM element that was transformed
     */
    element: HTMLElement;
    /**
     * the id of `element` or the "slugified" string from `textContent`
     */
    id: string;
    /**
     * the `textContent` of `element`
     */
    text: string;
    /**
     * the anchor element inserted by the `toc` action unless
     * the `anchor.enabled` option from {@link TocParameters} is `false`
     */
    anchor?: HTMLAnchorElement;
    /**
     * the resolved observe config during extraction
     * unless the `observe.enabled` option from {@link TocParameters} is `false`
     */
    observe?: {
      /** the `IntersectionObserver` instance watching this `element`, */
      observer: IntersectionObserver;
      /** the resolved toc strategy used for this matching element */
      strategy: TocObserveParameters['strategy'];
      /** the resolved toc threshold used for this matching element */
      threshold: TocObserveParameters['threshold'];
      /** the element that was observed by `IntersectionObserver` */
      element: HTMLElement;
    };
  }

  type TocActionReturn = ActionReturn<TocParameters, TocEventAttributes>;

  type TocLinkActionReturn = ActionReturn<TocLinkParameters>;
  interface TocEventDetail {
    /** the ID of this toc operation. see {@link TocParameters} */
    id: string;
  }

  /**
   * `event.detail` of `on:tocinit`
   * */
  interface TocInitEventDetail extends TocEventDetail {
    items: Record<string, TocItem>;
  }

  /**
   * `event.detail` of `on:tocchange`
   * */
  interface TocChangeEventDetail extends TocInitEventDetail {
    activeItem: TocItem;
  }
  /**
   * ambient typing for `toc` event handlers
   * */
  interface TocEventAttributes {
    'on:tocinit'?: (event: CustomEvent<TocInitEventDetail>) => void;
    'on:tocchange'?: (event: CustomEvent<TocChangeEventDetail>) => void;
  }
}

declare module '@svelte-put/toc/attributes' {
  export namespace ATTRIBUTES {
    let autoslug: string;
    let autoSlugAnchor: string;
    let autoSlugAnchorPosition: string;
    let toc: string;
    let anchor: string;
    let root: string;
    let id: string;
    let ignore: string;
    let strategy: string;
    let threshold: string;
    let observeFor: string;
    let observeThrottled: string;
    let observeActiveId: string;
    let linkFor: string;
    let linkActive: string;
  }
}

declare module '@svelte-put/toc/events' {
  export function dispatchChange(
    node: HTMLElement,
    detail: TocChangeEventDetail,
  ): TocChangeEventDetail;

  export function dispatchInit(node: HTMLElement, detail: TocInitEventDetail): TocInitEventDetail;
  /**
   * Deprecated, use `TocInitEventDetail` instead
   */
  export type TocInitEventDetails = TocInitEventDetail;
  /**
   * Deprecated, use `TocChangeEventDetail` instead
   */
  export type TocChangeEventDetails = TocChangeEventDetail;
  /**
   * Deprecated, use `TocEventDetail` instead
   */
  export type TocEventDetails = TocEventDetail;
  interface TocEventDetail {
    /** the ID of this toc operation. see {@link TocParameters} */
    id: string;
  }

  /**
   * `event.detail` of `on:tocinit`
   * */
  interface TocInitEventDetail extends TocEventDetail {
    items: Record<string, TocItem>;
  }

  /**
   * `event.detail` of `on:tocchange`
   * */
  interface TocChangeEventDetail extends TocInitEventDetail {
    activeItem: TocItem;
  }
  /**
   * information about an extracted toc item
   * */
  interface TocItem {
    /**
     * the DOM element that was transformed
     */
    element: HTMLElement;
    /**
     * the id of `element` or the "slugified" string from `textContent`
     */
    id: string;
    /**
     * the `textContent` of `element`
     */
    text: string;
    /**
     * the anchor element inserted by the `toc` action unless
     * the `anchor.enabled` option from {@link TocParameters} is `false`
     */
    anchor?: HTMLAnchorElement;
    /**
     * the resolved observe config during extraction
     * unless the `observe.enabled` option from {@link TocParameters} is `false`
     */
    observe?: {
      /** the `IntersectionObserver` instance watching this `element`, */
      observer: IntersectionObserver;
      /** the resolved toc strategy used for this matching element */
      strategy: TocObserveParameters['strategy'];
      /** the resolved toc threshold used for this matching element */
      threshold: TocObserveParameters['threshold'];
      /** the element that was observed by `IntersectionObserver` */
      element: HTMLElement;
    };
  }
}

declare module '@svelte-put/toc/internal' {
  export function intersectionObserverCallback(
    callback: (activeTocItemId?: string) => void,
  ): IntersectionObserverCallback;

  export function extractElementText(element: HTMLElement): string;

  export function extractTocItemId(element: HTMLElement, fallbackText: string): string;

  export function processScrollMarginTop(
    element: HTMLElement,
    scrollMarginTop: ResolvedTocConfig['scrollMarginTop'],
  ): string;

  export function isAutoSlugInjectedAnchor(element: Element | null | undefined): boolean;

  export function processAnchor(
    element: HTMLElement,
    anchor: ResolvedTocConfig['anchor'],
    tocId: string,
  ): HTMLAnchorElement | undefined;

  export function processObserve(
    element: HTMLElement,
    observe: ResolvedTocConfig['observe'],
    tocId: string,
    updateActiveTocItem: (activeTocItemId?: string) => void,
    observerPool: Record<number, IntersectionObserver>,
  ): TocItem['observe'];

  export function findTocRoot(element: HTMLElement, tocId?: string | undefined): Element | null;

  export const cache: Record<string, TocCacheItem>;
  /**
   * options to config how `toc` action create `IntersectionObserver` for each
   * matching toc element
   * */
  interface TocObserveConfig extends Omit<IntersectionObserverInit, 'threshold'> {
    /**
     * whether to add `IntersectionObserver` to each matching toc element
     * to track active active element in the viewport.
     * Default to: `true`
     */
    enabled?: boolean;
    /**
     * strategy to observe matching toc elements.
     *
     * - `'parent'` — observe the parent element of the matching toc element
     *
     * - `'self'` — observe the matching toc element itself
     *
     * - `'auto'` — attempt to compare matching toc element & its parent `offsetHeight` with
     * `window.innerHeight` to determine the best strategy.
     *
     * Default to: `auto`
     *
     * @remarks
     *
     * Alternatively, this can be override per element by setting the `data-toc-strategy` attribute
     * on that element.
     */
    strategy?: 'parent' | 'self' | 'auto';
    /**
     * threshold passed to `IntersectionObserver`.
     * Default to: `(element) => Math.min((0.8 * window.innerHeight) / element.offsetHeight, 1)`
     *
     * @remarks
     *
     * Alternatively, `data-toc-threshold` (number) attribute can be set on
     * the matching toc element
     */
    threshold?: number | ((element: HTMLElement) => number);
  }

  /**
   * options to config how `toc` action inject anchor tag for each matching toc element
   * */
  interface TocAnchorConfig {
    /** whether to insert an anchor tag for each matching node */
    enabled?: boolean;
    /**
     * where to create the anchor tag
     *
     * - 'prepend' — inject link before the target tag text
     *
     * - 'append' — inject link after the target tag text
     *
     * - 'wrap' — wrap the whole target tag text with the link
     *
     * - 'before' — insert link before the target tag
     *
     * - 'after' — insert link after the target tag
     * Default to: 'prepend'
     */
    position?: 'prepend' | 'append' | 'wrap' | 'before' | 'after';
    /**
     * content of the inserted anchor tag,
     * ignored when behavior is `wrap`.
     * Default to: '#
     */
    content?: string;
    /**
     * properties set to the inserted anchor tag,
     * Default to: `{ 'aria-hidden': 'true', 'tab-index': '-1' }`
     */
    properties?: Record<string, string>;
    /**
     * href attribute of the inserted anchor tag
     * Default to: `href: (id) => '#' + id`
     */
    href?: (id: string) => string;
  }

  interface TocConfig {
    /**
     * A unique ID representing
     * the operation. This is used for caching so that if the action
     * is run multiple times it can use the results
     * from previous execution.
     * Default to: `crypto.randomUUID()`
     */
    id?: string;
    /**
     * the query selector used to find all matching
     * DOM elements.
     * Default to: `:where(h1, h2, h3, h4, h5, h6)`
     */
    selector?: string;
    /**
     * query selector(s) that match DOM elements to ignore
     * Each selector is used as `:not(selector)`.
     * Default to: `.toc-exclude`
     *
     * @remarks
     *
     * Alternatively, you can set the `data-toc-ignore` attribute on the element
     * Default to: `[]`
     */
    ignore?: string[] | string;
    /**
     * inline `scroll-margin-top` value applied matching elements.
     * Default to: `0`
     */
    scrollMarginTop?: number | string | ((element: HTMLElement) => number | string);
    /**
     * instructions to add the anchor tag.
     * Default to: `true`
     */
    anchor?: TocAnchorConfig | boolean;
    /**
     * instructions to track the active element in the viewport using `IntersectionObserver`.
     * Default to: `false`
     */
    observe?: TocObserveConfig | boolean;
    /**
     * a svelte store that, if provides, will update with the list of extracted
     * toc elements, and the active one (if `observe` is enabled)
     *
     * Default to: undefined
     *
     * @remarks
     * This provides an alternative to `on:tocinit` & `on:tocchange` with less code
     */
    store?: TocStore;
  }

  type TocParameter = TocConfig | undefined;

  type ResolvedTocConfig = ReturnType<typeof resolveTocConfig>;
  /**
   * information about an extracted toc item
   * */
  interface TocItem {
    /**
     * the DOM element that was transformed
     */
    element: HTMLElement;
    /**
     * the id of `element` or the "slugified" string from `textContent`
     */
    id: string;
    /**
     * the `textContent` of `element`
     */
    text: string;
    /**
     * the anchor element inserted by the `toc` action unless
     * the `anchor.enabled` option from {@link TocParameters} is `false`
     */
    anchor?: HTMLAnchorElement;
    /**
     * the resolved observe config during extraction
     * unless the `observe.enabled` option from {@link TocParameters} is `false`
     */
    observe?: {
      /** the `IntersectionObserver` instance watching this `element`, */
      observer: IntersectionObserver;
      /** the resolved toc strategy used for this matching element */
      strategy: TocObserveParameters['strategy'];
      /** the resolved toc threshold used for this matching element */
      threshold: TocObserveParameters['threshold'];
      /** the element that was observed by `IntersectionObserver` */
      element: HTMLElement;
    };
  }
  type TocCacheItem = {
    config: ResolvedTocConfig;
    items: Record<string, TocItem>;
    activeTocItemId?: string;
    observeThrottled: boolean;
  };
  /**
   * value of the `store` provided to {@link TocParameters}
   * */
  type TocStoreValue = {
    /** the ID of this toc operation. see {@link TocParameters}, set on mount (`tocinit`) */
    id?: string;
    /** the extracted toc items, populated on mount (`tocinit`) */
    items: TocInitEventDetail['items'];
    /** the active toc items, set on update (`tocchange`) if `observer` is set to true */
    activeItem?: TocChangeEventDetail['activeItem'];
  };

  /**
   * The store type inferred from {@link createTocStore}
   * */
  type TocStore = ReturnType<typeof createTocStore>;
  /**
   * @internal
   * resolve {@link TocParameter}
   * for internal usage within toc operations
   * */
  function resolveTocConfig(param?: TocParameter): {
    id: string;
    selector: string;
    scrollMarginTop: string | number | ((element: HTMLElement) => string | number);
    anchor: {
      enabled: boolean;
      position: 'after' | 'before' | 'append' | 'prepend' | 'wrap';
      content: string;
      properties: {
        'aria-hidden': string;
        tabindex: string;
      };
      href: (slug: string) => string;
    };
    observe:
      | {
          enabled: false;
          strategy: 'auto';
          threshold: (element: HTMLElement) => number;
        }
      | {
          enabled: boolean;
          strategy: 'auto' | 'parent' | 'self';
          threshold: number | ((element: HTMLElement) => number);
          root?: Element | Document | null | undefined;
          rootMargin?: string | undefined;
        };
    store:
      | {
          subscribe: (
            this: void,
            run: import('svelte/store').Subscriber<TocStoreValue>,
            invalidate?: ((value?: TocStoreValue | undefined) => void) | undefined,
          ) => import('svelte/store').Unsubscriber;
          set: (this: void, value: TocStoreValue) => void;
          update: (this: void, updater: import('svelte/store').Updater<TocStoreValue>) => void;
          id: () => string | undefined;
        }
      | undefined;
  };
  interface TocEventDetail {
    /** the ID of this toc operation. see {@link TocParameters} */
    id: string;
  }

  /**
   * `event.detail` of `on:tocinit`
   * */
  interface TocInitEventDetail extends TocEventDetail {
    items: Record<string, TocItem>;
  }

  /**
   * `event.detail` of `on:tocchange`
   * */
  interface TocChangeEventDetail extends TocInitEventDetail {
    activeItem: TocItem;
  }
  /**
   * create a idiomatic svelte store to use with `toc` action
   * @example
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
   * <main use:toc={{ store: tocStore, observe: true }}>...</main
   * ```
   */
  function createTocStore(): {
    subscribe: (
      this: void,
      run: import('svelte/store').Subscriber<TocStoreValue>,
      invalidate?: ((value?: TocStoreValue | undefined) => void) | undefined,
    ) => import('svelte/store').Unsubscriber;
    set: (this: void, value: TocStoreValue) => void;
    update: (this: void, updater: import('svelte/store').Updater<TocStoreValue>) => void;
    id: () => string | undefined;
  };
}

declare module '@svelte-put/toc/parameter' {
  /**
   * @internal
   * resolve {@link TocParameter}
   * for internal usage within toc operations
   * */
  export function resolveTocConfig(param?: TocParameter): {
    id: string;
    selector: string;
    scrollMarginTop: string | number | ((element: HTMLElement) => string | number);
    anchor: {
      enabled: boolean;
      position: 'after' | 'before' | 'append' | 'prepend' | 'wrap';
      content: string;
      properties: {
        'aria-hidden': string;
        tabindex: string;
      };
      href: (slug: string) => string;
    };
    observe:
      | {
          enabled: false;
          strategy: 'auto';
          threshold: (element: HTMLElement) => number;
        }
      | {
          enabled: boolean;
          strategy: 'auto' | 'parent' | 'self';
          threshold: number | ((element: HTMLElement) => number);
          root?: Element | Document | null | undefined;
          rootMargin?: string | undefined;
        };
    store:
      | {
          subscribe: (
            this: void,
            run: import('svelte/store').Subscriber<TocStoreValue>,
            invalidate?: ((value?: TocStoreValue | undefined) => void) | undefined,
          ) => import('svelte/store').Unsubscriber;
          set: (this: void, value: TocStoreValue) => void;
          update: (this: void, updater: import('svelte/store').Updater<TocStoreValue>) => void;
          id: () => string | undefined;
        }
      | undefined;
  };
  /**
   * Compare two ResolvedTocConfig
   * @deprecated not necessary as dynamic update is not supported
   * @param p1 first parameters object to compare
   * @param p2 second parameters object to compare
   * @returns whether 2 parameters objects have the same properties
   */
  export function compareTocParameters(p1: ResolvedTocConfig, p2: ResolvedTocConfig): boolean;
  /**
   * @internal
   * resolve {@link TocLinkParameter} for internal usage within toc operations
   * */
  export function resolveTocLinkConfig(param?: TocLinkParameter): {
    observe: {
      enabled: boolean;
      throttleOnClick: number;
      attribute: string[];
    };
    store:
      | {
          subscribe: (
            this: void,
            run: import('svelte/store').Subscriber<TocStoreValue>,
            invalidate?: ((value?: TocStoreValue | undefined) => void) | undefined,
          ) => import('svelte/store').Unsubscriber;
          set: (this: void, value: TocStoreValue) => void;
          update: (this: void, updater: import('svelte/store').Updater<TocStoreValue>) => void;
          id: () => string | undefined;
        }
      | undefined;
    tocId: string | undefined;
    tocItem: string | TocItem | undefined;
  };

  export function compareTocLinkConfig(a: TocLinkConfig, b: TocLinkConfig): boolean;
  /**
   * Deprecated, use `TocParameter` and `TocConfig` instead
   */
  export type TocParameters = TocConfig;
  /**
   * Deprecated, use `TocLinkParameter` and `TocLinkConfig` instead
   */
  export type TocLinkParameters = TocLinkConfig;
  /**
   * options to config how `toc` action create `IntersectionObserver` for each
   * matching toc element
   * */
  interface TocObserveConfig extends Omit<IntersectionObserverInit, 'threshold'> {
    /**
     * whether to add `IntersectionObserver` to each matching toc element
     * to track active active element in the viewport.
     * Default to: `true`
     */
    enabled?: boolean;
    /**
     * strategy to observe matching toc elements.
     *
     * - `'parent'` — observe the parent element of the matching toc element
     *
     * - `'self'` — observe the matching toc element itself
     *
     * - `'auto'` — attempt to compare matching toc element & its parent `offsetHeight` with
     * `window.innerHeight` to determine the best strategy.
     *
     * Default to: `auto`
     *
     * @remarks
     *
     * Alternatively, this can be override per element by setting the `data-toc-strategy` attribute
     * on that element.
     */
    strategy?: 'parent' | 'self' | 'auto';
    /**
     * threshold passed to `IntersectionObserver`.
     * Default to: `(element) => Math.min((0.8 * window.innerHeight) / element.offsetHeight, 1)`
     *
     * @remarks
     *
     * Alternatively, `data-toc-threshold` (number) attribute can be set on
     * the matching toc element
     */
    threshold?: number | ((element: HTMLElement) => number);
  }

  /**
   * options to config how `toc` action inject anchor tag for each matching toc element
   * */
  interface TocAnchorConfig {
    /** whether to insert an anchor tag for each matching node */
    enabled?: boolean;
    /**
     * where to create the anchor tag
     *
     * - 'prepend' — inject link before the target tag text
     *
     * - 'append' — inject link after the target tag text
     *
     * - 'wrap' — wrap the whole target tag text with the link
     *
     * - 'before' — insert link before the target tag
     *
     * - 'after' — insert link after the target tag
     * Default to: 'prepend'
     */
    position?: 'prepend' | 'append' | 'wrap' | 'before' | 'after';
    /**
     * content of the inserted anchor tag,
     * ignored when behavior is `wrap`.
     * Default to: '#
     */
    content?: string;
    /**
     * properties set to the inserted anchor tag,
     * Default to: `{ 'aria-hidden': 'true', 'tab-index': '-1' }`
     */
    properties?: Record<string, string>;
    /**
     * href attribute of the inserted anchor tag
     * Default to: `href: (id) => '#' + id`
     */
    href?: (id: string) => string;
  }

  interface TocConfig {
    /**
     * A unique ID representing
     * the operation. This is used for caching so that if the action
     * is run multiple times it can use the results
     * from previous execution.
     * Default to: `crypto.randomUUID()`
     */
    id?: string;
    /**
     * the query selector used to find all matching
     * DOM elements.
     * Default to: `:where(h1, h2, h3, h4, h5, h6)`
     */
    selector?: string;
    /**
     * query selector(s) that match DOM elements to ignore
     * Each selector is used as `:not(selector)`.
     * Default to: `.toc-exclude`
     *
     * @remarks
     *
     * Alternatively, you can set the `data-toc-ignore` attribute on the element
     * Default to: `[]`
     */
    ignore?: string[] | string;
    /**
     * inline `scroll-margin-top` value applied matching elements.
     * Default to: `0`
     */
    scrollMarginTop?: number | string | ((element: HTMLElement) => number | string);
    /**
     * instructions to add the anchor tag.
     * Default to: `true`
     */
    anchor?: TocAnchorConfig | boolean;
    /**
     * instructions to track the active element in the viewport using `IntersectionObserver`.
     * Default to: `false`
     */
    observe?: TocObserveConfig | boolean;
    /**
     * a svelte store that, if provides, will update with the list of extracted
     * toc elements, and the active one (if `observe` is enabled)
     *
     * Default to: undefined
     *
     * @remarks
     * This provides an alternative to `on:tocinit` & `on:tocchange` with less code
     */
    store?: TocStore;
  }

  type TocParameter = TocConfig | undefined;

  /**
   * @public
   * configure relationship between the `observe` functionality of `toc` and `toclink`
   */
  interface TocLinkObserveConfig {
    /**
     * whether to enable this configuration
     * Default to: `false`
     */
    enabled?: boolean;
    /**
     * throttle the observe of `use:toc` on click
     *
     * @remarks
     * This ensures that the active toc item will be
     * the same one that this link is pointing to.
     * Otherwise, it is not guaranteed so, because `observe`
     * is handled with `IntersectionObserver` the next items might
     * already comes into viewport when this link is clicked.
     *
     * Set to 0 to disable throttling.
     *
     * Default to: `500`
     */
    throttleOnClick?: number;
    /**
     * boolean attribute(s) to indicate if this
     * is linking to the active toc item
     *
     * @remarks
     * For this to work, it is required that `tocItem` be provided
     * or the href is in the form `'#<toc-item-id>'`
     *
     * By default, `toclink` uses {@link https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver | MutationObserver}
     *  . For better performance, provide `store`
     *
     * Set `false` to disable this behavior
     *
     * Default to: `'data-toc-link-active'`
     */
    attribute?: string | string[] | boolean;
  }

  /**
   * @public
   * options to configure the behavior of the `toclink` svelte action
   */
  interface TocLinkConfig {
    /**
     * the ID of the toc operations.
     * If not provided will search for the closest toc root
     * (where `use:toc` is used)
     *
     * @remarks
     * In case where the element of `use:toc` and element of `use:toclink`
     * live in 2 different DOM subtrees, this is required otherwise `toclink`
     * will not take no effect.
     *
     * This option is recommended where possible as an optimization
     * to skip the search for the closest toc root.
     *
     * Alternatively, this can be skipped if the `store` option is provided
     */
    tocId?: string;
    /**
     * the matching toc item or its id to link to
     *
     * @remarks
     * if provided, href will be added automatically if not already there
     * Otherwise, you have to do that manually.
     *
     * @see {@link TocItem}
     */
    tocItem?: string | TocItem;
    /**
     * connect and reflect the `observe` functionality of `toc`
     * @see {@link TocObserveConfig}
     *
     * Default to: `false`
     */
    observe?: TocLinkObserveConfig | boolean;
    /**
     * svelte store as used in `use:toc`
     *
     * @remarks
     * recommended as an optimization when `observe.current` is enabled
     */
    store?: TocStore;
  }

  type TocLinkParameter = TocLinkConfig | undefined;

  type ResolvedTocConfig = ReturnType<typeof resolveTocConfig>;
  /**
   * value of the `store` provided to {@link TocParameters}
   * */
  type TocStoreValue = {
    /** the ID of this toc operation. see {@link TocParameters}, set on mount (`tocinit`) */
    id?: string;
    /** the extracted toc items, populated on mount (`tocinit`) */
    items: TocInitEventDetail['items'];
    /** the active toc items, set on update (`tocchange`) if `observer` is set to true */
    activeItem?: TocChangeEventDetail['activeItem'];
  };

  /**
   * The store type inferred from {@link createTocStore}
   * */
  type TocStore = ReturnType<typeof createTocStore>;
  /**
   * information about an extracted toc item
   * */
  interface TocItem {
    /**
     * the DOM element that was transformed
     */
    element: HTMLElement;
    /**
     * the id of `element` or the "slugified" string from `textContent`
     */
    id: string;
    /**
     * the `textContent` of `element`
     */
    text: string;
    /**
     * the anchor element inserted by the `toc` action unless
     * the `anchor.enabled` option from {@link TocParameters} is `false`
     */
    anchor?: HTMLAnchorElement;
    /**
     * the resolved observe config during extraction
     * unless the `observe.enabled` option from {@link TocParameters} is `false`
     */
    observe?: {
      /** the `IntersectionObserver` instance watching this `element`, */
      observer: IntersectionObserver;
      /** the resolved toc strategy used for this matching element */
      strategy: TocObserveParameters['strategy'];
      /** the resolved toc threshold used for this matching element */
      threshold: TocObserveParameters['threshold'];
      /** the element that was observed by `IntersectionObserver` */
      element: HTMLElement;
    };
  }
  interface TocEventDetail {
    /** the ID of this toc operation. see {@link TocParameters} */
    id: string;
  }

  /**
   * `event.detail` of `on:tocinit`
   * */
  interface TocInitEventDetail extends TocEventDetail {
    items: Record<string, TocItem>;
  }

  /**
   * `event.detail` of `on:tocchange`
   * */
  interface TocChangeEventDetail extends TocInitEventDetail {
    activeItem: TocItem;
  }
  /**
   * create a idiomatic svelte store to use with `toc` action
   * @example
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
   * <main use:toc={{ store: tocStore, observe: true }}>...</main
   * ```
   */
  function createTocStore(): {
    subscribe: (
      this: void,
      run: import('svelte/store').Subscriber<TocStoreValue>,
      invalidate?: ((value?: TocStoreValue | undefined) => void) | undefined,
    ) => import('svelte/store').Unsubscriber;
    set: (this: void, value: TocStoreValue) => void;
    update: (this: void, updater: import('svelte/store').Updater<TocStoreValue>) => void;
    id: () => string | undefined;
  };
}

declare module '@svelte-put/toc/store' {
  /**
   * create a idiomatic svelte store to use with `toc` action
   * @example
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
   * <main use:toc={{ store: tocStore, observe: true }}>...</main
   * ```
   */
  export function createTocStore(): {
    subscribe: (
      this: void,
      run: import('svelte/store').Subscriber<TocStoreValue>,
      invalidate?: ((value?: TocStoreValue | undefined) => void) | undefined,
    ) => import('svelte/store').Unsubscriber;
    set: (this: void, value: TocStoreValue) => void;
    update: (this: void, updater: import('svelte/store').Updater<TocStoreValue>) => void;
    id: () => string | undefined;
  };

  export function updateStore(
    store: ResolvedTocConfig['store'],
    { activeItem, id, items }: Partial<TocStoreValue>,
  ): void;
  /**
   * value of the `store` provided to {@link TocParameters}
   * */
  type TocStoreValue = {
    /** the ID of this toc operation. see {@link TocParameters}, set on mount (`tocinit`) */
    id?: string;
    /** the extracted toc items, populated on mount (`tocinit`) */
    items: TocInitEventDetail['items'];
    /** the active toc items, set on update (`tocchange`) if `observer` is set to true */
    activeItem?: TocChangeEventDetail['activeItem'];
  };

  /**
   * The store type inferred from {@link createTocStore}
   * */
  type TocStore = ReturnType<typeof createTocStore>;
  /**
   * options to config how `toc` action create `IntersectionObserver` for each
   * matching toc element
   * */
  interface TocObserveConfig extends Omit<IntersectionObserverInit, 'threshold'> {
    /**
     * whether to add `IntersectionObserver` to each matching toc element
     * to track active active element in the viewport.
     * Default to: `true`
     */
    enabled?: boolean;
    /**
     * strategy to observe matching toc elements.
     *
     * - `'parent'` — observe the parent element of the matching toc element
     *
     * - `'self'` — observe the matching toc element itself
     *
     * - `'auto'` — attempt to compare matching toc element & its parent `offsetHeight` with
     * `window.innerHeight` to determine the best strategy.
     *
     * Default to: `auto`
     *
     * @remarks
     *
     * Alternatively, this can be override per element by setting the `data-toc-strategy` attribute
     * on that element.
     */
    strategy?: 'parent' | 'self' | 'auto';
    /**
     * threshold passed to `IntersectionObserver`.
     * Default to: `(element) => Math.min((0.8 * window.innerHeight) / element.offsetHeight, 1)`
     *
     * @remarks
     *
     * Alternatively, `data-toc-threshold` (number) attribute can be set on
     * the matching toc element
     */
    threshold?: number | ((element: HTMLElement) => number);
  }

  /**
   * options to config how `toc` action inject anchor tag for each matching toc element
   * */
  interface TocAnchorConfig {
    /** whether to insert an anchor tag for each matching node */
    enabled?: boolean;
    /**
     * where to create the anchor tag
     *
     * - 'prepend' — inject link before the target tag text
     *
     * - 'append' — inject link after the target tag text
     *
     * - 'wrap' — wrap the whole target tag text with the link
     *
     * - 'before' — insert link before the target tag
     *
     * - 'after' — insert link after the target tag
     * Default to: 'prepend'
     */
    position?: 'prepend' | 'append' | 'wrap' | 'before' | 'after';
    /**
     * content of the inserted anchor tag,
     * ignored when behavior is `wrap`.
     * Default to: '#
     */
    content?: string;
    /**
     * properties set to the inserted anchor tag,
     * Default to: `{ 'aria-hidden': 'true', 'tab-index': '-1' }`
     */
    properties?: Record<string, string>;
    /**
     * href attribute of the inserted anchor tag
     * Default to: `href: (id) => '#' + id`
     */
    href?: (id: string) => string;
  }

  interface TocConfig {
    /**
     * A unique ID representing
     * the operation. This is used for caching so that if the action
     * is run multiple times it can use the results
     * from previous execution.
     * Default to: `crypto.randomUUID()`
     */
    id?: string;
    /**
     * the query selector used to find all matching
     * DOM elements.
     * Default to: `:where(h1, h2, h3, h4, h5, h6)`
     */
    selector?: string;
    /**
     * query selector(s) that match DOM elements to ignore
     * Each selector is used as `:not(selector)`.
     * Default to: `.toc-exclude`
     *
     * @remarks
     *
     * Alternatively, you can set the `data-toc-ignore` attribute on the element
     * Default to: `[]`
     */
    ignore?: string[] | string;
    /**
     * inline `scroll-margin-top` value applied matching elements.
     * Default to: `0`
     */
    scrollMarginTop?: number | string | ((element: HTMLElement) => number | string);
    /**
     * instructions to add the anchor tag.
     * Default to: `true`
     */
    anchor?: TocAnchorConfig | boolean;
    /**
     * instructions to track the active element in the viewport using `IntersectionObserver`.
     * Default to: `false`
     */
    observe?: TocObserveConfig | boolean;
    /**
     * a svelte store that, if provides, will update with the list of extracted
     * toc elements, and the active one (if `observe` is enabled)
     *
     * Default to: undefined
     *
     * @remarks
     * This provides an alternative to `on:tocinit` & `on:tocchange` with less code
     */
    store?: TocStore;
  }

  type TocParameter = TocConfig | undefined;

  type ResolvedTocConfig = ReturnType<typeof resolveTocConfig>;
  interface TocEventDetail {
    /** the ID of this toc operation. see {@link TocParameters} */
    id: string;
  }

  /**
   * `event.detail` of `on:tocinit`
   * */
  interface TocInitEventDetail extends TocEventDetail {
    items: Record<string, TocItem>;
  }

  /**
   * `event.detail` of `on:tocchange`
   * */
  interface TocChangeEventDetail extends TocInitEventDetail {
    activeItem: TocItem;
  }
  /**
   * information about an extracted toc item
   * */
  interface TocItem {
    /**
     * the DOM element that was transformed
     */
    element: HTMLElement;
    /**
     * the id of `element` or the "slugified" string from `textContent`
     */
    id: string;
    /**
     * the `textContent` of `element`
     */
    text: string;
    /**
     * the anchor element inserted by the `toc` action unless
     * the `anchor.enabled` option from {@link TocParameters} is `false`
     */
    anchor?: HTMLAnchorElement;
    /**
     * the resolved observe config during extraction
     * unless the `observe.enabled` option from {@link TocParameters} is `false`
     */
    observe?: {
      /** the `IntersectionObserver` instance watching this `element`, */
      observer: IntersectionObserver;
      /** the resolved toc strategy used for this matching element */
      strategy: TocObserveParameters['strategy'];
      /** the resolved toc threshold used for this matching element */
      threshold: TocObserveParameters['threshold'];
      /** the element that was observed by `IntersectionObserver` */
      element: HTMLElement;
    };
  }
  /**
   * @internal
   * resolve {@link TocParameter}
   * for internal usage within toc operations
   * */
  function resolveTocConfig(param?: TocParameter): {
    id: string;
    selector: string;
    scrollMarginTop: string | number | ((element: HTMLElement) => string | number);
    anchor: {
      enabled: boolean;
      position: 'after' | 'before' | 'append' | 'prepend' | 'wrap';
      content: string;
      properties: {
        'aria-hidden': string;
        tabindex: string;
      };
      href: (slug: string) => string;
    };
    observe:
      | {
          enabled: false;
          strategy: 'auto';
          threshold: (element: HTMLElement) => number;
        }
      | {
          enabled: boolean;
          strategy: 'auto' | 'parent' | 'self';
          threshold: number | ((element: HTMLElement) => number);
          root?: Element | Document | null | undefined;
          rootMargin?: string | undefined;
        };
    store:
      | {
          subscribe: (
            this: void,
            run: import('svelte/store').Subscriber<TocStoreValue>,
            invalidate?: ((value?: TocStoreValue | undefined) => void) | undefined,
          ) => import('svelte/store').Unsubscriber;
          set: (this: void, value: TocStoreValue) => void;
          update: (this: void, updater: import('svelte/store').Updater<TocStoreValue>) => void;
          id: () => string | undefined;
        }
      | undefined;
  };
}

declare module '@svelte-put/toc/utils' {
  /**
   * Slugify a string
   *
   * @param text - text to slugify
   * */
  export function slugify(text: string): string;
}

//# sourceMappingURL=index.d.ts.map
