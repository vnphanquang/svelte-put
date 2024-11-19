import { qr as createQr } from 'headless-qr';

import {
	isLogo,
	isAnchor,
	calculateLogoSize,
	resolveConfig,
	DEFAULT_PNG_FILLS,
	ANCHOR_SIZE,
} from './internals.js';

/**
 * create SVG parts that make up a QR. You should typically use {@link createQrSvgString} instead
 * @param {import('./types.public').QRConfig} config
 * @param {import('./types.public').QRCode} [qr]
 * @returns {import('./types.public').QRSVGParts}
 */
export function createQrSvgParts(config, qr) {
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
		typeNumber,
		errorCorrectionLevel,
	} = resolveConfig(config);
	if (!qr) {
		qr = createQr(data, {
			version: version || typeNumber,
			correction: correction || errorCorrectionLevel,
		});
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
	let modulesSvg = '';
	for (let col = 0; col < count; col++) {
		for (let row = 0; row < count; row++) {
			if (!qr[row][col] || isAnchor(col, row, count) || (logo && isLogo(col, row, count))) continue;
			const x = col + margin;
			const y = row + margin;
			modulesSvg += `<rect class="module" fill="${moduleFill}" data-column="${col}" data-row="${row}" x="${x}" y="${y}" width="1" height="1" ${
				shape === 'circle' ? 'rx="0.5"' : ''
			} />`;
		}
	}
	modulesSvg = `<g class="modules">${modulesSvg}</g>`;

	/** ---- LOGO ---- */
	let logoSvg = '';
	if (logo) {
		const safelyRemovableSize = Math.floor(count * Math.sqrt(0.1));
		const { width, height } = calculateLogoSize(safelyRemovableSize * 0.8, logoRatio);
		const x = (size - width + 1) / 2;
		const y = (size - height + 1) / 2;
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
 * create QR as an SVG string
 * @param {import('./types.public').QRConfig & Partial<import('./types.private').SizeAttributes>} config
 * @returns {string}
 */
export function createQrSvgString(config) {
	const { anchors, attributes, logo, modules } = createQrSvgParts(config);
	/** @type {typeof attributes & Partial<import('./types.private').SizeAttributes>} */
	const rAttributes = { ...attributes };
	if (config.width) rAttributes.width = config.width;
	if (config.height) rAttributes.height = config.height;
	return `<svg ${Object.entries(rAttributes)
		.map(([name, value]) => `${name}="${value}"`)
		.join(' ')}>${anchors} ${modules} ${logo}</svg>`;
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
	const base64 = createQrSvgDataUrl(rConfig);

	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');
	if (!ctx) {
		throw new Error('Cannot get 2d context from canvas');
	}
	/** @type {(value: string) => void} */
	let _resolve;
	/** @type {Promise<string>} */
	const promise = new Promise((resolve) => {
		_resolve = resolve;
	});

	const img = new Image(width, height);
	img.addEventListener('load', () => {
		// background
		if (rConfig.backgroundFill) ctx.fillStyle = rConfig.backgroundFill;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// draw QR
		ctx.drawImage(img, 0, 0);

		const pngDataUrl = canvas.toDataURL('image/png');
		img.remove();
		_resolve(pngDataUrl);
	});
	img.src = base64;

	return promise;
}

export * from './types.public.js';
