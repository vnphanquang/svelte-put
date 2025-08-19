/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component, ComponentProps } from 'svelte';

import type { StackItem } from './stack-item.svelte.js';

export interface StackItemProps<Resolved = undefined> {
	/** the stack item instance injected by the stack */
	item: StackItem<Component<StackItemProps<Resolved>>, Resolved>;
}

export type ComponentResolved<UserComponent extends Component<any>> =
	ComponentProps<UserComponent> extends { item: { resolution: Promise<infer Resolved> } }
		? Resolved
		: any;

export type StackItemResolveListener<Resolved> = (event: {
	/** the resolved parameter passed to `item.resolve` */
	resolved?: Resolved;
	/**
	 * if called will cancel the resolution flow.
	 * Note, however, other resolve listeners will still run to completion.
	 */
	cancel: () => void;
}) => void | Promise<void> | PromiseLike<void>;
