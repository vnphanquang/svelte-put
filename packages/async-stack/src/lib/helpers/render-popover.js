/* eslint-disable jsdoc/reject-any-type */
import { mount, unmount, untrack } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { on } from 'svelte/events';

/** @import { Component } from 'svelte' */
/** @import { Attachment } from 'svelte/attachments' */
/** @import { HTMLAttributes } from 'svelte/elements' */
/** @import { StackItem } from '../stack-item.svelte' */
/** @import { StackItemProps } from '../types.public' */
/** @import { RenderPopoverOptions } from './render-popover' */

/**
 *  @param {Element} node
 *  @param {Element} parent
 */
function moveNodeIntoParent(node, parent) {
	if ('moveBefore' in parent) {
		parent.moveBefore(node, null);
	} else {
		// @ts-expect-error in case moveBefore is not available (not yet in baseline)
		parent.insertBefore(node, null);
	}
}

/**
 * @param {HTMLElement} node
 * @param {StackItem<any>} item
 */
function setProgressAndSpeed(node, item) {
	if (item.progress === null) return;
	node.style.setProperty('--play-progress', item.progress.toString());
	node.style.setProperty('--play-speed', (1 - item.progress) * item.config.timeout + 'ms');
}

/**
 * @param {HTMLElement} node
 * @param {StackItem<any>} item
 */
function pause(node, item) {
	node.style.setProperty('--play-state', 'paused');
	item.pause();
}

/**
 * @param {HTMLElement} node
 * @param {StackItem<any>} item
 */
function resume(node, item) {
	node.style.setProperty('--play-state', 'running');
	item.resume();
}

/**
 * @param {HTMLElement} node
 * @param {StackItem<any>} item
 * @param {() => HTMLDialogElement | null} getDialog
 * @param {Element} [originalParent]
 * @returns {boolean}
 */
function moveIntoDialogIfAny(node, item, getDialog, originalParent) {
	if (!originalParent) {
		originalParent = node.parentElement ?? document.body;
	}

	const dialog = getDialog();
	if (!dialog) return false;

	// 1. move into dialog
	moveNodeIntoParent(node, dialog);

	// 2. prevent clicks from propagating to the dialog backdrop
	const offStopPropagation = on(node, 'click', (e) => e.stopPropagation());

	// 3. on dialog close, move to the next open dialog, if any
	// otherwise move back to original parent
	const offDialogClose = on(dialog, 'close', () => {
		pause(node, item);

		if (!moveIntoDialogIfAny(node, item, getDialog, originalParent)) {
			moveNodeIntoParent(node, originalParent);
		}

		setProgressAndSpeed(node, item);
		node.showPopover();
		resume(node, item);

		offStopPropagation();
		offDialogClose();
	});

	return true;
}

/**
 * @returns {HTMLDialogElement | null}
 */
function findTopLevelDialog() {
	const el = Array.from(document.querySelectorAll('dialog:open')).pop();
	if (!el) return null;
	return /** @type {HTMLDialogElement} */ (el);
}

/**
 * @template Resolved
 * @param {StackItem<Component<StackItemProps<Resolved>>, Resolved>} item
 * @param {RenderPopoverOptions<Resolved>} [options]
 * @returns {HTMLAttributes<HTMLElement>}
 */
export function renderPopover(item, options) {
	const getDialog = options?.dialog ?? findTopLevelDialog;
	const pauseOnPointerOver = options?.pauseOnPointerOver ?? true;

	return {
		popover: 'manual',
		/**
		 * @type {Attachment<HTMLElement>}
		 */
		[createAttachmentKey()]: function (node) {
			/** @type {(() => void)[]} */
			const offs = [];
			/** @type {ReturnType<typeof mount> | null} */
			let mounted = null;

			untrack(() => {
				setProgressAndSpeed(node, item);
				pause(node, item);

				mounted = mount(item.config.component, {
					target: node,
					props: { ...item.config.props, item },
					intro: true,
				});

				// pause the timeout when hovering over the notification
				if (pauseOnPointerOver) {
					offs.push(on(node, 'pointerenter', () => pause(node, item)));
					offs.push(on(node, 'pointerleave', () => resume(node, item)));
				}

				moveIntoDialogIfAny(node, item, getDialog);

				node.showPopover();
				resume(node, item);
			});

			return () => {
				offs.forEach((off) => off());
				if (mounted) unmount(mounted);
			};
		},
	};
}
