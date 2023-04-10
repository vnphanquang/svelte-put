import type { InlineSvgConfig } from '../preprocessor';

export interface ViteInlineSvgConfig extends InlineSvgConfig {
  /** file extensions to search & transform in vite plugin. Default to `.svelte` */
  extension?: string | string[];
  /** svg extensions for file watcher in vite dev server. Default to `.svg` */
  svgExtension?: string | string[];
  /** whether to enable source typing generation in vite dev server */
  sourceTypingGeneration?: boolean;
}
