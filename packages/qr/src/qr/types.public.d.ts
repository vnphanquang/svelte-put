import type { qr } from 'headless-qr';

import { SizeAttributes } from './types.private';

export type QRCode = ReturnType<typeof qr>;
export type QRCodeOptions = NonNullable<Parameters<typeof qr>[1]>;

/**
 * instructions to render a QR
 */
export type QRConfig = {
	/** the data to encode in QR, typically an URL */
	data: string;
	/**
	 * the quite zone along the edges of QR
	 */
	margin?: number;
	/**
	 * determine what shape to render the elements
	 *
	 * - `square` (default): each module or anchor is a sharp-edged square
	 * - `circle`: each module is a circle, each anchor is a round-edged square
	 */
	shape?: 'square' | 'circle';
	/**
	 * logo to render in the middle of QR
	 */
	logo?: string;
	/** width : height */
	logoRatio?: number;

	/* styling */
	/** fill for each module */
	moduleFill?: string;
	/** fill for the outer ring of each anchor (big positioning square at the corners) */
	anchorOuterFill?: string;
	/** fill for the inner square of each anchor */
	anchorInnerFill?: string;
	/**
	 * Type number (1 ~ 40), or 0 for auto detection,
	 * passed as option to {@link https://github.com/Rich-Harris/headless-qr | headless-qr},
	 * default to 0,
	 */
	version?: QRCodeOptions['version'];
	/**
	 * Error correction level, one of {'L', 'M', 'Q', 'H'},
	 * passed as option to {@link https://github.com/Rich-Harris/headless-qr | headless-qr},
	 * default to M,
	 */
	correction?: QRCodeOptions['correction'];

	/**
	 * @deprecated use `version` instead
	 */
	typeNumber?: QRCodeOptions['version'];
	/**
	 * @deprecated use `correction` instead
	 */
	errorCorrectionLevel?: QRCodeOptions['correction'];
};

export type QRSVGParts = {
	attributes: {
		viewBox: string;
		xmlns: string;
		version: string;
	};
	anchors: string;
	modules: string;
	logo: string;
};

export type CreateQrPngDataUrlConfig = QRConfig &
	SizeAttributes & {
		backgroundFill?: string;
	};
