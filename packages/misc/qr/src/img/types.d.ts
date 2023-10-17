import { ActionReturn, Action } from 'svelte/action';

/** @public */
export type ImgQRParameter = import('../qr/types').QRConfig;

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
