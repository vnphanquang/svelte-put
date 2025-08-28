/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component } from 'svelte';

import type { StackItem } from './stack-item.svelte';
import type {
	StackItemByVariantPushConfig,
	StackItemCommonConfig,
	StackItemCustomPushConfig,
	StackItemPopVerboseInput,
	StackItemRenderActionReturn,
} from './types.package';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export class Stack<VariantMap extends Record<string, Component<any>> = {}> {
	/** stack items */
	items: StackItem<any>[];
	/** global config applied to the entire stack by default */
	config: StackItemCommonConfig<string, Component<any>>;
	actions: {
		/** register the element to render a stack item into */
		render: (node: HTMLElement, item: StackItem<any>) => StackItemRenderActionReturn;
	};

	constructor(
		variantConfigMap: Record<keyof VariantMap, StackItemCommonConfig<string, Component<any>>>,
		init?: StackItemCommonConfig<string, Component<any>>,
	);

	/** push a pre-defined variant to the stack */
	push<
		Variant extends Extract<keyof VariantMap, string>,
		UserComponent extends Component<any> = VariantMap[Variant],
	>(
		variant: Variant,
		config?: StackItemByVariantPushConfig<Variant, UserComponent>,
	): StackItem<UserComponent>;
	/** push a custom item to the stack; requires a `component` property in the config */
	push<UserComponent extends Component<any>>(
		variant: 'custom',
		config: StackItemCustomPushConfig<UserComponent>,
	): StackItem<UserComponent>;

	pop<UserComponent extends Component<any> = Component<any>>(
		id?: string,
		detail?: any,
	): StackItem<UserComponent> | null;
	pop<UserComponent extends Component<any> = Component<any>>(
		config?: StackItemPopVerboseInput<UserComponent>,
	): StackItem<UserComponent> | null;

	/**
	 * pause a stack item, if it has a timeout. If no `id` is provided,
	 * will pause all stack items with a timeout
	 */
	pause(id?: string): void;

	/**
	 * resume a stack item, if it has been paused. If no `id` is provided,
	 * will resume all stack items with a timeout
	 */
	resume(id?: string): void;
}
