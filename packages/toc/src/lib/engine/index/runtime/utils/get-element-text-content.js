/**
 * get text content of an element, minus any nested anchor element
 * that may have been injected by the preprocessor
 * @param {HTMLElement} element
 * @returns {string}
 */
export function getElementTextContent(element) {
	return Array.from(element.children).reduce((acc, child) => {
		const anchor = /** @type {HTMLElement} */ (child).dataset.anchor;
		if (!anchor || anchor === 'content') {
			acc += child.textContent || '';
		}
		return acc;
	}, '');
}
