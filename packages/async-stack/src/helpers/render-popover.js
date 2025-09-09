import { untrack, mount, unmount } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { on } from 'svelte/events';

/**
 *  @param {Element} node
 *  @param {Element} parent
 */
function moveNodeIntoParent(node, parent) {
	if ('moveBefore' in parent) {
		// @ts-expect-error not yet in baseline
		parent.moveBefore(node, null);
	} else {
		parent.insertBefore(node, null);
	}
}

/**
 * @param {HTMLElement} node
 * @param {import('../stack-item.svelte').StackItem<any>} item
 */
function setProgressAndSpeed(node, item) {
	if (item.progress === null) return;
	node.style.setProperty('--play-progress', item.progress.toString());
	node.style.setProperty('--play-speed', (1 - item.progress) * item.config.timeout + 'ms');
}

/**
 * @param {HTMLElement} node
 * @param {import('../stack-item.svelte').StackItem<any>} item
 */
function pause(node, item) {
	node.style.setProperty('--play-state', 'paused');
	item.pause();
}

/**
 * @param {HTMLElement} node
 * @param {import('../stack-item.svelte').StackItem<any>} item
 */
function resume(node, item) {
	node.style.setProperty('--play-state', 'running');
	item.resume();
}

/**
 * @param {HTMLElement} node
 * @param {import('../stack-item.svelte').StackItem<any>} item
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
 * @param {import('../stack-item.svelte').StackItem<import('svelte').Component<import('../types.public').StackItemProps<Resolved>>, Resolved>} item
 * @param {import('./render-popover').RenderPopoverOptions<Resolved>} [options]
 * @returns {import('svelte/elements').HTMLAttributes<HTMLElement>}
 */
export function renderPopover(item, options) {
	const getDialog = options?.dialog ?? findTopLevelDialog;
	const pauseOnPointerOver = options?.pauseOnPointerOver ?? true;

	return {
		popover: 'manual',
		/**
		 * @type {import('svelte/attachments').Attachment<HTMLElement>}
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
