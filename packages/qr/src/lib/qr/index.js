import { qr as createQr } from 'headless-qr';

import {
	ANCHOR_SIZE,
	DEFAULT_PNG_FILLS,
	calculateLogoPlacement,
	isAnchor,
	isLogo,
	resolveConfig,
} from './internals.js';

/**
 * create SVG parts that make up a QR. You should typically use {@link createQrSvgString} instead
 * @param {import('./types.public').QRConfig} config
 * @param {import('./types.public').QRCode} [qr]
 * @param {{ includeLogoImage?: boolean }} [options] - set `includeLogoImage` to false to keep the logo's cutout while omitting the `<image>` element (used internally when drawing the logo directly onto a canvas)
 * @returns {import('./types.public').QRSVGParts}
 */
export function createQrSvgParts(config, qr, options = {}) {
	const {
		data,
		margin,
		shape,
		logo,
		logoRatio,
		anchorInnerFill,
		anchorOuterFill,
		moduleFill,
		version,
		correction,
	} = resolveConfig(config);

	if (!qr) {
		qr = createQr(data, { version, correction });
	}
	const count = qr.length;
	const size = count + margin * 2;

	/** ---- ANCHORS ---- */
	/** @type {[string, number, number][]} */
	const anchors = [
		['top-left', margin, margin],
		['top-right', count - ANCHOR_SIZE + margin, margin],
		['bottom-left', margin, count - ANCHOR_SIZE + margin],
	];

	let anchorsSvg = '';
	for (const [position, x, y] of anchors) {
		let outerD = `M${x} ${y} h7 v7 h-7 v-7z m1 1 v5 h5 v-5 h-5 z`;
		let innerD = `M${x + 2} ${y + 2} h3 v3 h-3 v-3 z`;
		if (shape !== 'square') {
			outerD = `M${
				x + 0.5
			} ${y}h6s0.5 0 .5 .5v6s0 .5-.5 .5h-6s-.5 0-.5-.5v-6s0-.5 .5-.5zm.75 1s-.25 0-.25 .25v4.5s0 .25 .25 .25h4.5s.25 0 .25-.25v-4.5s0-.25 -.25 -.25h-4.5z`;
			innerD = `M${x + 2.5} ${
				y + 2
			} h2 s.5 0 .5 .5 v2 s0 .5-.5 .5 h-2 s-.5 0-.5-.5 v-2 s0-.5 .5-.5 z`;
		}
		const outerPath = `<path class="anchor-outer" fill="${anchorOuterFill}" d="${outerD}" />`;
		const innerPath = `<path class="anchor-outer" fill="${anchorInnerFill}" d="${innerD}" />`;
		anchorsSvg += `<g class="anchor" data-position="${position}">${outerPath} ${innerPath}</g>`;
	}
	anchorsSvg = `<g class="anchors">${anchorsSvg}</g>`;

	/** ---- MODULES ---- */
	let modulesPath = '';
	for (let col = 0; col < count; col++) {
		for (let row = 0; row < count; row++) {
			if (!qr[row][col] || isAnchor(col, row, count) || (logo && isLogo(col, row, count))) continue;
			const x = col + margin;
			const y = row + margin;
			if (shape === 'circle') {
				modulesPath += `M${x + 0.5} ${y}a0.5 0.5 0 1 1 0 1a0.5 0.5 0 1 1 0 -1z`;
			} else {
				modulesPath += `M${x} ${y}h1v1h-1v-1z`;
			}
		}
	}
	let modulesSvg = `<path class="module" fill="${moduleFill}" d="${modulesPath}" />`;

	/** ---- LOGO ---- */
	let logoSvg = '';
	if (logo && options.includeLogoImage !== false) {
		const { width, height, x, y } = calculateLogoPlacement(count, size, logoRatio);
		logoSvg = `<image width="${width}" height="${height}" x="${x}" y="${y}" href="${logo}" class="logo" />`;
	}

	return {
		attributes: {
			viewBox: `0, 0 ${size} ${size}`,
			xmlns: 'http://www.w3.org/2000/svg',
			version: '1.1',
		},
		anchors: anchorsSvg,
		modules: modulesSvg,
		logo: logoSvg,
	};
}

/**
 * @param {import('./types.public').QRSVGParts} parts
 * @param {Partial<import('./types.private').SizeAttributes>} [sizeAttributes]
 * @returns {string}
 */
