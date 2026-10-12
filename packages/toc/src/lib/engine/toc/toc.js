import { createAttachmentKey } from 'svelte/attachments';
import { SvelteMap } from 'svelte/reactivity';

import { resolveTocOptions } from './options.js';

/**
 * @import { TocOptions, ResolvedTocOptions, TocItem, RuntimeIndexAttributes, EnhanceLinkAttributes, EnhanceScopeAttributes } from './types.public'
 * @import { Attachment } from 'svelte/attachments'
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
		this.items = new SvelteMap(this.options.items);
	}

	runtime = {
		/**
		 * traverse the DOM from this node downwards, looking for matching tags according to the
		 * initialisation options: each becomes an item in the Table-of-Contents
		 *
		 * Note that this only has effect if `parsing` is `true`. Alternatively, do this with the
		 * compile-time strategy instead if your content and layout can afford so.
		 *
		 * @returns {RuntimeIndexAttributes}
		 */
		index: () => {
			return {
				[createAttachmentKey()]: /** @type {Attachment<HTMLElement>} */ (
					(element) => {
						const { index, anchor, track } = this.options;
						if (!index) {
							console.warn(
								'runtime parsing was turned off at Toc initialisation. Calling `toc.index()` has no effect',
							);
							return;
						}

						import('../index/runtime/index.js').then(({ runtimeIndex }) => {
							const { elements, items } = runtimeIndex({ element, options: index, track });
							this.items.clear();
							for (const item of items) {
								this.items.set(item.id, item);
							}
							if (anchor.enabled) {
								import('../anchor/runtime.js').then(({ runtimeAnchor }) => {
									for (let i = 0; i < items.length; i++) {
										const item = items[i];
										const element = elements[i];
										runtimeAnchor({ items, item, options: anchor, element });
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
		 *        <li>
		 *          <a class="">{item.text}</a>
		 *        </li
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
			const items = Array.from(this.items.values().map(({ index }) => `--toc-${index}`)).join(',');
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
			styles.push(`--current:--toc-${item.index}`);
			if (items[item.index + 1]) {
				styles.push(`--next:--toc-${item.index + 1}`);
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
