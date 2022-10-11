/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

// Typescript support in svelte-kit, see
// https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}

declare namespace svelte.JSX {
  export interface HTMLAttributes {
    // on:movablestart
    onmovablestart?: (
      event: CustomEvent<import('@svelte-put/movable').MovableEventDetails>,
    ) => void;
    // on:movableend
    onmovableend?: (event: CustomEvent<import('@svelte-put/movable').MovableEventDetails>) => void;
    // on:toc
    ontoc?: (event: CustomEvent<import('@svelte-put/toc').TocEventDetails>) => void;
  }
}
