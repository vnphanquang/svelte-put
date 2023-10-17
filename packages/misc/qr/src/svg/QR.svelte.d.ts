/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SvelteComponent } from 'svelte';
import type { SVGAttributes } from 'svelte/elements';

import { createSVGParts } from '../qr';
import type { QRConfig } from '../qr/types';

export interface QRProps extends Omit<SVGAttributes<any>, 'viewBox'>, QRConfig {}

export interface QREvents {
  'qr:init': CustomEvent<SVGElement>;
}

export interface QRSlots {
  default: {
    attributes: ReturnType<typeof createSVGParts>['attributes'];
    innerHTML: string;
  };
}

export default class QR extends SvelteComponent<QRProps, QREvents, QRSlots> {}
