import type { TocItem } from '../action/action.d.ts';
import type { ResolvedTocConfig } from '../parameter/parameter.d.ts';

/**
 * @internal
 */
export type TocCacheItem = {
  config: ResolvedTocConfig;
  items: Record<string, TocItem>;
  activeTocItemId?: string;
  observeThrottled: boolean;
};
