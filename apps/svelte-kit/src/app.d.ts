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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type EventHandler<E = Event, T = HTMLElement> = (event: E & { target: EventTarget & T }) => any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  type CustomEventHandler<T, D = any> = EventHandler<CustomEvent<D>, T>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  type HTMLAttrs<T> = {
    [key in keyof EventList as `on${key}`]?: CustomEventHandler<T, EventList[key]>;
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    // on:clickoutside
    onclickoutside?: (event: CustomEvent<HTMLElement>) => void;
    // on:movablestart
    onmovablestart?: (
      event: CustomEvent<import('./lib/svelte-movable/types').MovableEventDetails>,
    ) => void;
    // on:movableend
    onmovableend?: (
      event: CustomEvent<import('./lib/svelte-movable/types').MovableEventDetails>,
    ) => void;
  }
}

declare module '*.svelte';
