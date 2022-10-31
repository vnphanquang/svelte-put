/// <reference types="svelte" />

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    // on:clickoutside
    onclickoutside?: (event: CustomEvent<MouseEvent>) => void;
  }
}
