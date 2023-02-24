import fs from 'fs';
import path from 'path';

import { getAttributes } from '@svelte-put/preprocess-helpers';
import type { Node } from '@svelte-put/preprocess-helpers';
import { toHtml } from 'hast-util-to-html';
import type { Options as HastUtilToHtmlOptions } from 'hast-util-to-html';
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
interface InlineSvgOptions {
  /** attribute to get the svg source from, default to `data-inline-src` */
  inlineSrcAttributeName?: string;
  /** whether to keep the inline src attribute after build, default to `false` */
  keepInlineSrcAttribute?: boolean;
  /**
   * directories relative to which the svg source path will be resolved
   */
  directories?: string[] | string;
  /**
   * default attributes to add to the svg element, will override the attributes from the svg source,
   * but be overridden by the attributes from the element itself (in svelte source)
   */
  attributes?: Record<string, string>;
  /**
   * options for `hast-util-to-html` during serialization
   */
  serializeOptions?: HastUtilToHtmlOptions;
}

/**
 * @internal
 * default config of the inline-svg preprocessor
 */
export const DEFAULT_INLINE_SVG_OPTIONS = {
  inlineSrcAttributeName: 'data-inline-src',
  keepInlineSrcAttribute: false,
  directories: [] as string[],
  attributes: {} as Record<string, string>,
  serializeOptions: {
    space: 'svg',
    allowDangerousCharacters: true,
  } as HastUtilToHtmlOptions,
} satisfies InlineSvgOptions;

/**
 * @internal
 */
export type ResolvedInlineSvgOptions = ReturnType<typeof resolveOptions>;

/**
 * @internal
 */
function resolveOptions(options?: InlineSvgOptions) {
  return {
    inlineSrcAttributeName:
      options?.inlineSrcAttributeName ?? DEFAULT_INLINE_SVG_OPTIONS.inlineSrcAttributeName,
    keepInlineSrcAttribute:
      options?.keepInlineSrcAttribute ?? DEFAULT_INLINE_SVG_OPTIONS.keepInlineSrcAttribute,
    directories: options?.directories
      ? Array.isArray(options.directories)
        ? options.directories
        : [options.directories]
      : DEFAULT_INLINE_SVG_OPTIONS.directories,
    attributes: options?.attributes
      ? { ...DEFAULT_INLINE_SVG_OPTIONS.attributes, ...options.attributes }
      : DEFAULT_INLINE_SVG_OPTIONS.attributes,
    serializeOptions: options?.serializeOptions
      ? {
          ...DEFAULT_INLINE_SVG_OPTIONS.serializeOptions,
          ...options.serializeOptions,
        }
      : DEFAULT_INLINE_SVG_OPTIONS.serializeOptions,
  };
}

/**
 * resolve config input and search for a default
 * If none is found, use DEFAULT_INLINE_SVG_OPTIONS.
 * If multiple of such input are found, throw an error.
 * @internal
 */
function resolveInput(input?: InlineSvgOptions | InlineSvgOptions[]) {
  if (!input)
    return {
      local: DEFAULT_INLINE_SVG_OPTIONS,
      dirs: [],
    };
  const inputs = Array.isArray(input) ? input : [input];
  const inputsWithoutDirectories = inputs.filter((input) => !input.directories);
  if (inputsWithoutDirectories.length > 1) {
    throw new Error(
      '\n@svelte-put/preprocess-inline-svg: only one default input (one without `directories` option) is allowed',
    );
  }

  return {
    local: resolveOptions(inputsWithoutDirectories[0]),
    dirs: inputs.filter((input) => input.directories).map(resolveOptions),
  };
}

/** @internal */
function findSrc(
  filename: string,
  directories: string[],
  inlineSrc?: string,
  // throwWhenNotFound = false,
): string | undefined {
  let resolvedSrc: string | undefined = undefined;
  if (inlineSrc) {
    if (!inlineSrc.endsWith('.svg')) inlineSrc += '.svg';
    if (directories.length === 0) {
      resolvedSrc = path.join(path.dirname(filename), inlineSrc);
      if (!fs.existsSync(resolvedSrc)) resolvedSrc = undefined;
    }
    for (const dir of directories) {
      resolvedSrc = path.join(dir, inlineSrc);
      if (!path.isAbsolute(resolvedSrc)) {
        resolvedSrc = path.join(process.cwd(), resolvedSrc);
      }
      if (fs.existsSync(resolvedSrc)) break;
      else resolvedSrc = undefined;
    }
  }
  return resolvedSrc;
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
export function inlineSvg(input?: InlineSvgOptions | InlineSvgOptions[]): PreprocessorGroup {
  const { local, dirs } = resolveInput(input);

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
          let inlineSrc = srcAttributes[options.inlineSrcAttributeName];
          let src = findSrc(filename, options.directories, inlineSrc);
          if (!src) {
            for (let i = 0; i < dirs.length; i++) {
              options = dirs[i];
              inlineSrc = srcAttributes[options.inlineSrcAttributeName];
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

          const { keepInlineSrcAttribute, inlineSrcAttributeName, attributes, serializeOptions } =
            options;
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
