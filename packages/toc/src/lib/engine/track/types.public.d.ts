import type { TocItem } from '../toc';

export interface TocTrackOptions {
	/**
	 * where to add necessary setup to enable tracking
	 * @default true
	 */
	enabled?: boolean | TocTrackResolver;
	/**
	 * indicate whether the indexable content is "flat": one section comes after the other (imagine a
	 * typical article / blog post). On the contrary, non-flat content is considered one that contains
	 * at least two sections that live in two completely separate DOM subtree.
	 *
	 * When on, the visibility tracking should be more accurate.
	 *
	 * Alternatively:
	 *
	 * - keep this on but provide a callback to the `.enabled` options to filter out special content
	 *   that isn't in the normal flat flow of main content and therefore should not be tracked, or
	 * - set `toc.runtime.index` and/or `toc.enhance.scope` on just the main flat content
	 *
	 * @default true
	 */
	flat?: boolean;
}

export type TocTrackResolverInput = {
	item: TocItem;
};
export type TocTrackResolver = (input: TocTrackResolverInput) => boolean;

export type ResolvedTocTrack = Required<Omit<TocTrackOptions, 'enabled'>> & {
	enabled: TocTrackResolver;
};
