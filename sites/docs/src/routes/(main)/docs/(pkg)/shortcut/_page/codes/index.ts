import eventsVsCallbackTs from './events-vs-callback.code.svelte?raw';
import eventsVsCallbackJs from './js.generated/events-vs-callback.code.js.svelte?raw';
import quickStartJs from './js.generated/quickStart.code.js.svelte?raw';
import keys from './keys.svelte?raw';
import modifiers from './modifiers.svelte?raw';
import quickStartTs from './quickStart.code.svelte?raw';
import typescriptSupportAuto from './typescript-auto.svelte?raw';
import typescriptSupportFallback from './typescript-fallback.d.ts?raw';

export const codes = {
  quickStart: {
    Typescript: quickStartTs,
    Javascript: quickStartJs,
  },
  typescriptSupport: {
    auto: typescriptSupportAuto,
    fallback: typescriptSupportFallback,
  },
  eventsVsCallback: {
    Typescript: eventsVsCallbackTs,
    Javascript: eventsVsCallbackJs,
  },
  keys,
  modifiers,
};
