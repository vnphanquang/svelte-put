import { walk } from 'zimmerframe';

import { nodeWithPosition } from '../utils/index.js';

/** @import { CallExpression } from 'estree' */
/** @import { MagicString } from 'magic-string' */
/** @import { AST } from 'svelte/compiler' */
/** @import { CompileTimeTocItem } from '../../types.public' */

/**
 * @typedef PopulateTocInput
 * @property {MagicString} s
 * @property {AST.Root} ast
 * @property {string[]} names
 * @property {CompileTimeTocItem[]} toc
 */

/**
 * @param {PopulateTocInput} input
 * @returns {string}
 */
export function populateToc(input) {
	const { ast, names, s, toc } = input;
	const entries = JSON.stringify(toc.map((i) => [i.id, i]));
	const expression = `({ items: new Map(${entries}) })`;

	if (!names.length) return expression;

	// second walk: find all invocations
	walk(/** @type {CallExpression} */ (/** @type {unknown} */ (ast)), null, {
		CallExpression(node, { next }) {
			if (node.callee.type !== 'Identifier' || !names.includes(node.callee.name)) return next();
			const { start, end } = nodeWithPosition(node);
			s.update(start, end, expression);
		},
	});

	return expression;
}
