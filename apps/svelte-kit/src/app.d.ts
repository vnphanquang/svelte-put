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
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface HTMLAttributes {}
}
