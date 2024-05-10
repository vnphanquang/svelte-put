import { ActionReturn, Action } from 'svelte/action';

/**
 * verbose config for `inlineSvg` action
 *
 */
export interface InlineSvgConfig {
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
	 *
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
 *
 * input parameters for `inlineSvg` action
 */
export type InlineSvgParameter = string | InlineSvgConfig;

/**  */
export type InlineSvgAction = Action<SVGElement, InlineSvgParameter>;

/**  */
export type InlineSvgActionReturn = ActionReturn<InlineSvgParameter>;
