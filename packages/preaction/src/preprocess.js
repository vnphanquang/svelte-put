import MagicString from 'magic-string';
import { parse } from 'svelte/compiler';
import { walk } from 'zimmerframe';

const PACKAGE_NAME = '@svelte-put/preaction';

/**
 * @returns {import('svelte/compiler').PreprocessorGroup}
 */
export function preaction() {
	let count = 0;
	return {
		name: 'preprocess-action',
		markup({ content, filename }) {
			// skip early if source does not import `@svelte-put/preaction`
			if (!content.includes(PACKAGE_NAME)) return;

			const s = new MagicString(content);
			const ast = parse(content, { filename, modern: true });

			// find the name of the import specifier for `apply` from PACKAGE_NAME
			let applyActionName = '';
			for (const script of [ast.module, ast.instance]) {
				if (!script) continue;
				const str = s.slice(script.start, script.end);
				if (!str.includes(PACKAGE_NAME)) continue;
				walk(
					/** @type {import('estree').ImportDeclaration}  */ (/** @type {unknown} */ (script)),
					null,
					{
						ImportDeclaration(node, { next }) {
							if (node.source.value !== PACKAGE_NAME) return next();
							const applyAction = node.specifiers.find(
								(specifier) =>
									specifier.type === 'ImportSpecifier' &&
									specifier.imported.type === 'Identifier' &&
									specifier.imported.name === 'apply',
							);
							if (applyAction) applyActionName = applyAction.local.name;
						},
					},
				);
				break;
			}
			if (!applyActionName) return;

			/** @type {string[]} */
			const declarations = [];

			walk(
				/** @type {import('svelte/compiler').AST.RegularElement} */ (
					/** @type {unknown} */ (ast.fragment)
				),
				null,
				{
					RegularElement(node, { next }) {
						const uses = /** @type {import('svelte/compiler').AST.UseDirective[]} */ (
							node.attributes.filter(
								(attr) => attr.type === 'UseDirective' && attr.name === applyActionName,
							)
						);
						if (!uses.length) return next();

						const firstAttribute = node.attributes[0];

						for (const use of uses) {
							// 0 - generate unique name for preaction
							const name = `__preaction_${count++}`;

							if (!use.expression || use.expression.type !== 'CallExpression') continue;

							// 1 - add to declarations: const preaction_#count = preaction(param)
							const { start: expStart, end: expEnd } = /** @type {any} */ (use.expression);
							const expression = s.slice(expStart, expEnd);
							declarations.push(`const ${name} = ${expression}`);

							// 2 - transform use directive: use:preaction_#count.action={param}
							const arg = use.expression.arguments[0];
							const { start: argStart, end: argEnd } = /** @type {any} */ (arg);
							let argStr = arg ? `={${s.slice(argStart, argEnd)}}` : '';
							s.overwrite(use.start, use.end, `use:${name}.action${argStr}`);

							// 3 - add attribute spread to start of tag: {...preaction_#count.attributes}
							s.prependLeft(firstAttribute.start, `{...(${name}.attributes ?? {})} `);
						}

						return next();
					},
				},
			);

			// add declarations to  end of script tag
			const declarationsStr = '\n' + declarations.join('\n') + '\n';
			if (ast.instance) {
				s.prependLeft(/** @type {any} */ (ast.instance.content).end, declarationsStr);
			} else {
				s.append(`<script>${declarationsStr}</script>`);
			}

			return {
				code: s.toString(),
				map: s.generateMap(),
			};
		},
	};
}

export default preaction;
