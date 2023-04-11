import limitationMarkup from './limitation-markup.svelte?raw';
import limitationVariable from './limitation-variable.svelte?raw';
import quickStartAssets from './quickStart.assets.txt?raw';
import quickStartConfigSvelte from './quickStart.config.svelte.ts?raw';
import quickStartConfigVite from './quickStart.config.vite.ts?raw';
import quickStartUsage from './quickStart.usage.svelte?raw';
import additionalSvelteTyping from './typing.additionalSvelteTyping.d.ts?raw';
import inlineSrcAttributeName from './typing.inlineSrcAttributeName.ts?raw';
import types from './typing.types.ts?raw';

export const codes = {
  quickStart: {
    config: {
      'vite plugin': quickStartConfigVite,
      'svelte preprocessor': quickStartConfigSvelte,
    },
    assets: quickStartAssets,
    usage: quickStartUsage,
  },
  limitation: {
    variable: limitationVariable,
    markup: limitationMarkup,
  },
  typing: {
    inlineSrcAttributeName,
    additionalSvelteTyping,
    types,
  },
};
