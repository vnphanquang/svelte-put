import { createAttachmentKey } from 'svelte/attachments';

/**
 * @template Resolved
 * @typedef EnhanceDialogOptions
 * @property {Resolved} [defaultReturnValue] default return value when dialog is closed, helpful to capture method="dialog" form / inputs without the need for additional JavaScript
 * @property {'animationend'} [delayResolution] delay resolution, helpful for exit animation and such
 */

/**
 * @typedef EnhanceDialogAttributes
 * @property {(e: CustomEvent<void>) => void} [onclickbackdrop] fired when clicked on backdrop
 */

/**
 * enhance an `HTMLDialogElement` when used as component for `StackItem`. This will:
 * 1. call `showModal()` on the dialog is mounted,
 * 2. capture `form.returnValue` when integrated with method="dialog" form / inputs,
 * 3. close the dialog when backdrop is clicked.
 * @template Resolved
 * @param {import('../stack-item.svelte').StackItem<import('svelte').Component<import('../types.public').StackItemProps<Resolved>>, Resolved>} item
 * @param {EnhanceDialogOptions<Resolved>} [options]
 * @returns {import('svelte/elements').HTMLDialogAttributes & EnhanceDialogAttributes}
 */
export function enhanceDialog(item, options) {
	/** @type {undefined | (() => void)}  */
	let resumeResolution = undefined;
	if (options?.delayResolution) {
		item.onResolve(() => new Promise((resolve) => (resumeResolution = resolve)));
	}

	return {
		/** @param {Event} event */
		onanimationend(event) {
			const dialog = /** @type {HTMLDialogElement} */ (event.target);
			if (dialog.open) return;
			if (options?.delayResolution === 'animationend') {
				resumeResolution?.();
			}
		},

		/** @param {Event} event */
		onclose: function (event) {
			const dialog = /** @type {HTMLDialogElement} */ (event.target);
			// if dialog is setup with "method=dialog" form / inputs
			// this will help capture without the need for JavaScript
			item.resolve(
				/** @type {Resolved} */ (dialog.returnValue) || options?.defaultReturnValue || undefined,
			);
		},

		/**
		 * @param {HTMLDialogElement} element
		 */
		[createAttachmentKey()]: function (element) {
			const dialog = /** @type {HTMLDialogElement} */ (element);
			dialog.showModal();
		},

		onclickbackdrop,
		onclick,
	};
}

/**
 * @param {MouseEvent} event
 */
function onclick(event) {
	const dialog = /** @type {HTMLDialogElement} */ (event.currentTarget);
	const rect = /** @type {HTMLDialogElement} */ (event.target).getBoundingClientRect();
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

/**
 * @param {CustomEvent} event
 */
function onclickbackdrop(event) {
	const dialog = /** @type {HTMLDialogElement} */ (event.currentTarget);
	dialog.close();
}
