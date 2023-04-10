import fs from 'fs';
import path from 'path';

import { getAttributes } from '@svelte-put/preprocess-helpers';
import type { Node } from '@svelte-put/preprocess-helpers';
import { toHtml } from 'hast-util-to-html';
import type { Options as HastUtilToHtmlOptions } from 'hast-util-to-html';
import MagicString from 'magic-string';
import { walk } from 'svelte/compiler';
import { parse } from 'svelte-parse-markup';
import type { ElementNode } from 'svg-parser';
import { parse as parseSvg } from 'svg-parser';

import type { InlineSvgConfig, SourceConfig } from './types';

/**
 * @internal
 * default config of the inline-svg preprocessor
 */
export const DEFAULT_SOURCES_CONFIG = {
  directories: [] as string[],
  attributes: {} as Record<string, string>,
  serializeOptions: {
    space: 'svg',
    allowDangerousCharacters: true,
  } as HastUtilToHtmlOptions,
} satisfies SourceConfig;

/**
 * @internal
 */
export const DEFAULT_PREPROCESSOR_CONFIG = {
  inlineSrcAttributeName: 'data-inline-src',
  keepInlineSrcAttribute: false,
  extension: ['svelte'],
} satisfies InlineSvgConfig;

/**
 * @internal
 */
function resolveSourceOptions(options?: SourceConfig) {
  return {
    directories: options?.directories
      ? Array.isArray(options.directories)
        ? options.directories
        : [options.directories]
      : DEFAULT_SOURCES_CONFIG.directories,
    attributes: options?.attributes
      ? { ...DEFAULT_SOURCES_CONFIG.attributes, ...options.attributes }
      : DEFAULT_SOURCES_CONFIG.attributes,
    serializeOptions: options?.serializeOptions
      ? {
          ...DEFAULT_SOURCES_CONFIG.serializeOptions,
          ...options.serializeOptions,
        }
      : DEFAULT_SOURCES_CONFIG.serializeOptions,
  };
}

/**
 * resolve config input and search for a default
 * If none is found, use DEFAULT_SOURCES_CONFIG.
 * If multiple of such input are found, throw an error.
 * @internal
 */
export function resolveSources(sources?: SourceConfig | SourceConfig[]) {
  if (!sources) return { local: DEFAULT_SOURCES_CONFIG, dirs: [] };
  if (!Array.isArray(sources)) {
    if (!sources.directories) {
      return {
        local: resolveSourceOptions(sources),
        dirs: [],
      };
    }
    const dir = resolveSourceOptions(sources);
    const local = {
      ...dir,
      directories: [],
    };
    return { local, dirs: [dir] };
  }

  const inputsWithoutDirectories = sources.filter((i) => !i.directories);
  if (inputsWithoutDirectories.length > 1) {
    throw new Error(
      '\n@svelte-put/preprocess-inline-svg: only one default input (one without `directories` option) is allowed',
    );
  }

  return {
    local: resolveSourceOptions(inputsWithoutDirectories[0]),
    dirs: sources.filter((i) => !!i.directories).map(resolveSourceOptions),
  };
}

/**
 * @internal
 */
export function resolveConfig(config?: InlineSvgConfig) {
  return {
    extension: config.extension
      ? Array.isArray(config.extension)
        ? config.extension
        : [config.extension]
      : DEFAULT_PREPROCESSOR_CONFIG.extension,
    inlineSrcAttributeName:
      config.inlineSrcAttributeName ?? DEFAULT_PREPROCESSOR_CONFIG.inlineSrcAttributeName,
    keepInlineSrcAttribute:
      config.keepInlineSrcAttribute ?? DEFAULT_PREPROCESSOR_CONFIG.keepInlineSrcAttribute,
  } satisfies InlineSvgConfig;
}

/** @internal */
export function findSvgSrc(
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
    } else {
      for (const dir of directories) {
        resolvedSrc = path.join(dir, inlineSrc);
        if (!path.isAbsolute(resolvedSrc)) {
          resolvedSrc = path.join(process.cwd(), resolvedSrc);
        }
        if (fs.existsSync(resolvedSrc)) break;
        else resolvedSrc = undefined;
      }
    }
  }
  return resolvedSrc;
}

/**
 * @internal
 */
export function transform(
  code: string,
  filename: string,
  sources: ReturnType<typeof resolveSources>,
  config: ReturnType<typeof resolveConfig>,
) {
  const { local, dirs } = sources;
  const { inlineSrcAttributeName, keepInlineSrcAttribute } = config;

  const s = new MagicString(code);
  const ast = parse(code, { filename });

  walk(ast.html, {
    enter(node: Node) {
      if (node.type !== 'Element' || node.name !== 'svg') return;
      const srcAttributes = getAttributes(code, node);

      let options = local;
      let inlineSrc = srcAttributes[inlineSrcAttributeName];
      let svgSource = findSvgSrc(filename, options.directories, inlineSrc);
      if (!svgSource) {
        for (let i = 0; i < dirs.length; i++) {
          options = dirs[i];
          inlineSrc = srcAttributes[inlineSrcAttributeName];
          svgSource = findSvgSrc(filename, options.directories, inlineSrc);
          if (svgSource) break;
        }
      }

      if (!inlineSrc) return;
      if (!svgSource) {
        throw new Error(
          `\n@svelte-put/preprocess-inline-svg: cannot find svg source for ${inlineSrc} at ${filename}`,
        );
      }

      const { attributes, serializeOptions } = options;
      const hast = parseSvg(fs.readFileSync(svgSource, 'utf8'));
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
}
