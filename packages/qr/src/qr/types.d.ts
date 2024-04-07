import type { resolveConfig } from './index.js';
import QR from 'qrcode-generator';

export type QRCode = ReturnType<typeof import('qrcode-generator')>;

/**
 * instructions to render a QR
 * @public
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
	 * passed as parameter to {@link https://github.com/kazuhikoarase/qrcode-generator | qrcode-generator},
   * default to 0,
	 */
	typeNumber?: Parameters<typeof QR>[0];
	/**
	 * Error correction level ('L', 'M', 'Q', 'H'),
	 * passed as parameter to {@link https://github.com/kazuhikoarase/qrcode-generator | qrcode-generator},
   * default to H,
	 */
	errorCorrectionLevel?: Parameters<typeof QR>[1];
};

/**
 * @internal
 */
export type ResolvedQRConfig = ReturnType<typeof resolveConfig>;
