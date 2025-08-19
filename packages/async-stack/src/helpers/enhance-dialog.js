import { createAttachmentKey } from 'svelte/attachments';

/**
 * @template Resolved
 * @param {import('../stack-item.svelte').StackItem<import('svelte').Component<import('../types.public').StackItemProps<Resolved>>, Resolved>} item
 * @param {import('./enhance-dialog').EnhanceDialogOptions<Resolved>} [options]
 * @returns {import('svelte/elements').HTMLDialogAttributes}
 */
export function enhanceDialog(item, options) {
	return {
		/** @type {import('svelte/attachments').Attachment<HTMLDialogElement>} */
		[createAttachmentKey()]: function (dialog) {
			dialog.showModal();

			// set up listener when user calls item.resolve manually
			/** @type {undefined | (() => void)}  */
			let resumeResolution = undefined;
			/** @type {undefined | (() => void)} */
			let offResolve = undefined;
			/** @type {import('@svelte-put/async-stack').StackItemResolveListener<Resolved>} */
			const onResolve = ({ cancel }) => {
				if (options?.preventResolution) return cancel();
				return new Promise((resolvePromise) => {
					if (dialog.open) {
						// user calls `item.resolve(...)`
						dialog.removeEventListener('close', onclose);
						if ('requestClose' in dialog) {
							dialog.requestClose();
						} else {
							dialog.close();
						}
					}
					resumeResolution = resolvePromise;
				});
			};
			if (options?.delayResolution) {
				offResolve = item.onResolve(onResolve);
			}
			function onanimationend() {
				if (dialog.open) return;
				if (options?.delayResolution === 'animationend') {
					resumeResolution?.();
				}
			}
			dialog.addEventListener('animationend', onanimationend);

			// set up backdrop click handler
			dialog.addEventListener('click', onclick);
			dialog.addEventListener('clickbackdrop', onclickbackdrop);

			// if dialog is setup with "method=dialog" form / inputs
			// this will help capture without the need for JavaScript
			function onclose() {
				item.resolve(
					/** @type {Resolved} */ (dialog.returnValue) || options?.defaultReturnValue || undefined,
				);
			}
			dialog.addEventListener('close', onclose);

			// prevent dialog from closing if specified
			/** @param {Event} event */
			function oncancel(event) {
				if (options?.preventResolution) {
					event.preventDefault();
				}
			}
			dialog.addEventListener('cancel', oncancel);

			return () => {
				offResolve?.();
				resumeResolution?.();
				dialog.removeEventListener('animationend', onanimationend);
				dialog.removeEventListener('click', onclick);
				dialog.removeEventListener('clickbackdrop', onclickbackdrop);
				dialog.removeEventListener('close', onclose);
				dialog.removeEventListener('cancel', oncancel);
			};
		},
	};
}

/**
 * @param {MouseEvent} event
 */
function onclick(event) {
	const dialog = /** @type {HTMLDialogElement} */ (event.currentTarget);
	const rect = dialog.getBoundingClientRect();
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
 * @param {Event} event
 */
function onclickbackdrop(event) {
	const dialog = /** @type {HTMLDialogElement} */ (event.currentTarget);
	if ('requestClose' in dialog) {
		dialog.requestClose();
	} else {
		dialog.close();
	}
}
