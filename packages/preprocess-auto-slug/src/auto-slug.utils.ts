/* eslint-disable @typescript-eslint/no-explicit-any */
import { walk } from 'svelte/compiler';

/**
 * @package
 */
export function getIdAttribute(
	source: string,
	node: Node,
	attributeName: string,
): string | undefined {
	const attr = (node as any).attributes.find(
		(attr) => attr.name === attributeName && attr.type === 'Attribute',
	) as any;
	if (attr) {
		let raw = source.slice(attr.start + attributeName.length + 1, attr.end);
		if (raw.startsWith('"') && raw.endsWith('"')) {
			raw = raw.slice(1, -1);
		}
		return raw;
	}
}

/**
 * @package
 * @param {import(estree).Node} root
 */
export function getTextContent(root) {
	let text = '';
	walk(root, {
		enter(node) {
			// FIXME: correct typing
			const fNode = node as any;
			if (fNode.type === 'Text') text += fNode.data;
			if (fNode.type === 'MustacheTag') {
				// TODO potential improvement with MustachTag
				// sometimes this will capture unnecessary text
				// for example slot="foo" will capture "foo"
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				switch (fNode.expression.type) {
					case 'Identifier':
						text += fNode.expression.name;
						break;
					case 'MemberExpression': {
						const { object, property } = fNode.expression;
						text += `${object.name}-${property.name}`;
						break;
					}
					case 'CallExpression': {
						switch (fNode.expression.callee.type) {
							case 'MemberExpression': {
								const { object, property } = fNode.expression.callee;
								text += `${object.name}-${property.name}`;
								break;
							}
							case 'Identifier': {
								text += fNode.expression.callee.name;
								break;
							}
							default:
								break;
						}
						const args = fNode.expression.arguments;
						for (const arg of args) {
							switch (arg.type) {
								case 'Identifier':
									text += `-${arg.name}`;
									break;
								case 'Literal':
									text += `-${arg.value}`;
									break;
								default:
									break;
							}
						}
						break;
					}
					default:
						break;
				}
			}
		},
	});

	return text;
}
