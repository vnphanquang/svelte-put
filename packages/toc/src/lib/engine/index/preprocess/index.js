import BananaSlug from 'github-slugger';
import { walk } from 'zimmerframe';

import { resolveAttributes } from '../../attributes/index.js';

import { getElementId } from './utils/get-element-id.js';
import { getElementTextContent } from './utils/get-element-text-content.js';

/** @import { MagicString } from 'magic-string' */
/** @import { AST } from 'svelte/compiler' */
/** @import { TocItem } from '../../toc' */
/** @import { ResolvedTocIndex } from '../types.public' */
/** @import { ResolvedTocTrack } from '../../track/types.public' */

/**
 * @typedef PreprocessIndexInput
 * @property {MagicString} s
 * @property {AST.Root} ast
 * @property {ResolvedTocIndex} options
 * @property {ResolvedTocTrack} track
 */

/**
 * @typedef PreprocessIndexOutput
 * @property {TocItem[]} items
 * @property {AST.RegularElement[]} nodes
 */

/**
 * @param {PreprocessIndexInput} input
 * @returns {PreprocessIndexOutput}
 */
export function preprocessIndex(input) {
	const { s, ast, options, track } = input;

	const slugger = new BananaSlug();

	/** @type {AST.RegularElement[]} */
	const nodes = [];
	/** @type {TocItem[]} */
	const items = [];

	walk(/** @type {AST.RegularElement} */ (/** @type {unknown} */ (ast.fragment)), null, {
		RegularElement(node, { next }) {
			if (!options.tags.includes(node.name) || !node.fragment.nodes?.length) return next();

			let text = getElementTextContent(node);
			let id = getElementId(s, node, options.idAttribute);

			if (!id) {
				const slugged = slugger.slug(text);
				id = options.slug({ generated: slugged, nodeText: text, slugger });
			}
			const item = { id, text, tag: node.name, index: items.length };
			items.push(item);
			nodes.push(node);
		},
	});

	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		const node = nodes[i];

		const isTrackEnabled = track.enabled({ item });
		const indexValues = [];
		if (i === 0) indexValues.push('first');
		if (i === nodes.length - 1) indexValues.push('last');

		if (!isTrackEnabled) indexValues.push('notrack');

		const { str } = resolveAttributes({
			items,
			item,
			resolver: options.attributes,
			defaults: {
				id: item.id,
				'data-toc-index': indexValues.join(','),
				'style:--current': `--toc-${item.index}`,
				...(isTrackEnabled && {
					'style:--next': `--toc-${item.index + 1}`,
				}),
			},
		});
		s.appendLeft(node.fragment.nodes[0].start - 1, ` ${str}`);
	}

	return { nodes, items };
}
