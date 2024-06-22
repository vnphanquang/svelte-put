/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component, ComponentProps } from 'svelte';
import { ActionReturn } from 'svelte/action';

import type { StackItem } from './stack-item.svelte.js';

export declare type StackItemProps<Resolved> = {
	/** the stack item instance injected by the stack */
	item: Omit<StackItem<import('svelte').Component<StackItemProps<Resolved>>>, '#internals'>;
};

export type ComponentResolved<UserComponent extends Component> =
	ComponentProps<UserComponent> extends StackItemProps<infer Resolved>
		? Resolved
		: any;

export type StackItemCommonConfig<
	Variant extends string,
	UserComponent extends Component,
> = {
	/**
	 * milliseconds to wait and automatically pop the stack item.
	 * Defaults to `0` (disabled)
	 */
	timeout?: number;
	/**
	 * id generator for stack items. Defaults to 'uuid'
	 *
	 *   - counter: use an auto-incremented counter that is scoped to the
	 *   - uuid: use `crypto.randomUUID()`, fallback to `counter` if not available
	 *   - callback: a custom function that accepts {@link StackItemInstanceConfig} and returns a string as the id
	 */
	id?:
		| 'counter'
		| 'uuid'
		| ((
				config: Required<Omit<StackItemInstanceConfig<Variant, UserComponent>, 'id'>>,
		  ) => string);
};

/** predefined variant config provided while building a {@link Stack} instance */
export type StackItemVariantConfig<
	Variant extends string,
	UserComponent extends Component,
> = StackItemCommonConfig<Variant, UserComponent> & {
	/** string variant representing this config, must be unique within a {@link Stack} instance  */
	variant: Variant;
	/** any Svelte component used for rendering stack item UI */
	component: UserComponent;
	/** inferred props from `component` */
	props?: Omit<ComponentProps<UserComponent>, 'item'>;
};

/** a resolved config for a {@link StackItemInstance} */
export type StackItemInstanceConfig<
	Variant extends string,
	UserComponent extends Component,
> = Required<Omit<StackItemVariantConfig<Variant, UserComponent>, 'id'>> & {
	id: string;
	timeout: number;
};

export type StackItemState = 'idle' | 'elapsing' | 'paused' | 'timeout' | 'resolved';

export type StackItemByVariantPushConfig<
	Variant extends string,
	UserComponent extends Component,
> = StackItemCommonConfig< Variant, UserComponent> & {
	props?: Omit<ComponentProps<UserComponent>, 'item'>;
};

export type StackItemCustomPushConfig<
	UserComponent extends Component,
> = StackItemCommonConfig<'custom', UserComponent> & {
	component: UserComponent;
	props?: Omit<ComponentProps<UserComponent>, 'item'>;
};

export type StackItemPopVerboseInput <
	UserComponent extends Component,
>= {
	id?: string;
	resolved?: ComponentResolved<UserComponent>;
};

export type StackItemRenderActionReturn = ActionReturn<StackItem<any>>;

