import fs from 'fs';

import { getAttributes } from '@svelte-put/preprocess-helpers';
import type { Node } from '@svelte-put/preprocess-helpers';
import { toHtml } from 'hast-util-to-html';
import MagicString from 'magic-string';
import { walk } from 'svelte/compiler';
import { PreprocessorGroup } from 'svelte/types/compiler/preprocess';
import { parse } from 'svelte-parse-markup';
import type { ElementNode } from 'svg-parser';
import { parse as parseSvg } from 'svg-parser';

import { findSrc, resolveConfig, resolveSources } from './inline-svg.internals';
import type { PreprocessConfig, SourceConfig } from './inline-svg.types';

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
 * @param input - configuration options
 * @returns svelte preprocessor
 */
export function inlineSvg(
  sources?: SourceConfig | SourceConfig[],
  config?: PreprocessConfig,
): PreprocessorGroup {
  const rSources = resolveSources(sources);
  const { inlineSrcAttributeName, keepInlineSrcAttribute } = resolveConfig(config);

  const { local, dirs } = rSources;

  return {
    markup(o) {
      const { content, filename } = o;
      const s = new MagicString(content);
      const ast = parse(content, { filename });
      walk(ast.html, {
        enter(node: Node) {
          if (node.type !== 'Element' || node.name !== 'svg') return;
          const srcAttributes = getAttributes(content, node);

          let options = local;
          let inlineSrc = srcAttributes[inlineSrcAttributeName];
          let src = findSrc(filename, options.directories, inlineSrc);
          if (!src) {
            for (let i = 0; i < dirs.length; i++) {
              options = dirs[i];
              inlineSrc = srcAttributes[inlineSrcAttributeName];
              src = findSrc(filename, options.directories, inlineSrc);
              if (src) break;
            }
          }

          if (!inlineSrc) return;
          if (!src) {
            throw new Error(
              `\n@svelte-put/preprocess-inline-svg: cannot find svg source for ${inlineSrc} at ${filename}`,
            );
          }

          const { attributes, serializeOptions } = options;
          const hast = parseSvg(fs.readFileSync(src, 'utf8'));
          const svg = hast.children[0] as ElementNode;
          if (!keepInlineSrcAttribute) {
            delete srcAttributes[inlineSrcAttributeName];
          }
          svg.properties = {
            ...svg.properties,
            ...attributes,
            ...srcAttributes,
          };

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const html = toHtml(hast as any, serializeOptions);
          s.update(node.start, node.end, html);
        },
      });

      return {
        code: s.toString(),
        map: s.generateMap(),
      };
    },
  };
}

export default inlineSvg;
