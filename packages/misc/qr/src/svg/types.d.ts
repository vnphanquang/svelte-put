import { ActionReturn, Action } from 'svelte/action';

/** @public */
export type SvgQRParameter = import('../qr/types').QRConfig;

/**
 * Configurations available for
 * @public
 */
export type SvgQRAttributes = {
  'on:qr:init'?: (event: CustomEvent<SVGElement>) => void;
};

/** @public */
export type SvgQRAction = Action<SVGElement, SvgQRParameter, SvgQRAttributes>;

/** @public */
export type SvgQRActionReturn = ActionReturn<SvgQRParameter, SvgQRAttributes>;
