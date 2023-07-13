import type { TocItem } from '../action/action.d.ts';
import type { ResolvedTocParameters } from '../parameter/parameter.d.ts';

/**
 * @internal
 */
export type TocCacheItem = {
  parameters: ResolvedTocParameters;
  items: Record<string, TocItem>;
  activeTocItemId?: string;
  observeThrottled: boolean;
};
