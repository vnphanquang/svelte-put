/** @import { MagicString } from 'magic-string' */
/** @import { AST } from 'svelte/compiler' */

/**
 * @param {MagicString} s
 * @param {AST.RegularElement} element
 * @param {string} name - the target attribute name
 * @returns {string | null}
 */
export function getElementId(s, element, name) {
	const attribute = /** @type {AST.Attribute | undefined} */ (
		element.attributes.find((attr) => attr.type === 'Attribute' && attr.name === name)
	);
	if (!attribute) return null;
	let id = s.slice(attribute.start + name.length + 1, attribute.end);
	if (id.startsWith('"') && id.endsWith('"')) {
		id = id.slice(1, -1);
	}
	return id;
}
