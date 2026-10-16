import { walk } from 'zimmerframe';

import { tocPositionValue } from '../../styles/index.js';
import { resolveAttributes } from '../attributes/index.js';

/** @import { MagicString } from 'magic-string' */
/** @import { AST } from 'svelte/compiler' */
/** @import { TocItem } from '../toc' */
/** @import { ResolvedTocAnchor } from './types.public' */

/**
 * @typedef PreprocessAnchorInput
 * @property {MagicString} s
 * @property {number} [id]
 * @property {TocItem[]} items
 * @property {AST.RegularElement} element
 * @property {TocItem} item
 * @property {ResolvedTocAnchor} options
 */

/**
 * @param {PreprocessAnchorInput} input
 * @returns {void}
 */
export function preprocessAnchor(input) {
	const { s, items, id, element, item, options } = input;

	let position = options.position.try;

	if (['wrap', 'content'].includes(position)) {
		let containsAnchor = false;

		walk(/** @type {AST.RegularElement} */ (/** @type {unknown} */ (element.fragment)), null, {
			RegularElement(node, { stop }) {
				if (node.name.toUpperCase() === 'A') {
					containsAnchor = true;
					return stop();
				}
			},
		});
		if (containsAnchor) {
			position = options.position.fallback;
		}
	}

	const { str } = resolveAttributes({
		items,
		item,
		resolver: options.attributes,
		defaults: {
			href: `#${item.id}`,
			'data-toc-anchor': position,
			...(!['wrap', 'content'].includes(position)
				? {
						'aria-hidden': 'true',
						tabindex: '-1',
					}
				: {
						'style:--current': tocPositionValue(item.index, id),
						'style:--content':
							!options.content.startsWith('url') && !options.content.startsWith("'")
								? `'${options.content}'`
								: options.content,
					}),
		},
	});
	const anchorOpening = `<a ${str}>`;
	const anchorClosing = '</a>';

	const firstContentNode = element.fragment.nodes[0];
	const lastContentNode = element.fragment.nodes[element.fragment.nodes.length - 1];
	switch (position) {
		case 'before':
			s.appendLeft(element.start, `${anchorOpening}${options.content}${anchorClosing}`);
			break;
		case 'prepend':
			s.appendRight(firstContentNode.start, `${anchorOpening}${options.content}${anchorClosing}`);
			break;
		case 'wrap':
			s.appendRight(element.fragment.nodes[0].start, anchorOpening).appendLeft(
				lastContentNode.end,
				anchorClosing,
			);
			break;
		case 'content':
			s.update(
				firstContentNode.start,
				lastContentNode.end,
				`${anchorOpening}${s.slice(firstContentNode.start, lastContentNode.end)}${anchorClosing}`,
			);
			break;
		case 'append':
			s.appendLeft(lastContentNode.end, `${anchorOpening}${options.content}${anchorClosing}`);
			break;
		case 'after':
			s.appendRight(element.end, `${anchorOpening}${options.content}${anchorClosing}`);
			break;
	}
}
