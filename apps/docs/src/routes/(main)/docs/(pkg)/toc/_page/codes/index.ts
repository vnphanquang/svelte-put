import dataAttributes from './data-attributes.d.ts?raw';
import eventsTs from './events.code.svelte?raw';
import eventsJs from './js.generated/events.code.js.svelte?raw';
import quickStartInput from './quick-start-input.svelte?raw';
import quickStartOutput from './quick-start-output.svelte?raw';

export const codes = {
  quickStart: {
    input: quickStartInput,
    output: quickStartOutput,
  },
  events: {
    Typescript: eventsTs,
    Javascript: eventsJs,
  },
  dataAttributes,
};
