/// <reference types="svelte" />

declare namespace svelteHTML {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    'on:copied'?: (event: CustomEvent<import('@svelte-put/copy').CopyDetail>) => void;
  }
}
