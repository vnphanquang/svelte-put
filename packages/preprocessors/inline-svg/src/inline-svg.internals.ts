import fs from 'fs';
import path from 'path';

import type { Options as HastUtilToHtmlOptions } from 'hast-util-to-html';

import type { PreprocessConfig, SourceConfig } from './inline-svg.types';

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
} as const satisfies PreprocessConfig;

/**
 * @internal
 */
function resolveOptions(options?: SourceConfig) {
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
        local: resolveOptions(sources),
        dirs: [],
      };
    }
    const dir = resolveOptions(sources);
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
    local: resolveOptions(inputsWithoutDirectories[0]),
    dirs: sources.filter((i) => !!i.directories).map(resolveOptions),
  };
}

/**
 * @internal
 */
export function resolveConfig(config?: PreprocessConfig) {
  return {
    ...DEFAULT_PREPROCESSOR_CONFIG,
    ...config,
  } as const satisfies PreprocessConfig;
}

/**
 * @internal
 */
export function findSvgRecursively(dir: string): string[] {
  /** find all svg files in provided directory */
  const files = fs
    .readdirSync(dir)
    .map((f) => path.join(dir, f))
    .filter((f) => {
      const stat = fs.statSync(f);
      if (stat.isDirectory()) return true;
      if (stat.isFile()) return f.endsWith('.svg');
      return false;
    });
  /** find all svg files in sub directories */
  const directories = files.filter((f) => fs.statSync(f).isDirectory());
  const subFiles = directories.flatMap(findSvgRecursively);
  return [...files, ...subFiles];
}

/** @internal */
export function findSrc(
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
