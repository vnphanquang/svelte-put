/// <reference types="svelte" />

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    // on:intersect
    onintersect?: (event: CustomEvent<import('@svelte-put/intersect').IntersectDetail>) => void;
    // on:intersectonce
    onintersectonce?: (event: CustomEvent<import('@svelte-put/intersect').IntersectDetail>) => void;
  }
}
