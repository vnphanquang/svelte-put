import { walk } from 'svelte/compiler';

import type { Node } from './auto-slug.types';

/**
 * @internal
 */
export function getIdAttribute(
  source: string,
  node: Node,
  attributeName: string,
): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const attr = node.attributes.find(
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
 * @internal
 */
export function getTextContent(node: Node) {
  if (node.type === 'Text') return node.data;
  if (node.type === 'MustacheTag') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fNode = node as any;
    switch (fNode.expression.type) {
      case 'Identifier':
        return fNode.expression.name;
      case 'MemberExpression': {
        const { object, property } = fNode.expression;
        return `${object.name}-${property.name}`;
      }
      case 'CallExpression': {
        let text = '';
        switch (fNode.expression.callee.type) {
          case 'MemberExpression': {
            const { object, property } = fNode.expression.callee;
            text = `${object.name}-${property.name}`;
            break;
          }
          case 'Identifier': {
            text = fNode.expression.callee.name;
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
        return text;
      }
      default:
        return '';
    }
  }
  if (!node.children || node.children.length === 0) return '';
  let text = '';
  for (const child of Array.from(node.children)) {
    walk(child, {
      enter(childNode) {
        text += getTextContent(childNode as Node);
      },
    });
  }
  return text;
}
