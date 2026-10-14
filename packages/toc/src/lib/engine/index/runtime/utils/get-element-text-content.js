/**
 * get text content of an element, minus any nested anchor element
 * that may have been injected by the preprocessor
 * @param {HTMLElement} element
 * @returns {string}
 */
export function getElementTextContent(element) {
	return Array.from(element.childNodes).reduce((acc, child) => {
		if (child.nodeType === Node.TEXT_NODE) {
			acc += child.textContent;
		} else if (child.nodeType === Node.ELEMENT_NODE) {
			const anchor = /** @type {HTMLElement} */ (child).dataset.anchor;
			if (!anchor || anchor === 'content') {
				acc += child.textContent || '';
			}
		}
		return acc;
	}, '');
}
