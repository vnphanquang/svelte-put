/**
 * @param {Element} node
 * @param {import('./types.public').SwipeThreshold} [param]
 * @returns {{ x: number; y: number }}
 */
export function resolveThreshold(node, param = '20%') {
	const value = parseFloat(param);

	if (param.endsWith('%')) {
		return {
			x: node.clientWidth * value / 100,
			y: node.clientHeight * value / 100,
		};
	}

	if (param.endsWith('rem')) {
		const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
		return {
			x: fontSize * value,
			y: fontSize * value,
		};
	}

	return { x: value, y: value, };
}

/**
 * @param {import('./types.public').SwipeableConfig['direction']} param
 * @returns {import('./types.public').SwipeSingleDirection[]}
 */
export function resolveDirection(param) {
	if (!param) return ['up', 'down', 'left', 'right'];

	if (typeof param === 'string') {
		if (param === 'x') {
			return ['left', 'right'];
		} else if (param === 'y') {
			return ['up', 'down'];
		} else if (param === 'all') {
			return ['up', 'down', 'left', 'right'];
		} else {
			return [param];
		}
	}

	/** @type {Set<import('./types.public').SwipeSingleDirection>} */
	const set = new Set();
	for (const d of param) {
		if (d === 'x') {
			set.add('left');
			set.add('right');
		} else if (d === 'y') {
			set.add('up');
			set.add('down');
		} else if (d === 'all') {
			set.add('up');
			set.add('down');
			set.add('left');
			set.add('right');
		} else {
			set.add(d);
		}
	}
	return Array.from(set);
}

