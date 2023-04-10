import type { Plugin } from 'vite';

import { resolveConfig, resolveSources, transform } from './internals';
import type { InlineSvgConfig, SourceConfig } from './types';

export function inlineSvg(
  sources: SourceConfig | SourceConfig[] = [],
  config: InlineSvgConfig = {},
): Plugin {
  const rSources = resolveSources(sources);
  const rConfig = resolveConfig(config);
  return {
    name: 'svelte-preprocess-inline-svg',
    enforce: 'pre',
    transform(code, id) {
      if (rConfig.extension.some((ext) => id.endsWith(ext))) {
        return transform(code, id, rSources, rConfig);
      }
    },
  };
}
