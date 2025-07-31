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
	 * runs the provided callback immediately before the stack item is resolved.
	 * if the callback returns a promise, the promise will be awaited before
	 * the item is resolved. This allows you to perform cleanup or exit animation.
	 * Avoid promises that are slow to resolve!
	 */
	onResolve: (callback: StackItemResolveListener<Resolved>) => void;
}
