import { writable } from 'svelte/store';

import type { TocStoreValue } from './toc.types';

/**
 * @public
 */
export function createTocStore() {
  return writable<TocStoreValue>({
    id: undefined,
    items: {},
    activeItem: undefined,
  });
}
