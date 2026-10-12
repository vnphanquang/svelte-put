import BananaSlug from 'github-slugger';

import { resolveAttributes } from '../../attributes/index.js';

import { getElementTextContent } from './utils/get-element-text-content.js';

/** @import { ResolvedTocIndex, ResolvedTocTrack, TocItem } from '..' */

/**
 * @typedef RuntimeIndexInput
 * @property {HTMLElement} element
 * @property {ResolvedTocIndex<true>} options
 * @property {ResolvedTocTrack} track
 */

/**
 * @typedef RuntimeIndexOutput
 * @property {TocItem[]} items
 * @property {HTMLElement[]} elements
 */

/**
 * @param {RuntimeIndexInput} input
 * @returns {RuntimeIndexOutput}
 */
export function runtimeIndex(input) {
	const { element: root, options, track } = input;

	const slugger = new BananaSlug();

	/** @type {TocItem[]} */
	const items = [];
	const elements = /** @type {HTMLElement[]} */ (
		Array.from(root.querySelectorAll(options.selector)).filter(
			(e) => !e.hasAttribute('data-toc-ignore'),
		)
	);

	for (const element of elements) {
		const text = getElementTextContent(element);
		let id = element.id;
		if (!id) {
			const slugged = slugger.slug(text);
			id = options.slug({ generated: slugged, nodeText: text, slugger });
		}
		const item = { id, text, tag: element.tagName, index: items.length };
		items.push(item);
	}

	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		const element = elements[i];

		if (element.hasAttribute('data-toc-index')) continue;

		const isTrackEnabled = track.enabled({ item });

		const indexValues = [];
		if (i === 0) indexValues.push('first');
		if (i === elements.length - 1) indexValues.push('last');
		if (!isTrackEnabled) indexValues.push('notrack');

		const styles = [`--current:--toc-${item.index}`];
		if (isTrackEnabled) {
			styles.push(`--next:--toc-${item.index + 1}`);
		}

		const { map } = resolveAttributes({
			items,
			item,
			resolver: options.attributes,
			defaults: {
				id: item.id,
				'data-toc-index': indexValues.join(','),
				style: styles.join(';') + ';' + (element.getAttribute('style') ?? ''),
			},
		});
		for (const [key, value] of Object.entries(map)) {
			if (value === '') {
				element.toggleAttribute(key, true);
				continue;
			}
			element.setAttribute(key, value);
		}
	}

	return { elements, items };
}
