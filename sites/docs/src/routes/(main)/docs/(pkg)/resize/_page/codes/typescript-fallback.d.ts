/// <reference types="svelte" />

declare namespace svelteHTML {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    'on:resized'?: (event: CustomEvent<import('@svelte-put/resize').ResizeDetail>) => void;
  }
}
