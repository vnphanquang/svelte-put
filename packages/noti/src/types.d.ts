/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SvelteComponent, ComponentType, ComponentProps } from 'svelte';
import { ActionReturn } from 'svelte/action';

import type { Notification } from './notification.svelte.js';

type NotificationCommonConfig<
	Resolved,
	Variant extends string,
	Component extends SvelteComponent<NotificationProps<Resolved>>,
> = {
	/**
	 * milliseconds to wait and automatically pop the notification.
	 * Defaults to `3000`. Set to 0 to disable
	 */
	timeout?: number;
	/**
	 * id generator for notifications. Defaults to 'uuid'.
	 *
	 *   - counter: use an auto-incremented counter that is scoped to the store
	 *   - uuid: use `crypto.randomUUID()`, fallback to `counter` if not available
	 *   - callback: a custom function that accepts {@link NotificationInstanceConfig} and returns a string as the id
	 */
	id?:
		| 'counter'
		| 'uuid'
		| ((config: Required<Omit<NotificationInstanceConfig<Resolved, Variant, Component>, 'id'>>) => string);
};

type NotificationProps<Resolved> = {
	notification: Omit<Notification<Resolved>, '#internals'>;
}

/** predefined variant config provided while building a {@link Noti} instance */
type NotificationVariantConfig<
	Resolved,
	Variant extends string,
	Component extends SvelteComponent<NotificationProps<Resolved>>,
> = NotificationCommonConfig<Resolved, Variant, Component> & {
	/** string variant representing this config, must be unique within a {@link Noti} instance  */
	variant: Variant;
	/** any Svelte component used for rendering notification UI */
	component: ComponentType<Component>;
	/** inferred props from `component` */
	props?: Omit<ComponentProps<Component>, 'notification'>;
};

/** a resolved config for a {@link NotificationInstance} */
type NotificationInstanceConfig<
	Resolved,
	Variant extends string,
	Component extends SvelteComponent<NotificationProps<Resolved>>,
> = Required<Omit<NotificationVariantConfig<Resolved, Variant, Component>, 'id'>> & {
	id: string;
	timeout: number;
};

type NotificationState = 'idle' | 'elapsing' | 'paused' | 'timeout' | 'resolved';

type NotificationByVariantPushConfig<
	Resolved,
	Variant extends string,
	Component extends SvelteComponent<NotificationProps<Resolved>>,
> = NotificationCommonConfig<Resolved, Variant, Component> & {
	props?: Omit<ComponentProps<Component>, 'notification'>;
};

type NotificationCustomPushConfig<
	Resolved,
	Component extends SvelteComponent<NotificationProps<Resolved>>,
> = NotificationCommonConfig<Resolved, 'custom', Component> & {
	component: ComponentType<Component>;
	props?: Omit<ComponentProps<Component>, 'notification'>;
};

type NotificationPopVerboseInput = {
	id?: string;
	resolved?: any;
};

type NotificationPortalAttributes = {
	onnotipush?: (event: CustomEvent<Notification<any>>) => void;
	onnotipop?: (event: CustomEvent<Notification<any>>) => void;
};

type NotificationPortalActionReturn = ActionReturn<Notification<any>, NotificationPortalAttributes>;
