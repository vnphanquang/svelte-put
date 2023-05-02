import fs from 'fs';
import path from 'path';

import { DEFAULT_INLINE_SVG_CONFIG, resolveInlineSvgConfig } from '../preprocessor';
import type { resolveSources } from '../preprocessor';

import { ViteInlineSvgConfig } from './vite.types';

/**
 * @internal
 */
export const DEFAULT_VITE_PLUGIN_CONFIG = {
  ...DEFAULT_INLINE_SVG_CONFIG,
  extension: ['.svelte'],
  svgExtension: ['.svg'],
  sourceTypingGeneration: true,
} satisfies ViteInlineSvgConfig;

export function resolveExtension(extension?: string | string[], fallback: string[] = []) {
  return (extension ? (Array.isArray(extension) ? extension : [extension]) : fallback).map((ext) =>
    ext.startsWith('.') ? ext : `.${ext}`,
  );
}

/**
 * @internal
 */
export function resolveViteInlineSvgConfig(config: ViteInlineSvgConfig = {}) {
  return {
    ...resolveInlineSvgConfig(config),
    extension: resolveExtension(config.extension, DEFAULT_VITE_PLUGIN_CONFIG.extension),
    svgExtension: resolveExtension(config.svgExtension, DEFAULT_VITE_PLUGIN_CONFIG.svgExtension),
    sourceTypingGeneration:
      config.sourceTypingGeneration ?? DEFAULT_VITE_PLUGIN_CONFIG.sourceTypingGeneration,
  } satisfies ViteInlineSvgConfig;
}

/**
 * @internal
 */
function findSvgRecursively(dir: string): string[] {
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

/**
 * @internal
 */
export function generateSourceTyping(sources: ReturnType<typeof resolveSources>) {
  try {
    const { local, dirs } = sources;
    const sourcePath = path.join(
      process.cwd(),
      'node_modules/@svelte-put/preprocess-inline-svg/dist/sources.generated.d.ts',
    );
    const directories = [...local.directories, ...dirs.flatMap((d) => d.directories)];
    const svgs = new Set<string>();
    for (const dir of directories) {
      const files = findSvgRecursively(dir);
      for (const file of files) {
        const svg = path.relative(dir, file).replace('.svg', '');
        svgs.add(`'${svg}'`);
      }
    }
    const nonTyped = ['`./${string}`', '`../${string}`'].join('\n\t| ');
    const typing = Array.from(svgs).join('\n\t| ');
    const source = `export type Source = \n\t${nonTyped}\n\t| ${typing};`;
    fs.writeFileSync(sourcePath, source);
  } catch (error) {
    console.error('[svelte-preprocess-inline-svg]', error);
  }
}
