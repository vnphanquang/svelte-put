/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionReturn, Action } from 'svelte/action';

export type Turnstile = {
	render: (element: string | HTMLElement, config: TurnstileConfig) => string;
	reset: (widgetId: string) => void;
	remove: (widgetId: string) => void;
	getResponse: (widgetId: string) => string | undefined;
	isExpired: (widgetId: string) => boolean;
	execute: (container: string | HTMLElement, config?: TurnstileConfig) => void;
};

declare global {
	interface Window {
		turnstile?: Turnstile;
	}
}

export type TurnstileConfig = TurnstileDataConfig & TurnstileEventConfig;

/**
 * @package
 */
export type TurnstileDataConfig = {
	sitekey: string;
	action?: string;
	cData?: string;
	execution?: 'render' | 'execute';
	theme?: 'light' | 'dark' | 'auto';
	language?: string;
	tabindex?: number;
	'response-field'?: boolean;
	'response-field-name'?: string;
	size?: 'normal' | 'compact';
	retry?: 'auto' | 'never';
	'retry-interval'?: number;
	'refresh-expired'?: 'auto' | 'manual' | 'never' | 'auto';
	appearance?: 'always' | 'execute' | 'interaction-only';
};

/**
 * @package
 */
export type TurnstileEventConfig = {
	callback?: (token: string) => void;
	'error-callback'?: (code: string) => void;
	'expired-callback'?: () => void;
	'before-interactive-callback'?: () => void;
	'after-interactive-callback'?: () => void;
	'unsupported-callback'?: () => void;
	'timeout-callback'?: () => void;
};

/**
 * @package
 */
export type TurnstileDataAttributes = {
	[K in keyof TurnstileDataConfig as K extends string
		? `turnstile-${K}`
		: never]: TurnstileDataConfig[K];
};

export type TurnstileEventDetail<T extends Record<string, any> = Record<string, never>> = {
	widgetId: string;
	turnstile: Turnstile;
} & T;

/**
 * @package
 */
export type TurnstileEventAttributes = {
	'on:turnstile'?: (event: CustomEvent<TurnstileEventDetail<{ token: string }>>) => void;
	'on:turnstile:error'?: (event: CustomEvent<TurnstileEventDetail<{ code: string }>>) => void;
	'on:turnstile:expired'?: (event: CustomEvent<TurnstileEventDetail>) => void;
	'on:turnstile:before-interactive'?: (event: CustomEvent<TurnstileEventDetail>) => void;
	'on:turnstile:after-interactive'?: (event: CustomEvent<TurnstileEventDetail>) => void;
	'on:turnstile:unsupported'?: (event: CustomEvent<TurnstileEventDetail>) => void;
	'on:turnstile:timeout'?: (event: CustomEvent<TurnstileEventDetail>) => void;
};

export type TurnstileCustomEventName = keyof TurnstileEventAttributes extends `on:${infer K}` ? K : never;

/**
 * @see {@link https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations | Cloudflare Turnstile Docs}
 */
export type TurnstileAttributes = TurnstileDataAttributes &
	TurnstileEventAttributes & {
		/**
		 * default to `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit`
		 */
		'turnstile-script-src'?: string;
		readonly 'turnstile-widget-id'?: string;
		readonly 'turnstile-rendered'?: boolean;
	};

/**
 * parameter received from action input
 *
 */
export type TurnstileParameter = undefined;

/**  */
export type TurnstileAction = Action<HTMLElement, TurnstileParameter, TurnstileAttributes>;

/**  */
export type TurnstileActionReturn = ActionReturn<TurnstileParameter, TurnstileAttributes>;
