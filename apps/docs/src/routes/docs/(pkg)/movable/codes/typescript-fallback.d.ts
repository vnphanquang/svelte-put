/// <reference types="svelte" />

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    // on:movablestart
    onmovablestart?: (
      event: CustomEvent<import('@svelte-put/movable').MovableEventDetails>,
    ) => void;
    // on:movableend
    onmovableend?: (event: CustomEvent<import('@svelte-put/movable').MovableEventDetails>) => void;
  }
}
