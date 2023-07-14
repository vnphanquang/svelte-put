import { writable } from 'svelte/store';

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
 * ```
 */
export function createTocStore() {
  /** @type {string | undefined} */
  let id = undefined;
  /** @type {import('svelte/store').Writable<import('./store').TocStoreValue>} */
  const { subscribe, set, update } = writable({
    id,
    items: {},
    activeItem: undefined,
  });
  subscribe((state) => (id = state.id));
  return {
    subscribe,
    set,
    update,
    id: () => id,
  };
}

/**
 * @internal
 * @param {import('../parameter/parameter').ResolvedTocConfig['store']} store
 * @param {Partial<import('./store').TocStoreValue>} param1
 */
export function updateStore(store, { activeItem, id, items }) {
  store?.update((state) => ({
    ...state,
    ...(activeItem && { activeItem }),
    ...(id && { id }),
    ...(items && { items }),
  }));
}
