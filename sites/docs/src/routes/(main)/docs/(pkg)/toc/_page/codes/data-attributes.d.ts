/// <reference types="svelte" />

import type { TocDataAttributes } from '@svelte-put/toc';

declare namespace svelteHTML {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-interface
  interface HTMLAttributes<T> extends TocDataAttributes {}
}
