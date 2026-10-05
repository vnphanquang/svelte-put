import { walk } from 'zimmerframe';

/** @import { AST } from 'svelte/compiler' */
/** @import { Identifier, Literal } from 'estree' */

/**
 * @param {AST.RegularElement} element
 * @returns {string}
 */
export function getElementTextContent(element) {
	/** @type {string[]} */
	const chunks = [];
	walk(
		/** @type {Identifier | Literal | AST.Text} */ (/** @type {unknown} */ (element.fragment)),
		null,
		{
			Identifier(node) {
				const chunk = node.name.trim();
				if (chunk) chunks.push(chunk);
			},
			Literal(node) {
				const chunk = node.raw?.trim() ?? node.value?.toString() ?? '';
				if (chunk) chunks.push(chunk);
			},
			Text(node) {
				const chunk = node.raw.trim();
				if (chunk) chunks.push(chunk);
			},
		},
	);
	return decodeNumericEntities(chunks.join(' '));
}

/**
 * @param {string} str
 * @returns {string} str
 */
function decodeNumericEntities(str) {
	return str
		.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
		.replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}
