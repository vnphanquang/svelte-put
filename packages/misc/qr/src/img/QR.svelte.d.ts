/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SvelteComponent } from 'svelte';
import type { HTMLImgAttributes } from 'svelte/elements';

import type { QRConfig } from '../qr/types';

export interface QRProps extends Omit<HTMLImgAttributes, 'src'>, QRConfig {}

export interface QREvents {
  'qr:init': CustomEvent<HTMLImgAttributes>;
  'qr:logofetch': CustomEvent<string>;
}

export interface QRSlots {
  default: {
    src: string;
  };
}

export default class QR extends SvelteComponent<QRProps, QREvents, QRSlots> {}
