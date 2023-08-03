import initialization from './initialization.svelte?raw';
import quickStartJs from './js.generated/quickStart.code.js.svelte?raw';
import usageEventsJs from './js.generated/usage.events.code.js.svelte?raw';
import onceJs from './js.generated/usage.once.code.js.svelte?raw';
import quickStartTs from './quickStart.code.svelte?raw';
import usageEventsTs from './usage.events.code.svelte?raw';
import onceTs from './usage.once.code.svelte?raw';

export const codes = {
  quickStart: {
    Typescript: quickStartTs,
    Javascript: quickStartJs,
  },
  usage: {
    initialization,
    events: {
      Typescript: usageEventsTs,
      Javascript: usageEventsJs,
    },
    once: {
      Typescript: onceTs,
      Javascript: onceJs,
    },
  },
};
