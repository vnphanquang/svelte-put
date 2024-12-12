// TODO: candidate for a separate package?

/**
 * @typedef EnhanceDialogAttributes
 * @property {(e: CustomEvent<void>) => void} [onclickbackdrop] - fired when clicked on backdrop
 */

/**
 * @typedef {import('svelte/action').ActionReturn<undefined, EnhanceDialogAttributes>} EnhanceDialogActionReturn
 */

/**
 * @param {HTMLDialogElement} dialog
 * @returns {EnhanceDialogActionReturn}
 */
export function enhancedialog(dialog) {
	/**
	 * @param {MouseEvent} event
	 */
	function onClick(event) {
		let rect = /** @type {HTMLDialogElement} */ (event.target).getBoundingClientRect();
		if (!event.clientX || !event.clientY) return; // not a mouse event (probably triggered by keyboard)
		if (
			rect.left > event.clientX ||
			rect.right < event.clientX ||
			rect.top > event.clientY ||
			rect.bottom < event.clientY
		) {
			dialog.dispatchEvent(new CustomEvent('clickbackdrop'));
		}
	}

	dialog.addEventListener('click', onClick);

	return {
		destroy() {
			dialog.removeEventListener('click', onClick);
		},
	};
}
