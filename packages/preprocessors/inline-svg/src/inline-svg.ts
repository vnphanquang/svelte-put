import fs from 'fs';
import path from 'path';

import { getAttributes } from '@svelte-put/preprocess-helpers';
import type { Node } from '@svelte-put/preprocess-helpers';
import { toHtml } from 'hast-util-to-html';
import MagicString from 'magic-string';
import { parse } from 'svelte-parse-markup';
import { walk } from 'svelte/compiler';
import { PreprocessorGroup } from 'svelte/types/compiler/preprocess';
import type { ElementNode } from 'svg-parser';
import { parse as parseSvg } from 'svg-parser';

/**
 * @public
 * options for configuring behaviors of the inline-svg preprocessor
 */
interface InlineSvgInput {
  /** tag name to transform, default to `svg` */
  tagName?: string;
  /** attribute to get the svg source from, default to `data-inline-src` */
  inlineSrcAttributeName?: string;
  /**
   * directories to resolve the svg source by name.
   */
  directories?: string[] | string;
  /**
   * default attributes to add to the svg element, will override the attributes from the svg source,
   * but be overridden by the attributes from the element itself (in svelte source).
   */
  attributes?: Record<string, string>;
}

/**
 * @internal
 * default config of the inline-svg preprocessor
 */
export const DEFAULT_INLINE_SVG_INPUT = {
  tagName: 'svg',
  inlineSrcAttributeName: 'data-inline-src',
  directories: [] as string[],
  attributes: {} as Record<string, string>,
} satisfies InlineSvgInput;

function resolveInput(input?: InlineSvgInput | InlineSvgInput[]) {
  if (!input) return [DEFAULT_INLINE_SVG_INPUT];
  const inputs = Array.isArray(input) ? input : [input];
  return inputs.map((input) => ({
    tagName: input?.tagName ?? DEFAULT_INLINE_SVG_INPUT.tagName,
    inlineSrcAttributeName:
      input?.inlineSrcAttributeName ?? DEFAULT_INLINE_SVG_INPUT.inlineSrcAttributeName,
    directories: input?.directories
      ? Array.isArray(input.directories)
        ? input.directories
        : [input.directories]
      : DEFAULT_INLINE_SVG_INPUT.directories,
    attributes: input?.attributes ?? DEFAULT_INLINE_SVG_INPUT.attributes,
  }));
}

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
export function inlineSvg(input?: InlineSvgInput | InlineSvgInput[]): PreprocessorGroup {
  const inputs = resolveInput(input);
  return {
    markup(o) {
      const { content, filename } = o;
      const s = new MagicString(content);
      const ast = parse(content, { filename });

      walk(ast.html, {
        enter(node: Node) {
          if (node.type !== 'Element') return;
          const srcAttributes = getAttributes(content, node);
          let resolvedInput: (typeof inputs)[0] | undefined;
          let resolvedSrc = '';
          let inlineSrc = '';
          inputLoop: for (resolvedInput of inputs) {
            const { tagName, inlineSrcAttributeName, directories } = resolvedInput;
            if (node.name !== tagName || !(inlineSrcAttributeName in srcAttributes)) return;

            inlineSrc = srcAttributes[inlineSrcAttributeName];
            if (!inlineSrc.endsWith('.svg')) inlineSrc += '.svg';
            resolvedSrc = path.join(path.dirname(filename), inlineSrc);
            if (!fs.existsSync(resolvedSrc)) {
              for (const dir of directories) {
                resolvedSrc = path.join(dir, inlineSrc);
                if (!path.isAbsolute(resolvedSrc)) {
                  resolvedSrc = path.join(process.cwd(), resolvedSrc);
                }
                if (fs.existsSync(resolvedSrc)) break inputLoop;
              }
            }
          }

          if (!fs.existsSync(resolvedSrc)) {
            throw new Error(
              `\n@svelte-put/preprocess-inline-svg: cannot find svg source for ${inlineSrc} at ${filename}`,
            );
          }

          const hast = parseSvg(fs.readFileSync(resolvedSrc, 'utf8'));
          const svg = hast.children[0] as ElementNode;
          delete srcAttributes[resolvedInput.inlineSrcAttributeName];
          svg.properties = {
            ...svg.properties,
            ...resolvedInput.attributes,
            ...srcAttributes,
          };

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const html = toHtml(hast as any, { space: 'svg' });
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
