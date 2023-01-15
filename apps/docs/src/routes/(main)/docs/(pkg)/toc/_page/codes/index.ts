import dataAttributes from './data-attributes.d.ts?raw';
import eventsTs from './events.code.svelte?raw';
import eventsJs from './js.generated/events.code.js.svelte?raw';
import quickStartInput from './quick-start-input.svelte?raw';
import quickStartOutput from './quick-start-output.svelte?raw';
import eventTypingAuto from './typescript-auto.svelte?raw';
import eventTypingFallback from './typescript-fallback.d.ts?raw';

export const codes = {
  quickStart: {
    input: quickStartInput,
    output: quickStartOutput,
  },
  events: {
    example: {
      Typescript: eventsTs,
      Javascript: eventsJs,
    },
    typing: {
      auto: eventTypingAuto,
      fallback: eventTypingFallback,
    },
  },
  dataAttributes,
};
