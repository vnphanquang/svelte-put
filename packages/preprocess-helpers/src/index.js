/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @typedef {import('estree').BaseNode} BaseNode
 */

/**
 * @internal
 * @typedef {BaseNode & {
 *  name: string;
 *  start: number;
 *  end: number;
 *  attributes: Array<{ name: string; type: string; value?: any[]; start: number; end: number }>;
 *  children?: Array<Node>;
 *  data?: any;
 * }} Node
 */

/**
 * @param {string} source
 * @param {Node} node
 * @param {string} attributeName
 * @returns {string | undefined}
 */
export function getAttribute(source, node, attributeName) {
	const attr = node.attributes.find(
		(attr) => attr.name === attributeName && attr.type === 'Attribute',
	);
	if (attr) {
		let raw = source.slice(attr.start + attributeName.length + 1, attr.end);
		if (raw.startsWith('"') && raw.endsWith('"')) {
			raw = raw.slice(1, -1);
		}
		return raw;
	}
}

/**
 * @param {string} source
 * @param {Node} node
 * @returns {Record<string, string>}
 */
export function getAttributes(source, node) {
	return node.attributes.reduce((acc, attr) => {
		if (attr.type === 'Attribute') {
			let raw = source.slice(attr.start + attr.name.length + 1, attr.end);
			if (raw.startsWith('"') && raw.endsWith('"')) {
				raw = raw.slice(1, -1);
			}
			acc[attr.name] = raw;
		}
		return acc;
	}, /** @type {Record<string, string>} */ ({}));
}
