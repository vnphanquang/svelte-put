/// <reference types="svelte" />

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    // on:copy
    oncopy?: (event: CustomEvent<import('@svelte-put/copy').CopyDetail>) => void;
  }
}
