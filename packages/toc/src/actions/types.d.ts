import type { Toc } from '../toc.svelte';
import type { TocItem } from '../types';

/**
 * @package
 */
export type TocCacheItem = {
	items: Map<string, TocItem>;
	activeTocItemId?: string;
	observeThrottled: boolean;
};

export interface TocRootEventAttributes {
	ontocinit?: (event: CustomEvent<Toc>) => void;
	ontocchange?: (event: CustomEvent<Toc>) => void;
}

export type TocRootAction = import('svelte/action').Action<HTMLElement, undefined, import('./types').TocRootEventAttributes>;
export type TocLinkAction = import('svelte/action').Action<HTMLAnchorElement, TocItem | string | undefined>;

