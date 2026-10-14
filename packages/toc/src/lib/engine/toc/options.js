import { resolveAnchorOptions } from '../anchor/options.js';
import { resolveIndexOptions } from '../index/options.js';
import { resolveTrackOptions } from '../track/options.js';

/** @import { TocOptions, ResolvedTocOptions } from './types.public' */

/**
 * @param {TocOptions} [options]
 * @returns {ResolvedTocOptions}
 */
export function resolveTocOptions(options = {}) {
	return {
		...DEFAULT_TOP_LEVEL_OPTIONS,
		...options,
		track: resolveTrackOptions(options.track),
		index: resolveIndexOptions(options.index),
		anchor: resolveAnchorOptions(options.anchor),
	};
}

const DEFAULT_TOP_LEVEL_OPTIONS = {
	items: new Map(),
};
