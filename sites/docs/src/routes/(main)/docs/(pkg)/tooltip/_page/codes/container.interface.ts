export type TooltipContainer = {
  /**
   * class name(s) to assign to tooltip container. Typically needed depending
   * on the positioning strategy
   */
  class?:
    | string
    | {
        default?: string;
        /** toggled on when tooltip is visible */
        visible?: string;
      };
  /**
   * HTML tag to render the tooltip container.
   * Defaults to `div`
   */
  tag?: string;
  /**
   * `HTMLElement` to render the tooltip container as child.
   * Defaults to `parent` of the node action is placed on
   */
  target?:
    | 'parent'
    | 'self'
    | 'body'
    | HTMLElement
    | ((node: HTMLElement, tooltip: HTMLElement) => void);
  /**
   * number of milliseconds to debounce show / hide state of the tooltip.
   * Defaults to `false` (show / hide immediately)
   */
  debounce?: false | number;
  /**
   * config for handling of `pointer-events` on the container element
   * Defaults to `true`
   *
   * @remarks
   * By default `pointer-events` is set to `none` by default, and `auto` when triggered.
   * Set to `false` to disable default behavior, or provide string(s) to
   * corresponding states
   */
  pointerEvents?:
    | boolean
    | {
        default?: string;
        /** value when tooltip is visible */
        visible?: string;
      };
  /**
   * the attribute to toggle in respond to tooltip's visibility state.
   * Defaults to `data-visible`.
   *
   * @remarks
   * Set to `false` to disable, or provide a string to use as attribute name.
   */
  visibleAttribute?: boolean | string;
  /**
   * config for accessibility
   * Defaults to `true`
   *
   * @remarks
   * By default:
   *   - (for container element) `role` is set to `tooltip`,
   *   - (for container element) `id` is taken from `aria-describedby` of
   *     the node action is placed on (if any),
   *     or auto-generated from a global counter,
   *   - (for node on which action is used) `aria-describedby` is set to the `id` of
   *     the container element (if not already exists)
   *
   * Set to `false` to disable default behavior, or provide string(s) to
   * the corresponding attributes
   */
  aria?:
    | boolean
    | {
        role?: string;
        id?: string;
      };
};
