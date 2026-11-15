import { Component } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

import type { StackItem } from '../stack-item.svelte';
import type { StackItemProps } from '../types.public';

/**
 * Configuration options for `renderPopover`
 * Caution: changes are untracked, all options are expected
 * to be given at initialization time.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface RenderPopoverOptions<Resolved> {
	/** find the top dialog */
	dialog?: () => HTMLDialogElement | null;
	/**
	 * pause on `pointerenter`, `--play-state: paused`
	 * resume on `pointerleave`, `--play-state: running`
	 * @default true
	 */
	pauseOnPointerOver?: boolean;
}

/**
 * NOTE: This is experimental API and may change in the future.
 *
 * render the StackItem as a popover. If there is an open dialog
 * (assuming in modal mode), move the popover inside the dialog,
 * to allow proper stacking and user interaction.
 *
 * set `--play-progress` and `--play-state` CSS custom properties
 * on the element, to allow CSS animation based on timeout progress.
 *
 * `stack.actions.render` is not necessary when already using this.
 */
export function renderPopover<Resolved>(
	item: StackItem<Component<StackItemProps<Resolved>>, Resolved>,
	options?: RenderPopoverOptions<Resolved>,
): HTMLAttributes<HTMLElement>;
