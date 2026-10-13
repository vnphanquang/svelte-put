/** @import { ResolvedTocTrack, TocTrackOptions, TocTrackResolver } from './types.public' */

/**
 * @param {TocTrackOptions | TocTrackResolver | boolean} [options]
 * @returns {ResolvedTocTrack}
 */
export function resolveTrackOptions(options) {
	const defaults = DEFAULT_TRACK_OPTIONS;
	if (options === undefined || options === null) return { ...defaults };
	if (typeof options === 'boolean') {
		return { ...defaults, enabled: () => options };
	}
	if (typeof options === 'function') {
		return { ...defaults, enabled: options };
	}
	const enabled = options.enabled ?? true;
	return {
		...defaults,
		...options,
		enabled: typeof enabled === 'function' ? enabled : () => enabled,
	};
}

const DEFAULT_TRACK_OPTIONS = /** @type {ResolvedTocTrack} */ ({
	enabled: () => true,
	flat: true,
});
