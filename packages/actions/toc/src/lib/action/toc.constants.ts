import type { TocParameters } from './toc.types';

/**
 * The default {@link TocParameters} options for `toc` action
 * @public
 */
export const DEFAULT_TOC_PARAMETERS: TocParameters = {
  selector: ':where(h1, h2, h3, h4, h5, h6)',
  ignoreSelector: ['.toc-exclude'],
  indicator: '#',
  anchored: 96,
  insertedParagraphClass: 'toc-p',
  insertedAnchorClass: 'toc-anchor',
  itemClass: 'toc-element',
  injectedStyleId: 'toc-style',
  stimulateHashNavigation: true,
};
