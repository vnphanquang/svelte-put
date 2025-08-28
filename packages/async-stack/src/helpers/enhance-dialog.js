import { createAttachmentKey } from 'svelte/attachments';
import { on } from 'svelte/events';

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
			if (!dialog.open) dialog.showModal();
			/** @type {(() => void)[]} */
			const offs = [];

			// set up listener when user calls item.resolve manually
			/** @type {undefined | (() => void)}  */
			let resumeResolution = undefined;
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
				offs.push(item.onResolve(onResolve));
			}
			function onanimationend() {
				if (dialog.open) return;
				if (options?.delayResolution === 'animationend') {
					resumeResolution?.();
				}
			}
			offs.push(on(dialog, 'animationend', onanimationend));

			// set up backdrop click handler
			offs.push(on(dialog, 'click', onclick));
			offs.push(on(dialog, 'clickbackdrop', onclickbackdrop));

			// if dialog is setup with "method=dialog" form / inputs
			// this will help capture without the need for JavaScript
			function onclose() {
				item.resolve(
					/** @type {Resolved} */ (dialog.returnValue) || options?.defaultReturnValue || undefined,
				);
			}
			offs.push(on(dialog, 'close', onclose));

			// prevent dialog from closing if specified
			/** @param {Event} event */
			function oncancel(event) {
				if (options?.preventResolution) {
					event.preventDefault();
				}
			}
			offs.push(on(dialog, 'cancel', oncancel));

			// prevent escape from closing dialog if specified
			// this is only needed on Chrome where the cancel event isn't fired
			// if Escape is pressed twice
			// See: https://issues.chromium.org/issues/41491338
			/** @param {KeyboardEvent} event */
			function onkeydown(event) {
				if (options?.preventResolution && event.key === 'Escape') {
					event.preventDefault();
				}
			}
			offs.push(on(window, 'keydown', onkeydown));

			return () => {
				offs.forEach((off) => off());
				resumeResolution?.();
			};
		},
	};
}

/**
 * @param {MouseEvent} event
 */
function onclick(event) {
	if (event.defaultPrevented) return;
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
	if (event.defaultPrevented) return;
	const dialog = /** @type {HTMLDialogElement} */ (event.currentTarget);
	if ('requestClose' in dialog) {
		dialog.requestClose();
	} else {
		dialog.close();
	}
}
