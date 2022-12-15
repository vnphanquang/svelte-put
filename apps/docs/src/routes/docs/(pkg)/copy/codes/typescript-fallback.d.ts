/// <reference types="svelte" />

declare namespace svelte.JSX {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    // on:copy
    oncopy?: (event: CustomEvent<import('@svelte-put/copy').CopyDetail>) => void;
  }
}
