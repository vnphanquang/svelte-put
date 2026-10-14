import { resolveAttributes } from '../attributes/index.js';

/** @import { ResolvedTocAnchor, TocItem } from '../..' */

/**
 * @typedef RuntimeAnchorInput
 * @property {TocItem[]} items
 * @property {ResolvedTocAnchor} options
 * @property {TocItem} item
 * @property {HTMLElement} element
 */

/**
 * @param {Element | null | undefined} element
 * @returns {boolean}
 */
function isExistingAnchorElement(element) {
	return (
		!!element && element.tagName.toUpperCase() === 'A' && element.hasAttribute('data-toc-anchor')
	);
}

/**
 * @param {RuntimeAnchorInput} input
 */
export function runtimeAnchor(input) {
	const { options, items, item, element } = input;

	const a = document.createElement('a');
	let position = options.position.try;

	/** @type {(() => void) | null} */
	let insert = null;

	// =======================================
	// Calculate appropriate location,
	// skip if already added
	// =======================================
	while (!insert) {
		switch (position) {
			case 'before': {
				if (isExistingAnchorElement(element.previousElementSibling)) return;
				insert = () => element.insertAdjacentElement('beforebegin', a);
				break;
			}
			case 'prepend': {
				if (isExistingAnchorElement(element.firstElementChild)) return;
				insert = () => element.insertAdjacentElement('afterbegin', a);
				break;
			}
			case 'wrap': {
				const containsAnchor = !!element.querySelector('a');
				if (containsAnchor) {
					position = options.position.fallback;
					continue;
				}

				if (isExistingAnchorElement(element.parentElement)) return;
				insert = () => {
					a.innerHTML = element.outerHTML;
					element.replaceWith(a);
				};
				break;
			}
			case 'content': {
				const containsAnchor = !!element.querySelector('a');
				if (containsAnchor) {
					position = options.position.fallback;
					continue;
				}

				if (isExistingAnchorElement(element.parentElement)) return;
				insert = () => {
					a.innerHTML = element.innerHTML;
					element.replaceChildren(a);
				};
				break;
			}
			case 'append': {
				if (isExistingAnchorElement(element.lastElementChild)) return;
				insert = () => element.insertAdjacentElement('beforeend', a);
				break;
			}
			case 'after': {
				if (isExistingAnchorElement(element.nextElementSibling)) return;
				insert = () => element.insertAdjacentElement('afterend', a);
				break;
			}
		}
	}

	// =======================================
	// Add appropriate attributes
	// =======================================
	/** @type {Record<string, string>} */
	const defaults = {
		href: options.href(item.id),
		'data-toc-anchor': position,
	};
	if (!['wrap', 'content'].includes(position)) {
		a.textContent = options.content;
		defaults['aria-hidden'] = 'true';
		defaults['tabindex'] = '-1';
	} else {
		const content =
			!options.content.startsWith('url') && !options.content.startsWith("'")
				? `'${options.content}'`
				: options.content;
		const styles = [`--current:--toc-${item.index}`, `--content:${content}`];
		defaults['style'] = styles.join(';');
	}
	const { map } = resolveAttributes({
		items,
		item,
		resolver: options.attributes,
		defaults,
	});
	for (const [key, value] of Object.entries(map)) {
		if (value === '') {
			a.toggleAttribute(key, true);
			continue;
		}
		a.setAttribute(key, value);
	}

	insert();
}
