/**
 * svelte action parameters to config behavior of `toc`
 * @public
 */
export interface TocParameters {
  /**
   * The query selector used to find all matching
   * DOM elements. Defaults to `:where(h1, h2, h3, h4, h5, h6)`
   */
  selector: string;
  /**
   * Query selector(s) that match DOM elements to ignore
   * Each selector is used as `:not(selector)`. Defaults to `.toc-exclude`
   */
  ignoreSelector: string[] | string;
  /**
   * Whether to insert an anchor element to each matching DOM element, and
   * potentially a paragraph element for "scroll padding". Defaults to `96`
   *
   * @remarks
   *
   * The action will insert an anchor element as a child of
   * each matching DOM element for navigation purposes.
   *
   * If you click on an anchor tag that references an internal
   * element (attribute id = "#some-element"), the browser should do an
   * equivalence of setting the `window.scrollY` to `offsetTop` of the element.
   * Often, however, this is not what user expects, because some fixed content
   * such as a navbar will cover up some of the content of element.
   *
   * `toc` solves this by also adding an `absolute`,`hidden` paragraph
   * relative to the matching DOM element, besides the mentioned anchor element,
   * The `id` attribute holder is delegated to this paragraph. If anchored is
   * provided as a number, it will be the height of said paragraph,
   * effectively creating a "scroll padding".
   *
   * Say for example, your navbar is 80px in height, you'll want to set
   * `anchored` to a number \>= 80.
   *
   * If `anchored` is nonpositive, no paragraph will be inserted.
   *
   * If `anchored` is `false`, no paragraph or anchor will be inserted.
   *
   */
  anchored: number | boolean;
  /**
   * Whether to display an indicator on:hover of the `textContent` of
   * the matching DOM element. Defaults to `#`
   *
   * @remarks
   *
   * The behavior is similar to hovering on a heading in a github readme file.
   * This option has no effect if `anchored` is set to `false`.
   * Turn off any indicator behavior by setting `indicator` to `false`.
   *
   * Because only one inline style tag is injected even when multiple `toc`
   * action is used on the same page, you should set a consistent `indicator`
   * for all `toc` invocation to avoid unexpected behavior.
   */
  indicator: string | boolean;
  /**
   * If `indicator` is not `false`, an inline style tag is injected to `<head>`.
   * This is the id of that style tag. Defaults to `toc-style`
   */
  injectedStyleId: string;
  /**
   * The `class` added to the inserted paragraph (if any). Defaults to `toc-p`
   */
  insertedParagraphClass: string;
  /**
   * The `class` added to the inserted anchor tag (if any). Defaults to `toc-anchor`
   */
  insertedAnchorClass: string;
  /**
   * The `class` added to each matching DOM element. Defaults to `toc-element`
   */
  itemClass: string;
  /**
   * `toc` is run after component is mounted so if you do not
   * provide yourself the id for the matching DOM element from the
   * server side, browser won't automatically scroll this element into view.
   * `stimulateHashNavigation` (defaults to `true`) will stimulate this behavior.
   */
  stimulateHashNavigation: boolean;
}

/**
 * Resolved {@link TocParameters} from `toc` action input
 * @internal
 */
export interface ResolvedTocParameters {
  anchored: number;
  indicator: string;
  selector: string;
  insertedParagraphClass: string;
  itemClass: string;
  injectedStyleId: string;
  insertedAnchorClass: string;
  stimulateHashNavigation: boolean;
}

/**
 * `detail` payload for `toc` CustomEvent
 * @public
 */
export interface TocEventDetails {
  /**
   * A unique UUID from `crypto.randomUUID()` representing
   * the operation. This is used for caching so that if the action
   * is run multiple times with same parameters it can use the results
   * from previous execution.
   */
  id: string;
  /**
   * Details about each DOM element transformed
   * during the operation of the `toc` action
   */
  items: TocEventItemDetails[];
}

/**
 * Details about each DOM element transformed
 * during the operation of the `toc` action
 * @public
 */
export interface TocEventItemDetails {
  /**
   * The DOM element that was transformed
   */
  element: HTMLElement;
  /**
   * The id of `element` or the "slugified" string from `textContent`
   */
  id: string;
  /**
   * The `textContent` of `element`
   */
  text: string;
  /**
   * The paragraph element inserted by the `toc` action unless
   * the `anchored` option from {@link TocParameters} is
   * either `false` or nonpositive
   */
  p?: HTMLParagraphElement;
  /**
   * The anchor element inserted by the `toc` action unless
   * the `anchored` option from {@link TocParameters} is false
   */
  anchor?: HTMLAnchorElement;
}
