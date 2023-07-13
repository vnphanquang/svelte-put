import { ActionReturn, Action } from 'svelte/action';

/**
 * Additional attributes extended from `svelte-put/clickoutside`
 * @public
 *
 * @remarks
 * The ambient types for these extended attributes should be available automatically
 * whenever `svelte-put/clickoutside` is imported.
 *
 * ```html
 * <script lang="ts">
 *   import { clickoutside } from '@svelte-put/clickoutside';
 * </script>
 *
 * <!-- on:clickoutside should be typed -->
 * <div
 *   use:clickoutside
 *   on:clickoutside
 * />
 * ```
 */
export interface ClickOutsideAttributes {
  'on:clickoutside'?: (event: CustomEvent<MouseEvent>) => void;
}

/**
 * Limit to which the click event will trigger `clickoutside`
 * @public
 *
 * @remarks
 * Currently only the parent option is supported
 */
export interface ClickOutsideLimit {
  /** Click event beyond the `boundingRect` of this parent node will not trigger `clickoutside` */
  parent: HTMLElement;
}

/**
 * svelte action parameters to config behavior of `clickoutside`
 * @public
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
 * @public
 */
export type ClickOutsideParameter = Partial<ClickOutsideConfig> | undefined;

/** @public */
export type ClickOutsideAction = Action<HTMLElement, ClickOutsideParameter, ClickOutsideAttributes>;

/** @public */
export type ClickOutsideActionReturn = ActionReturn<ClickOutsideParameter, ClickOutsideAttributes>;
