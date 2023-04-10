import debounce from 'lodash.debounce';
import type { Plugin, ViteDevServer } from 'vite';

import { SourceConfig, resolveSources, transform } from '../preprocessor';

import { generateSourceTyping, resolveViteInlineSvgConfig } from './vite.internals';
import type { ViteInlineSvgConfig } from './vite.types';

/**
 * @internal
 */
function hotReload(server: ViteDevServer) {
  // send reload page to client
  server.ws.send({ type: 'full-reload' });
}

/**
 * @internal
 */
function matchFileExt(file: string, extensions: string[]) {
  return extensions.some((ext) => file.endsWith(ext));
}

export function inlineSvg(
  sources: SourceConfig | SourceConfig[] = [],
  config: ViteInlineSvgConfig = {},
): Plugin {
  const rSources = resolveSources(sources);
  const rConfig = resolveViteInlineSvgConfig(config);

  return {
    name: 'svelte-preprocess-inline-svg',
    enforce: 'pre',
    transform(code, id) {
      if (matchFileExt(id, rConfig.extension)) {
        return transform(code, id, rSources, rConfig);
      }
    },
    configureServer(server) {
      generateSourceTyping(rSources);

      const updateSourceTyping = debounce(() => {
        generateSourceTyping(rSources);
        hotReload(server);
      });

      server.watcher.add(rConfig.svgExtension.map((ext) => `**/*${ext}`));
      server.watcher.on('add', (file) => {
        if (matchFileExt(file, rConfig.svgExtension)) {
          updateSourceTyping();
        }
      });
      server.watcher.on('unlink', (file) => {
        if (matchFileExt(file, rConfig.svgExtension)) {
          updateSourceTyping();
        }
      });
      server.watcher.on('change', (file) => {
        if (matchFileExt(file, rConfig.svgExtension)) {
          hotReload(server);
        }
      });
    },
  };
}

export default inlineSvg;
