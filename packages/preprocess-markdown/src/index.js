import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import MagicString from 'magic-string';
import rehypeStringify from 'rehype-stringify';
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
				.use(remarkRehype, { allowDangerousHtml: true })
				.use(rehypeNegateSvelteLogicBlock)
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

// logic blocks such as {#if}, {#each} will be treated by remark-rehype as text and goes into <p> tag.
// this plugin unpack such p tags
function rehypeNegateSvelteLogicBlock() {
	/**
	 * @param {import('hast').Root} tree
	 * @returns {undefined}
	 */
	return (tree) => {
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName !== 'p') return;
			if (!parent || !index) return;
			const firstChild = node.children.at(0);
			if (!firstChild) return;
			if (firstChild.type === 'text' && firstChild.value.startsWith('{#')) {
				parent.children.splice(index, 1, ...node.children);
			}
		})
	};
}

export { enhanceCodeBlock } from './enhance-code-block/index.js';
export default markdown;
