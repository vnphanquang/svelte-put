import customEvent from './custom.event.svelte?raw';
import customTextTs from './custom.text.code.svelte?raw';
import customTriggerTs from './custom.trigger.code.svelte?raw';
import helper from './helper?raw';
import customTextJs from './js.generated/custom.text.code.js.svelte?raw';
import customTriggerJs from './js.generated/custom.trigger.code.js.svelte?raw';
import noParametersJs from './js.generated/no-parameters.code.js.svelte?raw';
import noParametersTs from './no-parameters.code.svelte?raw';
import typescriptAuto from './typescript-auto-example.svelte?raw';
import typescriptFallback from './typescript-fallback.d.ts?raw';

export const codes = {
  usage: {
    noParameters: {
      Typescript: noParametersTs,
      Javascript: noParametersJs,
    },
    customEvent,
    customTrigger: {
      Typescript: customTriggerTs,
      Javascript: customTriggerJs,
    },
    customTextLiteral: `<button use:copy={{ text: 'some text from somewhere' }}>...</button>`,
    customTextCallback: {
      Typescript: customTextTs,
      Javascript: customTextJs,
    },
    helper,
  },
  typescriptSupport: {
    auto: typescriptAuto,
    fallback: typescriptFallback,
  },
} as const;
