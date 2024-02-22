/**
 * @internal
 * @typedef {{ width: number; height: number }} Dimension
 * @typedef {{ width: number } | { height: number }} DimensionConstraint
 */

/**
 * @internal
 * @param {string} dimension
 * @returns
 */
export function extractDimensionNumberAndUnit(dimension) {
	const regex = /(\d+)(\D*)/;
	const [, number = '0', unit = ''] = dimension.match(regex) || [];
	return { number: parseInt(number, 10), unit };
}

/**
 * @internal
 * @param {Dimension} base
 * @param {DimensionConstraint} constraint
 * @returns {Dimension}
 */
export function calculateNewDimensions(base, constraint) {
	const { width, height } = base;
	if ('width' in constraint) {
		const { width: constraintWidth } = constraint;
		return {
			width: constraintWidth,
			height: (constraintWidth / width) * height,
		};
	}
	const { height: constraintHeight } = constraint;
	return {
		width: (constraintHeight / height) * width,
		height: constraintHeight,
	};
}

/**
 * @internal
 * @param {SVGElement} local
 * @param {HTMLElement} remote
 * @returns {{ width: string, height: string }}
 */
export function calculateDimensions(local, remote) {
	const lWidthStr = local.getAttribute('width');
	const lHeightStr = local.getAttribute('height');
	if (lWidthStr && lHeightStr) {
		return { width: lWidthStr, height: lHeightStr };
	}
	const lDimension = { width: lWidthStr || '', height: lHeightStr || '' };

	const rWidthStr = remote.getAttribute('width');
	const rHeightStr = remote.getAttribute('height');
	const rViewBox = remote.getAttribute('viewBox');

	if (!((rWidthStr && rHeightStr) || rViewBox)) {
		return lDimension;
	}

	let rWidth = 0;
	let rHeight = 0;
	let rWidthUnit = '';
	let rHeightUnit = '';
	if (rWidthStr && rHeightStr) {
		({ number: rWidth, unit: rWidthUnit } = extractDimensionNumberAndUnit(rWidthStr));
		({ number: rHeight, unit: rHeightUnit } = extractDimensionNumberAndUnit(rHeightStr));
	} else if (rViewBox) {
		[, , rWidth, rHeight] = rViewBox.split(' ').map((s) => parseInt(s, 10));
	}

	if (rWidthUnit !== rHeightUnit) {
		return {
			width: lWidthStr || rWidthStr || '',
			height: lHeightStr || rHeightStr || '',
		};
	}

	if (lWidthStr) {
		const { number, unit } = extractDimensionNumberAndUnit(lWidthStr);
		const cDimension = calculateNewDimensions(
			{ width: rWidth, height: rHeight },
			{ width: number },
		);
		const cUnit = unit || rWidthUnit;
		return {
			width: cDimension.width.toFixed(2) + cUnit,
			height: cDimension.height.toFixed(2) + cUnit,
		};
	}
	if (lHeightStr) {
		const { number, unit } = extractDimensionNumberAndUnit(lHeightStr);
		const cDimension = calculateNewDimensions(
			{ width: rWidth, height: rHeight },
			{ height: number },
		);
		const cUnit = unit || rHeightUnit;
		return {
			width: cDimension.width.toFixed(2) + cUnit,
			height: cDimension.height.toFixed(2) + cUnit,
		};
	}
	return {
		width: rWidth + rWidthUnit,
		height: rHeight + rHeightUnit,
	};
}
