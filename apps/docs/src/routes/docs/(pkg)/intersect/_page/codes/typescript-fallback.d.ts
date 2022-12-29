/// <reference types="svelte" />

declare namespace svelteHTML {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    'on:intersect'?: (event: CustomEvent<import('@svelte-put/intersect').IntersectDetail>) => void;
    'on:intersectonce'?: (
      event: CustomEvent<import('@svelte-put/intersect').IntersectDetail>,
    ) => void;
  }
}
