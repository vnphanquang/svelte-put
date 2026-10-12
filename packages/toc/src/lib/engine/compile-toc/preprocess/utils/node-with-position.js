/** @import { Position } from '../types.private' */
/** @import { Node } from 'estree' */

/**
 * @template {Node} N
 * @param {N} node
 * @returns {N & Position}
 */
export function nodeWithPosition(node) {
	return /** @type {N & Position} */ (/** @type {unknown} */ (node));
}
