/* eslint-disable no-undef */
import { cubicOut } from 'svelte/easing';
import { tweened } from 'svelte/motion';

import { resolveDirection, resolveThreshold } from './internals.js';

/**
 * @param {Element} node
 * @param {import('./types.public').SwipeableParameter} [param]
 * @returns {import('./types.public').SwipeableActionReturn}
 */
export function swipeable(node, param) {
	const tNode = /** @type {HTMLElement} */ (node);

	const config = /** @type {import('./types.private.js').ResolvedConfig} */ ({
		direction: ['left', 'right'],
		threshold: '30%',
		customPropertyPrefix: '--swipe',
		followThrough: {
			enabled: true,
			easing: cubicOut,
			duration: 400,
		},
		allowFlick: (ms, px) => ms < 170 && Math.abs(px / ms) > 1,
		enabled: true,
		disableTouchEvents: true,
	});

	let threshold = { x: 0, y: 0 };
	/** @type {import('./types.private.js').PointerCoordinate | null} */
	let startCoordinate = null;
	/** @type {number | null} */
	let startTimestamp = null;
	/** @type {import('./types.public').SwipeSingleDirection | null} */
	let direction = null;
	/** @type {'x' | 'y' | null} */
	let axis = null;
	/** @type {import('./types.private.js').PointerCoordinate} */
	let distance = $state({ x: 0, y: 0 });

	function reset() {
		axis = null;
		direction = null;
		startCoordinate = null;
		startTimestamp = null;
		// unregister event listeners
		tNode.removeEventListener('pointermove', onPointerMove);
		tNode.removeEventListener('pointerup', onPointerUp);
	}

	function resolveConfig() {
		if (param) {
			if (typeof param === 'string' || Array.isArray(param)) {
				config.direction = resolveDirection(param);
			} else {
				config.direction = resolveDirection(param.direction);
				if (param.threshold) config.threshold = param.threshold;
				if (param.customPropertyPrefix !== undefined)
					config.customPropertyPrefix = param.customPropertyPrefix;
				if (param.enabled !== undefined) config.enabled = param.enabled;
				if (param.allowFlick !== undefined) {
					if (typeof param.allowFlick === 'function') config.allowFlick = param.allowFlick;
					else if (!param.allowFlick) config.allowFlick = () => false;
				}
				if (param.followThrough !== undefined) {
					if (typeof param.followThrough === 'object') {
						if (param.followThrough.easing)
							config.followThrough.easing = param.followThrough.easing;
						if (param.followThrough.duration)
							config.followThrough.duration = param.followThrough.duration;
					} else {
						config.followThrough.enabled = param.followThrough;
					}
				}
				if (param.disableTouchEvents !== undefined) {
					config.disableTouchEvents = param.disableTouchEvents;
				}
			}
		}
		threshold = resolveThreshold(tNode, config.threshold);
	}

	function onResize() {
		threshold = resolveThreshold(tNode, config.threshold);
	}

	$effect.root(() => {
		$effect(() => {
			if (!config.customPropertyPrefix) return;
			tNode.style.setProperty(`${config.customPropertyPrefix}-distance-x`, `${distance.x}px`);
		});
		$effect(() => {
			if (!config.customPropertyPrefix) return;
			tNode.style.setProperty(`${config.customPropertyPrefix}-distance-y`, `${distance.y}px`);
		});
	});

	/**
	 * @param {PointerEvent} e
	 */
	function onPointerDown(e) {
		if (!config.enabled) return;
		reset();
		const target = /** @type {HTMLElement} */ (e.target);
		target.setPointerCapture(e.pointerId);
		startCoordinate = { x: e.clientX, y: e.clientY };
		startTimestamp = e.timeStamp;

		// register event listeners
		tNode.addEventListener('pointermove', onPointerMove);
		tNode.addEventListener('pointerup', onPointerUp);
	}

	/**
	 * @param {PointerEvent} e
	 */
	function onPointerMove(e) {
		if (!startCoordinate) return;
		const newDistance = {
			x: e.clientX - startCoordinate.x,
			y: e.clientY - startCoordinate.y,
		};

		if (!axis) {
			const allowX = config.direction.includes('left') || config.direction.includes('right');
			const allowY = config.direction.includes('up') || config.direction.includes('down');

			if (allowX && allowY) {
				axis = Math.abs(newDistance.x) >= Math.abs(newDistance.y) ? 'x' : 'y';
			} else if (allowX) {
				axis = 'x';
			} else if (allowY) {
				axis = 'y';
			}
		}
		if (!axis) return;

		const newDirection =
			axis === 'x'
				? newDistance[axis] > 0
					? 'right'
					: 'left'
				: newDistance[axis] > 0
					? 'down'
					: 'up';

		const shouldFire = !direction || Math.sign(distance[axis]) !== Math.sign(newDistance[axis]);

		if (config.direction.includes(newDirection)) {
			direction = newDirection;
		}
		if (!direction) return;

		distance[axis] = newDistance[axis];

		if (shouldFire) {
			const detail = /** @satisfies {import('./types.public').SwipeStartEventDetail} */ ({
				direction,
				distance: distance[axis],
			});
			tNode.dispatchEvent(new CustomEvent('swipestart', { detail }));
		}
	}

	/**
	 * @param {PointerEvent} e
	 */
	async function onPointerUp(e) {
		if (!direction || !startTimestamp) {
			reset();
			return;
		}

		const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
		const flick = config.allowFlick(e.timeStamp - startTimestamp, distance[axis]);
		const passThreshold = flick || Math.abs(distance[axis]) >= threshold[axis];
		const detail = /** @satisfies {import('./types.public').SwipeEndEventDetail} */ ({
			direction,
			distance: distance[axis],
			passThreshold,
		});

		/** @type {number | null}*/
		let to = null;
		let duration = config.followThrough.duration;
		let easing = config.followThrough.easing;

		if (passThreshold) {
			if (config.followThrough.enabled) {
				const max = axis === 'x' ? tNode.clientWidth : tNode.clientHeight;
				to = distance[axis] > 0 ? max : -max;
				if (flick) {
					const distanceToMax = Math.abs(max - Math.abs(distance[axis]));
					const speed = Math.abs(distance[axis]) / (e.timeStamp - startTimestamp);
					duration = Math.min(distanceToMax / speed, duration);
				}
			}
		} else {
			duration = 200;
			to = 0;
		}

		if (to !== null) {
			const tween = tweened(distance[axis], { duration, easing });
			const unsub = tween.subscribe((v) => {
				distance[axis] = v;
			});
			await tween.set(to);
			tNode.dispatchEvent(new CustomEvent('swipeend', { detail }));
			unsub();
		} else {
			tNode.dispatchEvent(new CustomEvent('swipeend', { detail }));
		}

		reset();
	}

	function addStyles() {
		/** @type {HTMLElement}*/ (node).style.touchAction = 'none';
	}

	function removeStyles() {
		/** @type {HTMLElement}*/ (node).style.removeProperty('touch-action');
	}

	tNode.addEventListener('resize', onResize);
	tNode.addEventListener('pointerdown', onPointerDown);
	resolveConfig();
	if (config.enabled && config.disableTouchEvents) addStyles();

	return {
		update(newParam) {
			param = newParam;
			resolveConfig();
			if (config.enabled && config.disableTouchEvents) addStyles();
		},
		destroy() {
			tNode.removeEventListener('resize', onResize);
			tNode.removeEventListener('pointerdown', onPointerDown);
			if (config.disableTouchEvents) removeStyles();
		},
	};
}
