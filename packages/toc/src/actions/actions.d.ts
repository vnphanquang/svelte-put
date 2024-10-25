import { TocRootEventAttributes } from '../attributes';
import { TocItem } from '../types.public';

export type TocRootAction = import('svelte/action').Action<
	HTMLElement,
	undefined,
	TocRootEventAttributes
>;
export type TocLinkAction = import('svelte/action').Action<
	HTMLAnchorElement,
	TocItem | string | undefined
>;

