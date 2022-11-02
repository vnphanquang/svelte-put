import { walk } from 'svelte/compiler';

import type { Node } from './auto-slug.types';

/**
 * @internal
 */
export function hasIdAttribute(node: Node, attributeName: string): boolean {
  return node.attributes.some((attr) => attr.name === attributeName && attr.type === 'Attribute');
}

/**
 * @internal
 */
export function getTextContent(node: Node) {
  if (node.type === 'Text') return node.data;
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

/**
 * @internal
 */
export function isMustacheNode(node: Node) {
  return node.children.some((child) => child.type === 'MustacheTag');
}
