/// <reference types="svelte" />

declare namespace svelteHTML {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    'on:shortcut'?: (
      event: CustomEvent<import('@svelte-put/shortcut').ShortcutEventDetails>,
    ) => void;
  }
}
