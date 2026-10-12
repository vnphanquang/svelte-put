import { walk } from 'zimmerframe';

import { nodeWithPosition } from './utils/node-with-position.js';

/** @import { MagicString } from 'magic-string' */
/** @import { AST } from 'svelte/compiler' */
/** @import { Node, CallExpression } from 'estree' */

/** @import { TocItem } from '../../../engine' */
/** @import { Position } from './types.private' */
/** @import { ResolvedCompileToc } from './types.public' */

/**
 * @typedef PreprocessCompileTocInput
 * @property {string | undefined} filename
 * @property {MagicString} s
 * @property {AST.Root} ast
 * @property {TocItem[]} items
 * @property {ResolvedCompileToc} options
 */

/**
 * @param {PreprocessCompileTocInput} input
 * @returns {void}
 */
export function preprocessCompileToc(input) {
	const { filename, s, ast, items, options } = input;

	// ================================
	// INTERNAL HELPERS
	// ================================

	/** @returns {string[]} */
	function extract() {
		/** @type {string[]} */
		const names = [];

		for (const script of [ast.module, ast.instance]) {
			if (!script) continue;
			walk(/** @type {Node & Position}  */ (/** @type {unknown} */ (script)), null, {
				ImportDeclaration(node, { next }) {
					if (node.source.value !== options.importSource) return next();
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

	/**
	 * @param {string[]} names
	 * @returns {string}
	 */
	function populate(names) {
		const entries = JSON.stringify(items.map((i) => [i.id, i]));
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

	/**
	 * @param {string} expression
	 */
	function declare(expression) {
		const declaration = `export const ${options.autoDeclare.identifier} = ${expression}`;
		if (ast.module) {
			s.appendLeft(nodeWithPosition(ast.module.content).end, declaration);
		} else {
			s.prepend(`<script module>\n\t${declaration}\n</script>`);
		}
	}

	// ================================
	// ACTUAL MAIN FLOW
	// ================================
	const names = extract();
	const expression = populate(names);
	if (options.autoDeclare.enabled(filename)) {
		declare(expression);
	}
}

export * from './types.public.js';
