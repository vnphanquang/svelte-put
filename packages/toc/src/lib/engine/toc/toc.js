import { createAttachmentKey } from 'svelte/attachments';
import { SvelteMap } from 'svelte/reactivity';

import { tocPositionValue } from '../../styles/index.js';

import { resolveTocOptions } from './options.js';

/**
 * @import { TocOptions, ResolvedTocOptions, TocItem, RuntimeIndexAttributes, EnhanceLinkAttributes, EnhanceScopeAttributes } from './types.public'
 * @import { Attachment } from 'svelte/attachments'
 */

/**
 * a central object that holds the Table-of-Contents data, provides SSR-compatible enhancements and runtime indexing
 */
export class Toc {
	/** @type {ResolvedTocOptions} */
	options;

	/**
	 * the extracted toc items, populated at compile-time or on mount
	 * @type {SvelteMap<string, TocItem>}
	 */
	items;

	/**
	 * @param {TocOptions} [options]
	 */
	constructor(options) {
		this.options = resolveTocOptions(options);
		if (Array.isArray(this.options.items)) {
			this.items = new SvelteMap(this.options.items.map((i) => [i.id, i]));
		} else {
			this.items = new SvelteMap(this.options.items);
		}
	}

	runtime = {
		/**
		 * traverse the DOM from this node downwards, looking for matching tags according to the
		 * initialisation options: each becomes an item in the Table-of-Contents
		 *
		 * Alternatively, do this with the compile-time strategy instead if your content and layout can afford so.
		 *
		 * @returns {RuntimeIndexAttributes}
		 */
		index: () => {
			return {
				[createAttachmentKey()]: /** @type {Attachment<HTMLElement>} */ (
					(element) => {
						const { index, anchor, track } = this.options;
						import('../index/runtime/index.js').then(({ runtimeIndex }) => {
							const { elements, items } = runtimeIndex({
								id: this.options.id,
								element,
								options: index,
								track,
							});
							this.items.clear();
							for (const item of items) {
								this.items.set(item.id, item);
							}
							if (anchor.enabled) {
								import('../anchor/runtime.js').then(({ runtimeAnchor }) => {
									for (let i = 0; i < items.length; i++) {
										const item = items[i];
										const element = elements[i];
										runtimeAnchor({ id: this.options.id, items, item, options: anchor, element });
									}
								});
							}
						});
					}
				),
			};
		},
	};

	/** enhancements to relevant elements. Most of them are SSR-compatible */
	enhance = {
		/**
		 * set this on a common ancestor of these two markup:
		 * - the indexable content (DOM subtree that hosts all the matching tags), and
		 * - the Table-of-Contents (where you use `.enhance.link`).
		 * For example:
		 * ```svelte
		 * <main {...toc.enhance.scope()}> <!-- set scope here -->
		 *   <section>
		 *     <h2>Table of Contents</h2>
		 *     <ul>
		 *       {#each toc.items.values as item (item.id)}
		 *        <li> <a>{item.text}</a> </li>
		 *       {/each}
		 *     </ul>
		 *   </section>
		 *
		 *   <div>
		 *     <!-- main content -->
		 *   </div>
		 * </main>
		 * ```
		 * @returns {EnhanceScopeAttributes}
		 */
		scope: () => {
			const items = Array.from(
				this.items.values().map((item) => tocPositionValue(item.index, this.options.id)),
			).join(',');
			return {
				'data-toc-scope': this.options.track.flat ? 'flat' : '',
				...(items && {
					style: `--items:${items};`,
				}),
			};
		},

		/**
		 * @param {TocItem} item
		 * @returns {EnhanceLinkAttributes}
		 */
		link: (item) => {
			const items = Array.from(this.items.values());
			/** @type {string[]} */
			let styles = [];
			styles.push(`--current:${tocPositionValue(item.index, this.options.id)}`);
			if (items[item.index + 1]) {
				styles.push(`--next:${tocPositionValue(item.index + 1, this.options.id)}`);
			}

			/** @type {string[]} */
			const linkValues = [];
			if (item.index === 0) linkValues.push('first');
			if (item.index === this.items.size - 1) linkValues.push('last');

			return {
				'data-toc-link': linkValues.join(','),
				href: `#${item.id}`,
				title: item.text, //
				...(styles.length && {
					style: styles.join(';'),
				}),
			};
		},
	};
}
