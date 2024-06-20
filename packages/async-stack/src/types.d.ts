/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Component, ComponentProps } from 'svelte';
import { ActionReturn } from 'svelte/action';

import type { Notification } from './notification.svelte.js';

export type NotificationCommonConfig<
	Resolved,
	Variant extends string,
	UserComponent extends Component,
> = {
	/**
	 * milliseconds to wait and automatically pop the notification.
	 * Defaults to `3000`. Set to 0 to disable
	 */
	timeout?: number;
	/**
	 * id generator for notifications. Defaults to 'uuid'.
	 *
	 *   - counter: use an auto-incremented counter that is scoped to the controller
	 *   - uuid: use `crypto.randomUUID()`, fallback to `counter` if not available
	 *   - callback: a custom function that accepts {@link NotificationInstanceConfig} and returns a string as the id
	 */
	id?:
		| 'counter'
		| 'uuid'
		| ((config: Required<Omit<NotificationInstanceConfig<Resolved, Variant, UserComponent>, 'id'>>) => string);
};

export declare type NotificationProps<Resolved> = {
	/** the notification instance injected by the notification controller */
	notification: Omit<Notification<Resolved>, '#internals'>;
}

/** predefined variant config provided while building a {@link Noti} instance */
export type NotificationVariantConfig<
	Resolved,
	Variant extends string,
	UserComponent extends Component,
> = NotificationCommonConfig<Resolved, Variant, UserComponent> & {
	/** string variant representing this config, must be unique within a {@link Noti} instance  */
	variant: Variant;
	/** any Svelte component used for rendering notification UI */
	component: UserComponent;
	/** inferred props from `component` */
	props?: Omit<ComponentProps<UserComponent>, 'notification'>;
};

/** a resolved config for a {@link NotificationInstance} */
export type NotificationInstanceConfig<
	Resolved,
	Variant extends string,
	UserComponent extends Component,
> = Required<Omit<NotificationVariantConfig<Resolved, Variant, UserComponent>, 'id'>> & {
	id: string;
	timeout: number;
};

export type NotificationState = 'idle' | 'elapsing' | 'paused' | 'timeout' | 'resolved';

export type NotificationByVariantPushConfig<
	Resolved,
	Variant extends string,
	UserComponent extends Component,
> = NotificationCommonConfig<Resolved, Variant, UserComponent> & {
	props?: Omit<ComponentProps<UserComponent>, 'notification'>;
};

export type NotificationCustomPushConfig<
	Resolved,
	UserComponent extends Component,
> = NotificationCommonConfig<Resolved, 'custom', UserComponent> & {
	component: UserComponent;
	props?: Omit<ComponentProps<UserComponent>, 'notification'>;
};

export type NotificationPopVerboseInput = {
	id?: string;
	resolved?: any;
};

export type NotificationPortalAttributes = {
	onnotipush?: (event: CustomEvent<Notification<any>>) => void;
	onnotipop?: (event: CustomEvent<Notification<any>>) => void;
};

export type NotificationPortalActionReturn = ActionReturn<Notification<any>, NotificationPortalAttributes>;
