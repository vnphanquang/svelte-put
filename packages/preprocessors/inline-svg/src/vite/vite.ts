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
/**
 * preprocess svelte markup and inline matching svgs
 *
 * @example
 *
 * Given this config
 *
 * ```javascript
 * // vite.config.js
 *
 * import { inlineSvg } from '@svelte-put/preprocess-inline-svg/vite';
 * import { sveltekit } from '@sveltejs/kit/vite';
 * import { defineConfig } from 'vite';
 *
 * export default defineConfig({
 *   plugins: [
 *     // make sure inlineSvg comes before `svelte` or `sveltekit` plugin
 *     inlineSvg([
 *       {
 *         directories: 'src/assets/icons',
 *         attributes: {
 *           class: 'icon',
 *           width: '20',
 *           height: '20',
 *         },
 *       },
 *       {
 *         directories: 'src/assets/pictograms',
 *       },
 *     ]),
 *     sveltekit(),
 *   ],
 * });
 * ```
 *
 * and the assets files as follow
 *
 * ```tree
 * src/assets
 *     |
 *     |-- icons
 *          |-- svelte.svg
 *          |
 *          |-- google
 *                |-- arrow-right.svg
 *          |-- simpleicons
 *                |-- github.svg
 *     |
 *     |-- pictograms
 *          |-- diagram.svg
 * ```
 *
 * We can now do
 *
 * ```html
 * <!-- this will have width="20" height="20" as specified in the config -->
 * <svg data-inline-src="svelte"></svg>
 *
 * <!-- nested -->
 * <svg data-inline-src="google/arrow-right"></svg>
 * <svg data-inline-src="simpleicons/github"></svg>
 *
 * <!-- with custom attributes -->
 * <svg data-inline-src="diagram" width="100" height="100"></svg>
 *
 * <!-- alternatively, you can provide a per-case path that is relative to the current source file -->
 * <svg data-inline-src="./local-icon.svg"></svg>
 *
 * <!-- if the source svg is not found for any of the above, an error will be thrown -->
 * ```
 *
 * @public
 * @param sources - config for svg sources
 * @param config - global config for the plugin & preprocessor
 * @returns vite plugin
 */
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
      if (rConfig.sourceTypingGeneration) {
        generateSourceTyping(rSources);
      }

      const updateSourceTyping = debounce(() => {
        if (rConfig.sourceTypingGeneration) {
          generateSourceTyping(rSources);
        }
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
