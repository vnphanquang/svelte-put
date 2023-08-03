import exampleTs from './example.code.svelte?raw';
import exampleJs from './js.generated/example.code.js.svelte?raw';
import quickStart from './quick-start.svelte?raw';

export const codes = {
  quickStart,
  example: {
    Typescript: exampleTs,
    Javascript: exampleJs,
  },
};
