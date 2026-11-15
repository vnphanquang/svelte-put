import { createAttachmentKey } from 'svelte/attachments';
import { on } from 'svelte/events';

/** @import { Component } from 'svelte' */
/** @import { Attachment } from 'svelte/attachments' */
/** @import { HTMLDialogAttributes } from 'svelte/elements' */
/** @import { StackItem } from '../stack-item.svelte' */
/** @import { StackItemProps, StackItemResolveListener } from '../types.public' */
/** @import { EnhanceDialogOptions } from './enhance-dialog' */

/**
 * @template Resolved
 * @param {StackItem<Component<StackItemProps<Resolved>>, Resolved>} item
 * @param {EnhanceDialogOptions<Resolved>} [options]
 * @returns {HTMLDialogAttributes}
 */
export function enhanceDialog(item, options) {
	return {
		/** @type {Attachment<HTMLDialogElement>} */
		[createAttachmentKey()]: function (dialog) {
			if (!dialog.open) dialog.showModal();
			/** @type {(() => void)[]} */
			const offs = [];

			// set up listener when user calls item.resolve manually
			/** @type {undefined | (() => void)}  */
			let resumeResolution = undefined;
			/** @type {StackItemResolveListener<Resolved>} */
			const onResolve = ({ cancel }) => {
				if (options?.preventResolution) return cancel();
				return new Promise((resolvePromise) => {
					if (dialog.open) {
						// user calls `item.resolve(...)`
						dialog.removeEventListener('close', onclose);
						if ('requestClose' in dialog) {
							dialog.requestClose();
						} else {
							// @ts-expect-error in case requestClose is not available in older browser versions
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
			offs.push(on(dialog, 'pointerdown', onpointer));
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
function onpointer(event) {
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
		// only register clickbackdrop if both pointerdown and pointerup
		// are outside the dialog
		if (event.type === 'pointerdown') {
			const off = on(dialog, 'pointerup', (e) => {
				off();
				onpointer(e);
			});
		} else if (event.type === 'pointerup') {
			dialog.dispatchEvent(new CustomEvent('clickbackdrop'));
		}
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
		// @ts-expect-error in case requestClose is not available in older browser versions
		dialog.close();
	}
}
