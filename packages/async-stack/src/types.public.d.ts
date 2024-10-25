/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component, ComponentProps } from 'svelte';

import type { StackItem } from './stack-item.svelte.js';

export interface StackItemProps<Resolved = undefined> {
	/** the stack item instance injected by the stack */
	item: Omit<StackItem<Component<StackItemProps<Resolved>>, Resolved>, '#internals'>;
}

export type ComponentResolved<UserComponent extends Component<any>> =
	ComponentProps<UserComponent> extends { item: { resolution: Promise<infer Resolved> } }
		? Resolved
		: any;

