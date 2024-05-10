/**
 * all relevant event name literals
 * @package
 */
const EVENTS = {
	init: 'tocinit',
	change: 'tocchange',
};

/**
 * @package
 * @param {HTMLElement} node
 * @param {import('./events').TocChangeEventDetail} detail
 * @returns {import('./events').TocChangeEventDetail}
 */
export function dispatchChange(node, detail) {
	node.dispatchEvent(new CustomEvent(EVENTS.change, { detail }));
	return detail;
}

/**
 * @package
 * @param {HTMLElement} node
 * @param {import('./events').TocInitEventDetail} detail
 * @returns {import('./events').TocInitEventDetail}
 */
export function dispatchInit(node, detail) {
	node.dispatchEvent(new CustomEvent(EVENTS.init, { detail }));
	return detail;
}

/**
 * Deprecated, use `TocInitEventDetail` instead
 * @typedef {import('./events').TocInitEventDetail} TocInitEventDetails
 */

/**
 * Deprecated, use `TocChangeEventDetail` instead
 * @typedef {import('./events').TocChangeEventDetail} TocChangeEventDetails
 */

/**
 * Deprecated, use `TocEventDetail` instead
 * @typedef {import('./events').TocEventDetail} TocEventDetails
 */
