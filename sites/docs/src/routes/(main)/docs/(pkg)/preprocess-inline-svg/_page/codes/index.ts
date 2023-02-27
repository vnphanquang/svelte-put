import limitationMarkup from './limitation-markup.svelte?raw';
import limitationVariable from './limitation-variable.svelte?raw';
import quickStartAssets from './quickStart.assets.txt?raw';
import quickStartConfig from './quickStart.config.ts?raw';
import quickStartUsage from './quickStart.usage.svelte?raw';

export const codes = {
  quickStart: {
    config: quickStartConfig,
    assets: quickStartAssets,
    usage: quickStartUsage,
  },
  limitation: {
    variable: limitationVariable,
    markup: limitationMarkup,
  },
};
