import { Component } from 'svelte';
import type { HTMLDialogAttributes } from 'svelte/elements';

import type { StackItem } from '../stack-item.svelte';
import type { StackItemProps } from '../types.public';

/**
 * Configuration options for `enhanceDialog`
 */
export interface EnhanceDialogOptions<Resolved> {
	/**
	 * default value for parameter passed to `dialog.requestClose`,
	 * helpful to capture method="dialog" form / inputs without the need for additional JavaScript
	 * (click on backdrop, for example)
	 */
	defaultReturnValue?: Resolved;
	/** helpful for exit animation and such */
	delayResolution?: 'animationend';
	/**
	 * when `true`, all `item.resolve` or `dialog.requestClose` will take no effect
	 * this is helpful to prevent user from accidentally closing the dialog when there is a
	 * long-running operation underway. If this is your use case, however, consider using a separate
	 * page instead of a dialog for better user experience.
	 */
	preventResolution?: boolean;
}

/**
 * NOTE: This is experimental API and may change in the future.
 *
 * enhance an `HTMLDialogElement` when used as component for `StackItem`. This will:
 * 1. call `showModal()` on the dialog is mounted,
 * 2. capture `form.returnValue` when integrated with method="dialog" form / inputs,
 * 3. close the dialog when backdrop is clicked.
 *
 * if you need to manually close the dialog, call `item.resolve()`
 */
export function enhanceDialog<Resolved>(
	item: StackItem<Component<StackItemProps<Resolved>>, Resolved>,
	options?: EnhanceDialogOptions<Resolved>,
): HTMLDialogAttributes;
