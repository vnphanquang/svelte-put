// Register `hName`, `hProperties` types, used when turning markdown to HTML:
/// <reference types="mdast-util-to-hast" />
// Register directive nodes in mdast:
/// <reference types="mdast-util-directive" />

import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import {h} from 'hastscript'
import MagicString from 'magic-string';
import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import {visit} from 'unist-util-visit'

import { highlighter, transformer } from './shiki.js';

/**
 * @typedef MarkdownConfig
 * @property {(filename?: string) => boolean} [files] - a function that returns true if the file should be processed. By defaults it will match files with `.md.svelte` extension
 */

const DEFAULT_CONFIG = /** @satisfies {Required<MarkdownConfig>} */ ({
	files: (filename) => filename?.endsWith('.md.svelte') ?? false,
});

/**
 * parse markdown in Svelte
 * @param {MarkdownConfig} config - configuration for process-markdown
 * @returns {import('svelte/compiler').PreprocessorGroup}
 */
export function markdown(config) {
	const { files } = {
		...DEFAULT_CONFIG,
		...config,
	};
	return {
		name: 'preprocess-markdown',
		markup({ content, filename }) {
			if (!files(filename)) return;
			const s = new MagicString(content);
			const html = unified()
				.use(remarkParse)
				.use(remarkGfm)
				.use(remarkDirective)
				.use(remarkAnyHtmlDirective)
				.use(remarkRehype, { allowDangerousHtml: true })
				.use(rehypeShikiFromHighlighter, /** @type {any} */(highlighter), {
					themes: {
						light: 'light-plus',
						dark: 'dark-plus',
					},
					transformers: [transformer()],
					meta: {
						__filename: filename,
					},
					parseMetaString: (metaStr) => {
						/** @type {Record<string, string>}  */
						const meta = {};
						const regex = /([^\s=]+)(="(?:[^"]*)"|(?:=[^\s=]+))?/g;
						const matches = Array.from(metaStr.matchAll(regex));
						for (const match of matches) {
							const key = match[1];
							let value = match[2]
							if (!value) {
								value = 'true';
							}
							else {
								if (value.startsWith('=')) {
									value = value.slice(1);
								}
								if (value.startsWith('"') && value.endsWith('"')) {
									value = value.slice(1, -1);
								}
							}
							meta[`__${key}`] = value;
						}
						// if (match) meta[match[1].trim()] = match[2].trim();
						return meta;
					},
				})
				.use(rehypeStringify, { allowDangerousHtml: true })
				.processSync(content);
			s.update(0, content.length, html.toString());

			return {
				code: s.toString(),
				map: s.generateMap(),
			}
		},
	};
}

function remarkAnyHtmlDirective() {
  /**
   * @param {import('mdast').Root} tree
   * @returns {undefined}
   */
  return (tree) => {
    visit(tree, (node) => {
			if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        const data = node.data || (node.data = {});
        const hast = h(node.name, node.attributes || {});

        data.hName = hast.tagName;
        data.hProperties = hast.properties;
      }
    })
  }
}

export { enhanceCodeBlock } from './enhance-code-block/index.js';
export default markdown;
