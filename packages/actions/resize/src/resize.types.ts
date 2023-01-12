/**
 * Additional attributes extended from `svelte-put/resize`
 * @public
 *
 * @remarks
 * The ambient types for these extended attributes should be available automatically
 * whenever `svelte-put/resize` is imported.
 *
 * ```html
 * <script lang="ts">
 *   import { resize } from '@svelte-put/resize';
 * </script>
 *
 * <!-- on:resized should be typed -->
 * <div
 *   use:resize
 *   on:resized
 * />
 * ```
 */
export interface ResizeAttributes {
  'on:resized'?: (event: CustomEvent<ResizeDetail>) => void;
}

/**
 * svelte action parameters to config behavior of `resize`
 * @public
 *
 */
export interface ResizeParameters {
  /**
   * whether to activate the action. Default to `true`
   * @defaultValue true
   */
  enabled?: boolean;
  /**
   * @remarks
   * Be default, a singleton ResizeObserver is used for all actions for
   * better performance. You can use this option to create a new ResizeObserver
   * or provide your own.
   *
   * @defaultValue 'singleton'
   */
  observer?: 'singleton' | 'new' | ResizeObserver;
}

/**
 * `detail` payload for `resize` {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent | CustomEvent}
 * @public
 */
export interface ResizeDetail {
  /** the ResizeObserver itself */
  readonly observer: ResizeObserver;
  /** list of ResizeObserverEntry passed from ResizeObserver callback */
  readonly entry: ResizeObserverEntry;
}
