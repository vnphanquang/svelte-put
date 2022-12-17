/// <reference types="svelte" />

declare namespace svelte.JSX {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    // on:shortcut
    onshortcut?: (event: CustomEvent<import('@svelte-put/shortcut').ShortcutEventDetails>) => void;
  }
}
