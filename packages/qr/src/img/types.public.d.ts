import { ActionReturn, Action } from 'svelte/action';

import { SizeAttributes } from '../qr/types.private';
import { QRConfig } from '../qr/types.public';

export type ImgQRParameter = QRConfig &
	SizeAttributes & {
		/** background of the generated png. Default to transparent */
		backgroundFill?: string;
	};

/** Configurations available for */
export type ImgQRAttributes = {
	onqrinit?: (event: CustomEvent<HTMLImageElement>) => void;
};
export type ImgQRAction = Action<HTMLImageElement, ImgQRParameter, ImgQRAttributes>;
export type ImgQRActionReturn = ActionReturn<ImgQRParameter, ImgQRAttributes>;

