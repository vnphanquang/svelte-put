import type { BaseNode } from 'estree';
import Slugger from 'github-slugger';
import MagicString from 'magic-string';
import { parse } from 'svelte-parse-markup';
import { walk } from 'svelte/compiler';
import { PreprocessorGroup } from 'svelte/types/compiler/preprocess';

const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

/**
 * @internal
 */
interface Node extends BaseNode {
  name: string;
  start: number;
  attributes: Array<{ name: string; type: string }>;
  children?: Array<Node>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

/**
 * @internal
 */
function hasIdAttribute(node: Node) {
  return node.attributes.some((attr) => attr.name === 'id' && attr.type === 'Attribute');
}

/**
 * @internal
 */
function getTextContent(node: Node) {
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
function isMustacheNode(node: Node) {
  return node.children.some((child) => child.type === 'MustacheTag');
}

/**
 * create svelte preprocessor to generate slug from text content of matching tags
 *
 * By default, it will search for all headings tag and add the generated slug to the tag's id attribute.
 *
 * @public
 *
 * @returns {PreprocessorGroup} svelte preprocessor interface
 */
export function autoSlug(): PreprocessorGroup {
  const preprocess = {
    markup({ content, filename }) {
      const s = new MagicString(content);
      const ast = parse(content, { filename });
      const slugs = new Slugger();

      walk(ast.html, {
        enter(node) {
          const tNode = node as Node;
          if (
            node.type === 'Element' &&
            tags.includes(tNode.name) &&
            !hasIdAttribute(tNode) &&
            !isMustacheNode(tNode) &&
            tNode.children?.length
          ) {
            const textContent = getTextContent(tNode).trim();
            if (textContent) {
              const slug = slugs.slug(textContent);
              s.appendLeft(tNode.children[0].start - 1, ` id="${slug}"`);
            }
          }
        },
      });

      return {
        code: s.toString(),
        map: s.generateMap(),
      };
    },
  };
  return preprocess;
}
