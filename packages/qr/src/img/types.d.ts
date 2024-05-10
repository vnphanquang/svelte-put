import { ActionReturn, Action } from 'svelte/action';

import { SizeAttributes } from '../qr/types';

/**  */
export type ImgQRParameter = import('../qr/types').QRConfig & SizeAttributes & {
	/** background of the generated png. Default to transparent */
	backgroundFill?: string;
};

/**
 * Configurations available for
 *
 */
export type ImgQRAttributes = {
	'on:qr:init'?: (event: CustomEvent<HTMLImageElement>) => void;
};

/**  */
export type ImgQRAction = Action<HTMLImageElement, ImgQRParameter, ImgQRAttributes>;

/**  */
export type ImgQRActionReturn = ActionReturn<ImgQRParameter, ImgQRAttributes>;
