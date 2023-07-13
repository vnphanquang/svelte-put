/**
 * all relevant data attribute name literals
 * @internal
 */
export const ATTRIBUTES = {
  // markers from `@svelte-put/preprocess-auo-slug`
  autoslug: 'data-auto-slug',
  autoSlugAnchor: 'data-auto-slug-anchor',
  autoSlugAnchorPosition: 'data-auto-slug-anchor-position',
  // markers
  toc: 'data-toc',
  anchor: 'data-toc-anchor',
  root: 'data-toc-root',
  // customization per matching element
  id: 'data-toc-id',
  ignore: 'data-toc-ignore',
  strategy: 'data-toc-strategy',
  threshold: 'data-toc-threshold',
  // tracking information for `IntersectionObserver`
  observeFor: 'data-toc-observe-for',
  observeThrottled: 'data-toc-observe-throttled',
  observeActiveId: 'data-toc-observe-active-id',
  // for elements that `use:toclink`
  linkFor: 'data-toc-link-for',
  linkActive: 'data-toc-link-active',
};
