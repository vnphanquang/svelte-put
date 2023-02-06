import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

export const INDEX_CONTEXT_KEY = 'CONNECTED_LIST_INDEX';

export function createIndexStore() {
  return writable(0);
}

export function getIndexContext() {
  return getContext<ReturnType<typeof createIndexStore>>(INDEX_CONTEXT_KEY);
}

export function setIndexContext() {
  return setContext(INDEX_CONTEXT_KEY, createIndexStore());
}
