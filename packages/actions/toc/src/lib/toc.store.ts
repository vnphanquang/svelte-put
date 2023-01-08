import { writable } from 'svelte/store';

import type { TocStoreValue } from './toc.types';

/**
 * create a idiomatic svelte store to use with `toc` action
 * @public
 *
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
 */
export function createTocStore() {
  return writable<TocStoreValue>({
    id: undefined,
    items: {},
    activeItem: undefined,
  });
}
