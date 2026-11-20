export const ANCHOR_SIZE = 7;
export const DEFAULT_PNG_FILLS = {
	moduleFill: 'black',
	anchorOuterFill: 'black',
	anchorInnerFill: 'black',
};

/**
 * @package
 * @param {import('./types.public').QRConfig} config
 * @returns {Required<Omit<import('./types.public').QRConfig, 'logo' | 'errorCorrectionLevel' | 'typeNumber'>> & { logo?: string }}
 */
export function resolveConfig(config) {
	return /** @satisfies {import('./types.public').QRConfig} */ ({
		...config,
		margin: config.margin ?? 1,
		shape: config.shape ?? /** @type {const} */ ('square'),
		logoRatio: config.logoRatio ?? 1,
		moduleFill: config.moduleFill ?? 'currentcolor',
		anchorOuterFill: config.anchorOuterFill ?? 'currentcolor',
		anchorInnerFill: config.anchorInnerFill ?? 'currentcolor',
		version: config.version ?? config.typeNumber ?? 0,
		correction: config.correction ?? config.errorCorrectionLevel ?? 'H',
	});
}

/**
 * @package
 * @param {number} col
 * @param {number} row
 * @param {number} count
 * @returns {boolean}
 */
export function isLogo(col, row, count) {
	const center = count / 2;
	const maskXToYRatio = 1;

	const safelyRemovableHalf = Math.floor((count * Math.sqrt(0.1)) / 2);
	const safelyRemovableHalfX = safelyRemovableHalf * maskXToYRatio;
	const safelyRemovableHalfY = safelyRemovableHalf / maskXToYRatio;
	const safelyRemovableStartX = center - safelyRemovableHalfX;
	const safelyRemovableEndX = center + safelyRemovableHalfX;
	const safelyRemovableStartY = center - safelyRemovableHalfY;
	const safelyRemovableEndY = center + safelyRemovableHalfY;

	return (
		row >= safelyRemovableStartY &&
		row <= safelyRemovableEndY &&
		col >= safelyRemovableStartX &&
		col <= safelyRemovableEndX
	);
}

/**
 * @package
 * @param {number} logoSize
 * @param {number} logoRatio
 * @returns {import('./types.private').SizeAttributes}
 */
function calculateLogoSize(logoSize, logoRatio) {
	if (logoRatio >= 1) {
		return {
			width: logoSize,
			height: logoSize / logoRatio,
		};
	}
	return {
		width: logoSize * logoRatio,
		height: logoSize,
	};
}

/**
 * compute the logo rectangle in SVG viewBox units. Shared by the SVG renderer
 * and the PNG renderer so both place the logo at exactly the same spot.
 * @package
 * @param {number} count
 * @param {number} size
 * @param {number} logoRatio
 * @returns {import('./types.private').SizeAttributes & { x: number, y: number }}
 */
export function calculateLogoPlacement(count, size, logoRatio) {
	const safelyRemovableSize = Math.floor(count * Math.sqrt(0.1));
	const { width, height } = calculateLogoSize(safelyRemovableSize * 0.8, logoRatio);
	return {
		width,
		height,
		x: (size - width + 1) / 2,
		y: (size - height + 1) / 2,
	};
}

/**
 * @package
 * @param {number} col
 * @param {number} row
 * @param {number} count
 * @returns {boolean}
 */
export function isAnchor(col, row, count) {
	if (row <= ANCHOR_SIZE) return col <= ANCHOR_SIZE || col >= count - ANCHOR_SIZE;
	if (col <= ANCHOR_SIZE) return row >= count - ANCHOR_SIZE;
	return false;
}
