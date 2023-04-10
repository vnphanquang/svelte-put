/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BaseNode } from 'estree';

/**
 * @internal
 */
export interface Node extends BaseNode {
  name: string;
  start: number;
  end: number;
  attributes: Array<{ name: string; type: string; value?: any[]; start: number; end: number }>;
  children?: Array<Node>;
  data?: any;
}

/**
 * @internal
 */
export function getAttribute(
  source: string,
  node: Node,
  attributeName: string,
): string | undefined {
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

export function getAttributes(source: string, node: Node) {
  return node.attributes.reduce((acc, attr: any) => {
    if (attr.type === 'Attribute') {
      let raw = source.slice(attr.start + attr.name.length + 1, attr.end);
      if (raw.startsWith('"') && raw.endsWith('"')) {
        raw = raw.slice(1, -1);
      }
      acc[attr.name] = raw;
    }
    return acc;
  }, {} as Record<string, string>);
}
