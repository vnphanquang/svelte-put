import BananaSlug from 'github-slugger';
import { walk } from 'zimmerframe';

import { getElementId, getElementTextContent } from '../utils/index.js';

import { injectAnchor } from './inject-anchor.js';

/** @import { AST } from 'svelte/compiler' */
/** @import { MagicString } from 'magic-string' */
/** @import { TocPreprocessorOptions, TocPreprocessorAnchorOptions } from '../types.public' */
/** @import { CompileTimeTocItem } from '../../types.public' */

/**
 * @typedef ProcessTagsInput
 * @property {MagicString} s
 * @property {AST.Root} ast
 * @property {string[]} tags
 * @property {string} idAttribute
 * @property {NonNullable<TocPreprocessorOptions['slug']>} slug
 * @property {Required<Omit<TocPreprocessorAnchorOptions, 'properties'>> & { properties: Record<string, string>}} anchor
 */

/**
 * @param {ProcessTagsInput} input
 * @returns {CompileTimeTocItem[]}
 */
export function processTags(input) {
	const { s, ast, ...o } = input;
	const slugger = new BananaSlug();

	/** @type {CompileTimeTocItem[]} */
	const items = [];

	walk(/** @type {AST.RegularElement} */ (/** @type {unknown} */ (ast.fragment)), null, {
		RegularElement(node, { next }) {
			if (!o.tags.includes(node.name) || !node.fragment.nodes?.length) return next();

			let text = getElementTextContent(node);
			let id = getElementId(s, node, o.idAttribute);
			if (!id) {
				const slug = slugger.slug(text);
				id = o.slug({ generated: slug, nodeText: text, slugger });
				s.appendLeft(node.fragment.nodes[0].start - 1, ` ${o.idAttribute}="${id}"`);
			}

			items.push({ id, text, tag: node.name });
			injectAnchor(s, node, id, o.anchor);
		},
	});

	return items;
}
