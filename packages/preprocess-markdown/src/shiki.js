import fs from 'fs';
import path from 'path';

import { toString } from 'hast-util-to-string';
import { h } from 'hastscript';
import { createHighlighterCore } from 'shiki/core';

export const highlighter = await createHighlighterCore({
	themes: [import('shiki/themes/dark-plus.mjs'), import('shiki/themes/light-plus.mjs')],
	langs: [
		import('shiki/langs/javascript.mjs'),
		import('shiki/langs/typescript.mjs'),
		import('shiki/langs/html.mjs'),
		import('shiki/langs/css.mjs'),
		import('shiki/langs/svelte.mjs'),
		import('shiki/langs/shellscript.mjs'),
		import('shiki/langs/markdown.mjs'),
	],
	loadWasm: import('shiki/wasm'),
});

const ATTRIBUTES_FOR_SHIKI_TRANSFORMER = /** @type {string[]} */(/** @satisfies {(keyof CodeBlockMetadata)[]} */([
	'__raw',
	'__filename',
	'__src',
	'__enhanced',
	'__skipMetaBlock',
]));
/**
 * @typedef CodeBlockMetadata
 * @property {string} [__raw] - raw code block content
 * @property {string} [__filename] - filename of the file containing the code block
 * @property {string} [__src] - fetch code content from filesystem, relative to filename
 * @property {string} [__lang] - language of the code block
 * @property {string} [__title] - optional title for code block
 * @property {string} [__enhanced] - whether should be marked ready for enhance-code-block. Defaults to `true`
 * @property {string} [__skipMetaBlock] - whether should skip meta block processing (:::highligh, :::diff, :::focus). Defaults to `false`
 * @property {string} [__numLines] - total number of lines of code
 */

const STATUSES = ['info', 'success', 'warning', 'error'];
/**
 * @returns {import('shiki').ShikiTransformer}
 */
export function transformer() {
	return {
		name: 'enhance-code-block',
		preprocess(code) {
			/** @type {CodeBlockMetadata} */
			const meta = this.options.meta || (this.options.meta = {});
			if (!('lang' in meta)) meta.__lang = this.options.lang;
			if (meta.__src && meta.__filename) {
				const srcPath = path.resolve(path.dirname(meta.__filename), meta.__src);
				if (fs.existsSync(srcPath)) {
					code = fs.readFileSync(srcPath, 'utf-8');
				}
			}
			if (code.endsWith('\n')) code = code.slice(0, -1);
			return code;
		},
		code(hast) {
			const meta = /** @type {CodeBlockMetadata} */ (this.options.meta);
			if (meta?.__enhanced === 'false') return hast;

			// FIXME: correct typing
			/** @type {any[]} */
			const lines = hast.children.filter((i) => i.type === 'element');
			let lineNumber = 0;

			/** @typedef {{ type: 'diff'; variant: '-' | '+' }} BlockDiff */
			/** @typedef {{ type: 'highlight'; variant: typeof STATUSES[number]}} BlockHighlight */
			/** @typedef {{ type: 'focus' }} BlockFocus */
			/** @typedef {BlockDiff | BlockHighlight | BlockFocus} Block */

			/** @type {Block[]} */
			const blocks = [];

			for (const line of lines) {
				lineNumber++;

				let shouldAddLineNumber = true;

				let isMetaLine = false;

				if (meta.__skipMetaBlock === undefined || meta.__skipMetaBlock === 'false') {
					const str = toString(line).trim();
					if (str.includes(':::')) {
						isMetaLine = true;

						// diff
						let match = str.match(/:::diff\s+([+-])(?![^\s])/);
						if (match) {
							const variant = /** @type {BlockDiff['variant']} */ (match[1]);
							blocks.push({ type: 'diff', variant });
						}

						// highlight
						if (!match) {
							match = str.match(new RegExp(`:::highlight\\s?(${STATUSES.join('|')})?(?![^\\s])`));
							if (match) {
								const variant = match[1] ?? 'info';
								blocks.push({ type: 'highlight', variant });
							}
						}

						// focus
						if (!match) {
							match = str.match(/:::focus/);
							if (match) {
								blocks.push({ type: 'focus' });
							}
						}

						if (!match) {
							blocks.pop();
						}
					}

					if (isMetaLine) {
						const index = hast.children.indexOf(line);
						const lineAfter = hast.children.at(index + 1);
						if (lineAfter && lineAfter.type === 'text' && lineAfter.value === '\n') {
							hast.children.splice(index + 1, 1);
						}
						hast.children.splice(index, 1);
						lineNumber--;
						continue;
					}

					if (blocks.length) {
						let alreadyDiffed = false;
						for (let i = blocks.length - 1; i >= 0; i--) {
							const block = blocks[i];
							switch (block.type) {
								case 'diff':
									if (alreadyDiffed) continue;
									alreadyDiffed = true;
									line.properties['data-line-diff'] = block.variant;
									if (block.variant === '-') {
										shouldAddLineNumber = false;
										lineNumber--;
									}
									break;
								case 'highlight':
									line.properties['data-line-highlighted'] = block.variant;
									break;
								case 'focus':
									line.properties['data-focus'] = '';
									break;
							}
						}
					}
				}

				if (shouldAddLineNumber) {
					line.properties['data-line'] = lineNumber;
				}
			}

			this.pre.properties['data-num-lines'] = lineNumber;
			if (meta) {
				meta.__numLines = lineNumber.toString();
			}
		},
		/** @type {any} */
		pre(hast) {
			delete hast.properties['tabindex'];

			let container = hast;
			const meta = /** @type {CodeBlockMetadata} */ (this.options.meta);
			if (meta?.__enhanced !== 'false') {
				container = /** @type {typeof container} */(h('enhanced-code-block', [hast]));
			}

			if (meta) {
				for (const [key, value] of Object.entries(meta)) {
					if (ATTRIBUTES_FOR_SHIKI_TRANSFORMER.includes(key)) continue;
					if (key === '__class') {
						this.addClassToHast(container, value);
						continue;
					}
					container.properties[key.slice(2)] = value;
				}
			}

			return container;
		},
	};
}

