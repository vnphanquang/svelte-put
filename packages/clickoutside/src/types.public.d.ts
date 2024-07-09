import { ActionReturn, Action } from 'svelte/action';

/**
 * Additional attributes extended from `svelte-put/clickoutside`
 *
 * The ambient types for these extended attributes should be available automatically
 * whenever `svelte-put/clickoutside` is imported.
 *
 * ```html
 * <script lang="ts">
 *   import { clickoutside } from '@svelte-put/clickoutside';
 * </script>
 *
 * <!-- onclickoutside should be typed -->
 * <div
 *   use:clickoutside
 *   onclickoutside
 * />
 * ```
 */
export interface ClickOutsideAttributes {
	onclickoutside?: (event: CustomEvent<MouseEvent>) => void;
}

/**
 * Limit to which the click event will trigger `clickoutside`
 * Currently only the parent option is supported
 */
export interface ClickOutsideLimit {
	/** Click event beyond the `boundingRect` of this parent node will not trigger `clickoutside` */
	parent: Element;
}

/**
 * svelte action parameters to config behavior of `clickoutside`
 */
export interface ClickOutsideConfig {
	/** whether to activate the action. Default to `true` */
	enabled: boolean;
	/** limit to which the click event will trigger `clickoutside` */
	limit?: ClickOutsideLimit;
	/** event to register callback. Default to `click` */
	event?: string;
	/** options to add to `addEventListener` */
	options?: AddEventListenerOptions | boolean;
}

/**
 * parameter received from action input
 */
export type ClickOutsideParameter = Partial<ClickOutsideConfig> | undefined;
export type ClickOutsideAction = Action<Element, ClickOutsideParameter, ClickOutsideAttributes>;
export type ClickOutsideActionReturn = ActionReturn<ClickOutsideParameter, ClickOutsideAttributes>;

