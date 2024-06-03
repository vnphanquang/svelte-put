import { ActionReturn, Action } from 'svelte/action';

/**  */
export type SvgQRParameter = import('../qr/types').QRConfig;

/** Configurations available for */
export type SvgQRAttributes = {
	onqrinit?: (event: CustomEvent<SVGElement>) => void;
};
export type SvgQRAction = Action<SVGElement, SvgQRParameter, SvgQRAttributes>;
export type SvgQRActionReturn = ActionReturn<SvgQRParameter, SvgQRAttributes>;
