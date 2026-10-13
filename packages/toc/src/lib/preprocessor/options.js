/** @import { TocPreprocessorOptions, ResolvedTocPreprocessorOptions } from './types.public' */

import { resolveAnchorOptions } from '../engine/anchor/options.js';
import { resolveCompileTocOptions } from '../engine/compile-toc/preprocess/options.js';
import { resolveIndexOptions } from '../engine/index/options.js';
import { resolveTrackOptions } from '../engine/track/options.js';

/**
 * @param {TocPreprocessorOptions} [options]
 * @returns {ResolvedTocPreprocessorOptions}
 */
export function resolvePreprocessorOptions(options = {}) {
	return {
		...DEFAULT_TOP_LEVEL_OPTIONS,
		...options,
		track: resolveTrackOptions(options.track),
		index: resolveIndexOptions(options.index),
		anchor: resolveAnchorOptions(options.anchor),
		compileToc: resolveCompileTocOptions(options.compileToc),
	};
}

const DEFAULT_TOP_LEVEL_OPTIONS = {
	files: () => true,
};
