/// <reference types="svelte" />

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    // on:shortcut
    onshortcut?: (event: CustomEvent<import('@svelte-put/shortcut').ShortcutEventDetails>) => void;
  }
}
