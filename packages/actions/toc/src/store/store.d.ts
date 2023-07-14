import type { TocChangeEventDetail, TocInitEventDetail } from '../events/events.d.ts';

import type { createTocStore } from './index.js';

/**
 * value of the `store` provided to {@link TocParameters}
 * @public
 */
export type TocStoreValue = {
  /** the ID of this toc operation. see {@link TocParameters}, set on mount (`tocinit`) */
  id?: string;
  /** the extracted toc items, populated on mount (`tocinit`) */
  items: TocInitEventDetail['items'];
  /** the active toc items, set on update (`tocchange`) if `observer` is set to true */
  activeItem?: TocChangeEventDetail['activeItem'];
};

/**
 * The store type inferred from {@link createTocStore}
 * @public
 */
export type TocStore = ReturnType<typeof createTocStore>;