function stringifyQrSvg(parts, sizeAttributes = {}) {
	const { anchors, attributes, logo, modules } = parts;
	/** @type {typeof attributes & Partial<import('./types.private').SizeAttributes>} */
	const rAttributes = { ...attributes };
	if (sizeAttributes.width) rAttributes.width = sizeAttributes.width;
	if (sizeAttributes.height) rAttributes.height = sizeAttributes.height;
	return `<svg ${Object.entries(rAttributes)
		.map(([name, value]) => `${name}="${value}"`)
		.join(' ')}>${anchors} ${modules} ${logo}</svg>`;
}

/**
 * create QR as an SVG string
 * @param {import('./types.public').QRConfig & Partial<import('./types.private').SizeAttributes>} config
 * @returns {string}
 */
export function createQrSvgString(config) {
	return stringifyQrSvg(createQrSvgParts(config), config);
}

/**
 * create QR as a base64 data URL (image/svg+xml)
 * @param {import('./types.public').QRConfig & Partial<import('./types.private').SizeAttributes>} config
 * @returns {string}
 */
export function createQrSvgDataUrl(config) {
	const svg = createQrSvgString(config);
	const svg64 = btoa(svg);
	const b64start = `data:image/svg+xml;base64,`;
	const image64 = b64start + svg64;
	return image64;
}

/**
 * @param {string} src
 * @param {boolean} [crossOrigin] - request CORS mode so the canvas stays untainted
 * @returns {Promise<HTMLImageElement>}
 */
function loadImage(src, crossOrigin = false) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		if (crossOrigin) img.crossOrigin = 'anonymous';
		img.addEventListener('load', () => resolve(img), { once: true });
		img.addEventListener('error', () => reject(new Error(`Failed to load image: ${src}`)), {
			once: true,
		});
		img.src = src;
	});
}

/**
 * Cross-origin images loaded without CORS taint the canvas, which makes
 * `toDataURL()` throw. Data/blob URLs and same-origin URLs need no special handling.
 * @param {string} src
 * @returns {boolean}
 */
function isCrossOrigin(src) {
	if (src.startsWith('data:') || src.startsWith('blob:')) return false;
	try {
		return new URL(src, document.baseURI).origin !== document.location.origin;
	} catch {
		return false;
	}
}

/**
 * @param {import('./types.public.js').CreateQrPngDataUrlConfig} config
 * @returns {Promise<string>}
 */
export async function createQrPngDataUrl(config) {
	if (typeof document === 'undefined') {
		throw new Error('Cannot use createQrPngDataUrl in a non-browser environment');
	}

	const width = config.width || 1000;
	const height = config.height || 1000;

	/** @type {import('./types.public.js').CreateQrPngDataUrlConfig} */
	const rConfig = {
		...DEFAULT_PNG_FILLS,
		...config,
		width,
		height,
	};

	const resolvedConfig = resolveConfig(rConfig);
	// create the QR once and reuse it for both the SVG and the logo placement
	const qr = createQr(resolvedConfig.data, {
		version: resolvedConfig.version,
		correction: resolvedConfig.correction,
	});
	const parts = createQrSvgParts(rConfig, qr, { includeLogoImage: false });
	const svgDataUrl = `data:image/svg+xml;base64,${btoa(stringifyQrSvg(parts, rConfig))}`;

	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');
	if (!ctx) {
		throw new Error('Cannot get 2d context from canvas');
	}

	// start both loads before drawing; nothing is rasterized until every image
	// it depends on is ready. A cross-origin logo that refuses CORS is skipped,
	// so the QR is still exported instead of failing with a tainted canvas.
	const [qrImage, logoImage] = await Promise.all([
		loadImage(svgDataUrl),
		rConfig.logo
			? loadImage(rConfig.logo, isCrossOrigin(rConfig.logo)).catch(() => undefined)
			: Promise.resolve(undefined),
	]);

	// background
	if (rConfig.backgroundFill) ctx.fillStyle = rConfig.backgroundFill;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// draw QR (the logo area is left empty by createQrSvgParts)
	ctx.drawImage(qrImage, 0, 0, width, height);

	// draw the logo last, at the same position/size used by the SVG renderer
	if (logoImage) {
		const count = qr.length;
		const size = count + resolvedConfig.margin * 2;
		const {
			x,
			y,
			width: logoWidth,
			height: logoHeight,
		} = calculateLogoPlacement(count, size, resolvedConfig.logoRatio);
		// mirror the SVG's default `preserveAspectRatio="xMidYMid meet"` transform
		const scale = Math.min(width, height) / size;
		const offsetX = (width - size * scale) / 2;
		const offsetY = (height - size * scale) / 2;
		ctx.drawImage(
			logoImage,
			offsetX + x * scale,
			offsetY + y * scale,
			logoWidth * scale,
			logoHeight * scale,
		);
	}

	return canvas.toDataURL('image/png');
}

export * from './types.public.js';
