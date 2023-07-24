declare module '@svelte-put/inline-svg' {
  import type { ActionReturn } from 'svelte/action';
  /**
   * @public
   * Svelte action for dynamically inlining remote-fetched SVG into DOM
   *
   * @example
   *
   * ```html
   * <script>
   *   import { inlineSvg } from '@svelte-put/inline-svg;
   * </script>
   *
   * <svg use:inlineSvg={"http://example.com/icon.svg"}></svg>
   * ```
   *
   * @remarks
   *
   * For a static solution for inlining SVG at build time, use {@link https://svelte-put.vnphanquang.com/docs/preprocess-inline-svg | @svelte-put/preprocess-inline-svg},
   * which is also conveniently re-exported by this package
   *
   * ```javascript
   * // svelte.config.js
   * import inlineSvg from '@svelte-put/preprocess-inline-svg';
   *
   * const config = {
   *   preprocess: [inlineSvg()],
   * };
   * export default config;
   * ```
   *
   * @param node - SVGElement to inline SVG into
   * @param param - config for the action.
   * */
  export function inlineSvg(node: SVGElement, param: InlineSvgParameter): InlineSvgActionReturn;
  /**
   * resolve the input parameters of `inlineSvg` action to an internally usable config
   * */
  export function resolveConfig(param?: InlineSvgParameter | undefined): Required<InlineSvgConfig>;

  export const DEFAULT_INLINE_SVG_ACTION_CONFIG: Required<InlineSvgConfig>;
  /**
   * Deprecated, use `InlineSvgParameter` and `InlineSvgConfig` instead
   */
  export type InlineSvgParameters = InlineSvgParameter;
  /**
   * verbose config for `inlineSvg` action
   * */
  interface InlineSvgConfig {
    /** svg remote URI */
    src: string;
    /** cache policy for use in fetch from svg `src` */
    cache?: Request['cache'];
    /**
     * automatically calculate dimensions from the available attributes
     * of both the local SVG element (on which action is used) and the remote SVG
     *
     * For example, if you specify only `width` to the local SVG element, the
     * height will automatically be calculated from the remote SVG
     *
     * @remarks
     *
     * For this to work, width & height must be "extractable" from the remote element,
     * that is, the remote SVG must either have the `viewBox` or both `width` and `height` attributes that
     * is in the same unit.
     */
    autoDimensions?: boolean;
    /**
     * optionally transform the SVG string fetched from remote source before inlining
     */
    transform?: (svg: string) => string;
  }
  /**
   * @public
   * input parameters for `inlineSvg` action
   */
  type InlineSvgParameter = string | InlineSvgConfig;

  type InlineSvgActionReturn = ActionReturn<InlineSvgParameter>;
}

//# sourceMappingURL=index.d.ts.map
