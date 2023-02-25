/**
 * verbose config for `inlineSvg` action
 * @public
 */
export interface InlineSvgActionConfig {
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

/** @internal */
export const DEFAULT_INLINE_SVG_ACTION_CONFIG: Required<InlineSvgActionConfig> = {
  src: '',
  cache: 'no-cache',
  autoDimensions: true,
  transform: (svg) => svg,
};

/**
 * @public
 * input parameters for `inlineSvg` action
 */
export type InlineSvgActionParameters = string | InlineSvgActionConfig;

/**
 * @internal
 * resolve the input parameters of `inlineSvg` action to an internally usable config
 */
export function resolveParameters(
  parameters: InlineSvgActionParameters = '',
): Required<InlineSvgActionConfig> {
  if (typeof parameters === 'string') {
    return {
      ...DEFAULT_INLINE_SVG_ACTION_CONFIG,
      src: parameters,
    };
  }

  return {
    ...DEFAULT_INLINE_SVG_ACTION_CONFIG,
    ...parameters,
  };
}
