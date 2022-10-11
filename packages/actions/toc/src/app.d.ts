/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type HTMLAttrs<T> = {
    [key in keyof EventList as `on${key}`]?: CustomEventHandler<T, EventList[key]>;
  };
}
