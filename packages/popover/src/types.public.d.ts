import type { Action } from 'svelte/action';
import type { HTMLButtonAttributes, HTMLAttributes } from 'svelte/elements';

import type { Popover } from './popover.svelte';

export interface PopoverConfig {
	/**
	 * unique id for the control & target element pair.
	 * If not provided, a random one is generated using either
	 * crypto.randomUUID if available, or Math.random otherwise.
	 */
	id: string;
	/** whether to set `inert` on target element when it is hidden */
	inertWhenHidden: boolean;
	/** additional events to trigger target element */
	triggers: {
		/** show popover on mouse hover. Disabled by default */
		hover: TriggerConfig;
		/** show popover when control element has focus. Disabled by default */
		focus: TriggerConfig;
	},
	plugins: PopoverPlugin[];
}

export interface TriggerConfig {
	/** Whether to enable this trigger */
	enabled: boolean;
	/**
	 * Milliseconds until popover is auto-dismissed after trigger becomes invalid.
	 * Defaults to `1000`.
	 * Set to `0` to disable auto-dismiss
	 */
	timeoutMs: number;
	/**
	 * Milliseconds to delay showing popover after trigger becomes valid.
	 * Defaults to `0` (no delay).
	 */
	delayMs: number;
}

/** configuration for control element */
export interface PopoverControl {
	/** ssr-friendly attributes */
	attributes: HTMLButtonAttributes;
	/** runtime enhancements */
	actions: Action<HTMLButtonElement>;
}

/** configuration for target element */
export interface PopoverTarget {
	/** ssr-friendly attributes */
	attributes: HTMLAttributes<HTMLElement>;
	/** runtime enhancements */
	actions: Action<HTMLElement>;
}

/**
 * Plugin to extend Popover functionality.
 * @param {PopoverConfig} config - Popover "resolved" configuration
 */
export type PopoverPlugin = (config: PopoverConfig) => ({
	name?: string;
	control?: {
		attributes?: HTMLButtonAttributes;
		actions?: Action<HTMLButtonElement, Popover>[];
	};
	target?: {
		attributes?: HTMLAttributes<HTMLElement>;
		actions?: Action<HTMLElement, Popover>[];
	};
});

/** init object passed to Popover constructor  */
export type PopoverInit = Partial<Omit<PopoverConfig, 'triggers' | 'plugins'>> & {
	triggers?: {
		hover?: Partial<TriggerConfig> | boolean;
		focus?: Partial<TriggerConfig> | boolean;
	};
	plugins?: PopoverPlugin[] | PopoverPlugin;
};

