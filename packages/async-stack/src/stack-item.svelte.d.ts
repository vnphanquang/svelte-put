/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component } from 'svelte';

import type { StackItemInstanceConfig, StackItemState } from './types.package';
import type { ComponentResolved, StackItemResolveListener } from './types.public';

export class StackItem<
	UserComponent extends Component<any>,
	Resolved = ComponentResolved<UserComponent>,
> {
	/** @default 'idle' */
	state: StackItemState;
	config: Required<StackItemInstanceConfig<string, UserComponent>>;
	/**
	 * a promise that resolves when the item is resolved,
	 * by timing out or via the .resolve method
	 */
	resolution: Promise<Resolved | undefined>;

	constructor(config: StackItemInstanceConfig<string, UserComponent>);

	/**
	 * progress of the timeout, from 0 to 1
	 * or null if item has no timeout.
	 * This property is not reactive!
	 */
	readonly progress: number | null;
	/** resume the stack item, if it has been paused */
	resume: () => void;
	/** pause the stack item, if it has a timeout */
	pause: () => void;
	/**
	 * resolve the stack item, optionally with a resolved value
	 * resolve means popping the item from the stack, and
	 * unmounting its component
	 */
	resolve: (resolved?: Resolved) => Promise<Resolved | undefined>;
	/**
	 * @experimental
	 * runs the provided callback immediately before the stack item is resolved.
	 * if the callback returns a promise, the promise will be awaited before
	 * the item is resolved. All onResolve callbacks are run in parallel.
	 *
	 * This allows you to perform cleanup or exit animation.
	 * Avoid promises that are slow to resolve!
	 * If you need to perform some operation in response to user interaction,
	 * do that either in the component (e.g. `onclick`), or after item
	 * is resolved (e.g. `await pushed.resolution`).
	 *
	 * You may also call the `cancel` method provided in the callback parameter
	 * to stop the resolution flow. Note, however, that other resolve listeners
	 * will still run to completion.
	 *
	 * This also returns a function that can be called to remove the listener.
	 *
	 * Note: this feature is experimental and may change at any time.
	 */
	onResolve: (callback: StackItemResolveListener<Resolved>) => () => void;
}
