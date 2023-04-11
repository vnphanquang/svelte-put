import { PreprocessorGroup } from 'svelte/types/compiler/preprocess';

import { resolveInlineSvgConfig, resolveSources, transform } from './preprocessor.internals';
import type { InlineSvgConfig, SourceConfig } from './preprocessor.types';

/**
 * preprocess svelte markup and inline matching svgs
 *
 * @example
 *
 * Given this config
 *
 * ```javascript
 * // svelte.config.js
 *
 * import inlineSvg from '@svelte-put/preprocess-inline-svg';
 *
 * \/** @type {import('@sveltejs/kit').Config} *\/
 * const config = {
 *   preprocess: [
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
 *     // other preprocessors
 *   ],
 * };
 * export default config;
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
 * @param config - global config for the svelte preprocessor
 * @returns svelte preprocessor
 */
export function inlineSvg(
  sources?: SourceConfig | SourceConfig[],
  config?: InlineSvgConfig,
): PreprocessorGroup {
  const rSources = resolveSources(sources);
  const rConfig = resolveInlineSvgConfig(config);

  return {
    markup({ content, filename }) {
      return transform(content, filename, rSources, rConfig);
    },
  };
}

export default inlineSvg;
