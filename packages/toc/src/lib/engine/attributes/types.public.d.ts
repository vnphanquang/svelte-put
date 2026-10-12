import { TocItem } from '../toc';

export interface TocAttributesResolverInput {
	/** list of the indexed table-of-contents items */
	items: TocItem[];
	/** this particular item */
	item: TocItem;
	/** default attributes */
	defaults: TocAttributes;
}

export type TocAttributes = Record<string, string>;
export type TocAttributesResolver = (input: TocAttributesResolverInput) => TocAttributes;
export type ResolvedTocAttributes = TocAttributesResolver;
