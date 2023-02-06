import exampleTs from './example.code.svelte?raw';
import exampleJs from './js.generated/example.code.js.svelte?raw';
import quickStart from './quick-start.svelte?raw';
import typescriptSupportAuto from './typescript-auto.svelte?raw';
import typescriptSupportFallback from './typescript-fallback.d.ts?raw';

export const codes = {
  quickStart,
  example: {
    Typescript: exampleTs,
    Javascript: exampleJs,
  },
  typescriptSupport: {
    auto: typescriptSupportAuto,
    fallback: typescriptSupportFallback,
  },
};
