import type { Snippet, Component } from 'svelte';
import type { SVGAttributes } from 'svelte/elements';

import { createQrSvgParts } from '../qr';
import type { QRConfig } from '../qr/types.public';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QRProps = Omit<SVGAttributes<any>, 'viewBox'> & QRConfig & {
	onqrinit?: (svg: SVGElement) => void;
	svg?: Snippet<[{
		attributes: ReturnType<typeof createQrSvgParts>['attributes'];
		innerHTML: string;
	}]>;
};

declare const QR: Component<QRProps>;
export default QR;

