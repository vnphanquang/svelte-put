/// <reference types="svelte" />

declare namespace svelte.JSX {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    // on:clickoutside
    onclickoutside?: (event: CustomEvent<MouseEvent>) => void;
  }
}
