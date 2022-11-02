import BananaSlug from 'github-slugger';
import MagicString from 'magic-string';
import { parse } from 'svelte-parse-markup';
import { walk } from 'svelte/compiler';
import { PreprocessorGroup } from 'svelte/types/compiler/preprocess';

import { DEFAULT_AUTO_SLUG_OPTIONS } from './auto-slug.constants';
import type { AutoSlugInput, Node } from './auto-slug.types';
import { getTextContent, hasIdAttribute, isMustacheNode } from './auto-slug.utils';

/**
 * create svelte preprocessor to generate slug from text content of matching tags
 *
 * By default, it will search for all headings tag and add the generated slug to the tag's id attribute.
 *
 * @public
 *
 * @returns {PreprocessorGroup} svelte preprocessor interface
 */
export function autoSlug(input: AutoSlugInput): PreprocessorGroup {
  let options = DEFAULT_AUTO_SLUG_OPTIONS;
  const iOptions = typeof input === 'function' ? input(options) : input;
  options = {
    ...options,
    ...iOptions,
    anchor: {
      ...options.anchor,
      ...(iOptions.anchor ?? {}),
    },
  };
  return {
    markup({ content, filename }) {
      const s = new MagicString(content);
      const ast = parse(content, { filename });
      const slugger = new BananaSlug();

      walk(ast.html, {
        enter(node) {
          const tNode = node as Node;
          if (
            node.type === 'Element' &&
            options.tags.includes(tNode.name) &&
            !hasIdAttribute(tNode, options.attributeName) &&
            !isMustacheNode(tNode) &&
            tNode.children?.length
          ) {
            const nodeText = getTextContent(tNode).trim();
            if (nodeText) {
              const slug = options.slug({
                generated: slugger.slug(nodeText),
                nodeText,
                slugger,
              });

              const idAttrStr = ` ${options.attributeName}="${slug}"`;
              s.appendLeft(tNode.children[0].start - 1, idAttrStr);

              if (options.anchor.enabled) {
                const inlineProperties = Object.entries(options.anchor.properties)
                  .map(([key, value]) => `${key}="${value}"`)
                  .join(' ');
                const anchorOpening = `<a href="#${slug}" ${inlineProperties}>`;
                const anchorClosing = '</a>';

                switch (options.anchor.position) {
                  case 'before':
                    s.appendLeft(
                      tNode.start,
                      `${anchorOpening}${options.anchor.content}${anchorClosing}`,
                    );
                    break;
                  case 'prepend':
                    s.appendRight(
                      tNode.children[0].start,
                      `${anchorOpening}${options.anchor.content}${anchorClosing}`,
                    );
                    break;
                  case 'wrap':
                    s.appendRight(tNode.children[0].start, anchorOpening).appendLeft(
                      tNode.children[tNode.children.length - 1].end,
                      anchorClosing,
                    );
                    break;
                  case 'append':
                    s.appendLeft(
                      tNode.children[tNode.children.length - 1].end,
                      `${anchorOpening}${options.anchor.content}${anchorClosing}`,
                    );
                    break;
                  case 'after':
                    s.appendRight(
                      tNode.end,
                      `${anchorOpening}${options.anchor.content}${anchorClosing}`,
                    );
                    break;
                }
              }
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
}
