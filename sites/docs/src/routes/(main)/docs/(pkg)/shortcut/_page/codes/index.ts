import eventsVsCallbackTs from './events-vs-callback.code.svelte?raw';
import eventsVsCallbackJs from './js.generated/events-vs-callback.code.js.svelte?raw';
import quickStartJs from './js.generated/quickStart.code.js.svelte?raw';
import keys from './keys.svelte?raw';
import modifiers from './modifiers.svelte?raw';
import originalEvent from './originalEvent.svelte?raw';
import quickStartTs from './quickStart.code.svelte?raw';

export const codes = {
  quickStart: {
    Typescript: quickStartTs,
    Javascript: quickStartJs,
  },
  eventsVsCallback: {
    Typescript: eventsVsCallbackTs,
    Javascript: eventsVsCallbackJs,
  },
  originalEvent,
  keys,
  modifiers,
};
