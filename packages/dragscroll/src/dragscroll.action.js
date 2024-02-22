/**
 * @internal
 * @param {import('./public').DragScrollParameter} param
 */
export function resolveConfig(param = {}) {
	const { cursor = true, enabled = true, axis = 'x', event = 'pointer' } = param;
	return {
		enabled,
		axes: {
			x: axis === 'x' || axis === 'both',
			y: axis === 'y' || axis === 'both',
		},
		events: {
			down:
				event === 'pointer'
					? /** @type {const} */ ('pointerdown')
					: /** @type {const} */ ('mousedown'),
			up:
				event === 'pointer' ? /** @type {const} */ ('pointerup') : /** @type {const} */ ('mouseup'),
			move:
				event === 'pointer'
					? /** @type {const} */ ('pointermove')
					: /** @type {const} */ ('mousemove'),
			leave:
				event === 'pointer'
					? /** @type {const} */ ('pointerleave')
					: /** @type {const} */ ('mouseleave'),
		},
		cursor,
	};
}

/**
 * svelte action `use:dragscroll` for adding 'drag-to-scroll' behavior
 * @public
 *
 * @param {HTMLElement} node - node to apply the action
 * @param {import('./public').DragScrollParameter} param - instructions for customizing action behavior
 * @returns {import('./public').DragScrollActionReturn}
 */
export function dragscroll(node, param = {}) {
	let isDown = false;
	/** @type {number} */
	let startX;
	/** @type {number} */
	let startY;
	/** @type {number} */
	let scrollLeft;
	/** @type {number} */
	let scrollTop;
	let { enabled, axes, events, cursor } = resolveConfig(param);

	/**
	 * @param {PointerEvent | MouseEvent} e
	 */
	function handlePointerDown(e) {
		changeCursor(true);
		isDown = true;
		startX = e.pageX - node.offsetLeft;
		scrollLeft = node.scrollLeft;
		startY = e.pageY - node.offsetTop;
		scrollTop = node.scrollTop;
	}

	function handlePointerUpAndLeave() {
		changeCursor();
		isDown = false;
	}

	/**
	 * @param {PointerEvent | MouseEvent} e
	 */
	function handlePointerMove(e) {
		if (!isDown) return;
		e.preventDefault();
		if (axes.x) {
			const x = e.pageX - node.offsetLeft;
			const walkX = x - startX;
			node.scrollLeft = scrollLeft - walkX;
		}
		if (axes.y) {
			const y = e.pageY - node.offsetTop;
			const walkY = y - startY;
			node.scrollTop = scrollTop - walkY;
		}
	}

	function addEvents() {
		if (!node) return;
		node.addEventListener(events.down, handlePointerDown);
		node.addEventListener(events.leave, handlePointerUpAndLeave);
		node.addEventListener(events.up, handlePointerUpAndLeave);
		node.addEventListener(events.move, handlePointerMove);
	}

	function removeEvents() {
		if (!node) return;
		node.removeEventListener(events.down, handlePointerDown);
		node.removeEventListener(events.leave, handlePointerUpAndLeave);
		node.removeEventListener(events.up, handlePointerUpAndLeave);
		node.removeEventListener(events.move, handlePointerMove);
	}

	function changeCursor(active = false) {
		if (!node) return;
		if (cursor) {
			node.style.cursor = active ? 'grabbing' : 'grab';
		} else {
			node.style.removeProperty('cursor');
		}
	}

	if (enabled) {
		changeCursor();
		addEvents();
	}

	return {
		update(update = {}) {
			removeEvents();
			({ enabled, axes, events, cursor } = resolveConfig(update));
			changeCursor();
			addEvents();
		},
		destroy() {
			removeEvents();
		},
	};
}

/**
 * Deprecated, use `DragScrollParameter` and `DragScrollConfig` instead
 * @typedef {import('./public').DragScrollConfig} DragScrollParameters
 */
