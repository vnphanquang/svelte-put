import { walk } from 'zimmerframe';

import { nodeWithPosition } from '../utils/index.js';

/** @import { CallExpression } from 'estree' */
/** @import { MagicString } from 'magic-string' */
/** @import { AST } from 'svelte/compiler' */
/** @import { CompileTimeToc } from '../../types.public' */

/**
 * @typedef PopulateTocInput
 * @property {MagicString} s
 * @property {AST.Root} ast
 * @property {string[]} names
 * @property {CompileTimeToc} toc
 */

/**
 * @param {PopulateTocInput} input
 * @returns {void}
 */
export function populateToc(input) {
	const { ast, names, s, toc } = input;
	if (!names.length) return;

	const json = JSON.stringify(toc);

	// second walk: find all invocations
	walk(/** @type {CallExpression} */ (/** @type {unknown} */ (ast)), null, {
		CallExpression(node, { next }) {
			if (node.callee.type !== 'Identifier' || !names.includes(node.callee.name)) return next();
			const { start, end } = nodeWithPosition(node);
			s.update(start, end, json);
		},
	});
}
