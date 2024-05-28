/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Snippet, SvelteComponent } from 'svelte';
import type { HTMLImgAttributes } from 'svelte/elements';

import type { QRConfig } from '../qr/types';

export interface QRProps extends Omit<HTMLImgAttributes, 'src'>, QRConfig {
	backgroundFill?: string;
	onqrinit?: (img: HTMLImageElement) => void;
	onqrlogofetch?: (uri: string) => void;
	img?: Snippet<[{ src: string }]>;
	width: string;
	height: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class QR extends SvelteComponent<QRProps, any, any> {}
