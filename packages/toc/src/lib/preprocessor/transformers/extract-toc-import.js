import { walk } from 'zimmerframe';

import { nodeWithPosition } from '../utils/index.js';

/** @import { Node } from 'estree' */
/** @import { MagicString } from 'magic-string' */
/** @import { AST } from 'svelte/compiler' */
/** @import { Position } from '../types.private' */

/**
 * @typedef ExtractTocImportInput
 * @property {MagicString} s
 * @property {AST.Root} ast
 * @property {string} importSource
 */

/**
 * @param {ExtractTocImportInput} input
 * @returns {string[]}
 */
export function extractTocImport(input) {
	const { s, ast, importSource } = input;

	/** @type {string[]} */
	const names = [];

	for (const script of [ast.module, ast.instance]) {
		if (!script) continue;
		walk(/** @type {Node & Position}  */ (/** @type {unknown} */ (script)), null, {
			ImportDeclaration(node, { next }) {
				if (node.source.value !== importSource) return next();
				/** @type {Position[]} */
				let removals = [];
				for (let i = 0; i < node.specifiers.length; i++) {
					const specifier = node.specifiers[i];

					if (specifier.type !== 'ImportSpecifier') continue;

					const { imported, local } = specifier;
					if (
						(imported.type === 'Identifier' && imported.name !== 'compileToc') ||
						(imported.type === 'Literal' && imported.value !== 'compileToc')
					)
						continue;
					if (script.context === 'module') {
						names.push(local.name);
					}

					const { start, end } = nodeWithPosition(specifier);
					removals.push({ start, end: i < node.specifiers.length - 1 ? end + 1 : end });
				}
				if (removals.length === node.specifiers.length) {
					s.remove(node.start, node.end);
				} else {
					for (const { start, end } of removals) {
						s.remove(start, end);
					}
				}
			},
		});
	}

	return names;
}
