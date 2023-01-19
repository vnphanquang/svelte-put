import { writable } from 'svelte/store';

import type { TocChangeEventDetails, TocInitEventDetails } from './toc.events';
import type { ResolvedTocParameters } from './toc.parameters';

/**
 * value of the `store` provided to {@link TocParameters}
 * @public
 */
export type TocStoreValue = {
  /** the ID of this toc operation. see {@link TocParameters}, set on mount (`tocinit`) */
  id?: string;
  /** the extracted toc items, populated on mount (`tocinit`) */
  items: TocInitEventDetails['items'];
  /** the active toc items, set on update (`tocchange`) if `observer` is set to true */
  activeItem?: TocChangeEventDetails['activeItem'];
};

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
  let id: string | undefined = undefined;
  const { subscribe, set, update } = writable<TocStoreValue>({
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
 * The store type inferred from {@link createTocStore}
 * @public
 */
export type TocStore = ReturnType<typeof createTocStore>;

/**
 * @internal
 */
export function updateStore(
  store: ResolvedTocParameters['store'],
  { activeItem, id, items }: Partial<TocStoreValue>,
) {
  store?.update((state) => ({
    ...state,
    ...(activeItem && { activeItem }),
    ...(id && { id }),
    ...(items && { items }),
  }));
}
