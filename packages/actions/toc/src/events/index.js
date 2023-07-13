/**
 * all relevant event name literals
 * @internal
 */
const EVENTS = {
  init: 'tocinit',
  change: 'tocchange',
};

/**
 * @internal
 * @param {HTMLElement} node
 * @param {import('./events').TocChangeEventDetails} detail
 * @returns {import('./events').TocChangeEventDetails}
 */
export function dispatchChange(node, detail) {
  node.dispatchEvent(new CustomEvent(EVENTS.change, { detail }));
  return detail;
}

/**
 * @internal
 * @param {HTMLElement} node
 * @param {import('./events').TocInitEventDetails} detail
 * @returns {import('./events').TocInitEventDetails}
 */
export function dispatchInit(node, detail) {
  node.dispatchEvent(new CustomEvent(EVENTS.init, { detail }));
  return detail;
}
