/// <reference types="svelte" />

declare namespace svelteHTML {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    'on:movablestart'?: (
      event: CustomEvent<import('@svelte-put/movable').MovableEventDetail>,
    ) => void;
    'on:movableend'?: (
      event: CustomEvent<import('@svelte-put/movable').MovableEventDetail>,
    ) => void;
  }
}
