import type { Writable } from 'svelte/store';

import type { TocCacheItem } from './toc.types';
/**
 * all relevant data attribute name literals
 * @internal
 */
export const ATTRIBUTES = {
  // markers from `@svelte-put/preprocess-auo-slug`
  autoslug: 'data-auto-slug',
  autoSlugAnchor: 'data-auto-slug-anchor',
  // markers
  toc: 'data-toc',
  anchor: 'data-toc-anchor',
  // customization per matching element
  id: 'data-toc-id',
  ignore: 'data-toc-ignore',
  strategy: 'data-toc-strategy',
  threshold: 'data-toc-threshold',
  // tracking information for `IntersectionObserver`
  observeFor: 'data-toc-observe-for',
};

/**
 * all relevant event name literals
 * @internal
 */
export const EVENTS = {
  init: 'tocinit',
  change: 'tocchange',
};

/**
 * @internal
 */
export const cache: Record<string, TocCacheItem> = {};

/**
 * @internal
 */
export type ActiveTocItemStore = Writable<string | undefined>;

/**
 * @internal
 */
export const intersectionObserverCallback: (
  store: ActiveTocItemStore,
) => IntersectionObserverCallback = (store) => {
  return (entries) => {
    for (const entry of entries) {
      const tocId = entry.target.getAttribute(ATTRIBUTES.observeFor);
      if (tocId && entry.isIntersecting) {
        store.set(tocId);
      }
    }
  };
};
