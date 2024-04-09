import { ActionReturn, Action } from 'svelte/action';
import { SizeAttributes } from '../qr/types';

/** @public */
export type ImgQRParameter = import('../qr/types').QRConfig & SizeAttributes & {
	/** background of the generated png. Default to transparent */
	backgroundFill?: string;
};

/**
 * Configurations available for
 * @public
 */
export type ImgQRAttributes = {
	'on:qr:init'?: (event: CustomEvent<HTMLImageElement>) => void;
};

/** @public */
export type ImgQRAction = Action<HTMLImageElement, ImgQRParameter, ImgQRAttributes>;

/** @public */
export type ImgQRActionReturn = ActionReturn<ImgQRParameter, ImgQRAttributes>;
