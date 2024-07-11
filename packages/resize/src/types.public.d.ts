import { ActionReturn, Action } from 'svelte/action';

/**
 * Additional attributes extended from `svelte-put/resize`
 *
 *
 *
 * The ambient types for these extended attributes should be available automatically
 * whenever `svelte-put/resize` is imported.
 *
 * ```html
 * <script lang="ts">
 *   import { resize } from '@svelte-put/resize';
 * </script>
 *
 * <!-- onresized should be typed -->
 * <div
 *   use:resize
 *   onresized
 * />
 * ```
 */
export interface ResizeAttributes {
	onresized?: (event: CustomEvent<ResizeDetail>) => void;
}

/** config behavior of `resize` */
export interface ResizeConfig {
	/**
	 * whether to activate the action. Default to `true`
	 * @default true
	 */
	enabled?: boolean;
	/**
	 * Be default, a singleton ResizeObserver is used for all actions for
	 * better performance. You can use this option to create a new ResizeObserver
	 * or provide your own.
	 * @default 'singleton'
	 */
	observer?: 'singleton' | 'new' | ResizeObserver;

	/**
	 * Options passed to {@link https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe#options | ResizeObserver.observe}
	 * @default undefined
	 */
	options?: ResizeObserverOptions;
}

/**
 * parameter received from action input
 */
export type ResizeParameter = ResizeConfig | undefined;

/**
 * `detail` payload for `resize` {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent | CustomEvent}
 */
export interface ResizeDetail {
	/** the ResizeObserver itself */
	readonly observer: ResizeObserver;
	/** list of ResizeObserverEntry passed from ResizeObserver callback */
	readonly entry: ResizeObserverEntry;
}

export type ResizeAction = Action<Element, ResizeParameter, ResizeAttributes>;
export type ResizeActionReturn = ActionReturn<ResizeParameter, ResizeAttributes>;

