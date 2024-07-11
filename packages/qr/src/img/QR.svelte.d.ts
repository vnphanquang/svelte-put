/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Snippet, Component } from 'svelte';
import type { HTMLImgAttributes } from 'svelte/elements';

import type { QRConfig } from '../qr/types.public';

export interface QRProps extends Omit<HTMLImgAttributes, 'src'>, QRConfig {
	backgroundFill?: string;
	onqrinit?: (img: HTMLImageElement) => void;
	onqrlogofetch?: (uri: string) => void;
	img?: Snippet<[{ src: string }]>;
	width: string;
	height: string;
}

declare const QR: Component<QRProps>;
export default QR;

