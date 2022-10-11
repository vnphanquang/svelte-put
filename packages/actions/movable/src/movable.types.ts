/**
 * Additional attributes extended from `svelte-put/intersect`
 * @public
 *
 * @remarks
 * The ambient types for these extended attributes should be available automatically
 * whenever `svelte-put/movable` is imported.
 *
 * ```html
 * <script lang="ts">
 *   import { movable } from '@svelte-put/movable';
 * </script>
 *
 * <!-- on:movablestart, on:movableend should be typed -->
 * <div
 *   use:movable
 *   on:movablestart
 *   on:movableend
 * />
 * ```
 */
export interface MovableAttributes {
  onmovablestart?: (event: CustomEvent<MovableEventDetails>) => void; // on:movablestart
  onmovableend?: (event: CustomEvent<MovableEventDetails>) => void; // on:movableend
}

/**
 * Limit by creating a bounding box of movable area `[-delta, +delta]` in both axes
 * @public
 *
 * @remarks
 *
 * - If a single value is provided, it will be applied to both axes.
 *
 * - If parent is set, the delta value is additive. It will be added beyond the parent bounds. For example, y-axis limit: `[-delta + parent.top, parent.bottom + delta]`
 *
 * - If percentage is used, it will be relative to the width / height of the **node** itself. For example, y-axis limit: `[-percentage * node.height + parent.top, parent.bottom + percentage * node.height]`
 *
 * - Currently only `px` and `%` are supported. See example for usage.
 *
 * @example
 *
 * ```html
 * <-- limit movement to [- 20% * width, + 20% * width] in x-axis and [- 20% * height, + 20% * height] in y-axis -->
 * <div use:movable={{
 *    delta: '20%',
 * }} />
 *
 * <-- use pixel unit -->
 * <div use:movable={{
 *    delta: '200px',
 * }} />
 *
 * <-- mix pixel and percentage & specific to each axis -->
 * <div use:movable={{
 *    delta: { x: 20%, y: '400px' },
 * }} />
 *
 * <-- mix complex use, added to parent border -->
 * <div use:movable={{
 *    delta: { x: 20%, y: '400px' },
 *    parent: someParentNode,
 * }} />
 *
 * ```
 */
export type MovableLimitDelta = `${number}px` | `${number}%`;

/**
 * The limit within which node can be moved
 * @public
 */
export interface MovableLimit {
  /**
   * Move node within this parent node or within screen
   */
  parent?: HTMLElement | 'screen';
  /**
   * Bounding box limit in both axes
   */
  delta?:
    | {
        x: MovableLimitDelta;
        y: MovableLimitDelta;
      }
    | MovableLimitDelta;
}

/**
 * svelte action parameters to config behavior of `movable`
 * @public
 *
 * @remarks
 *
 * `movable` support reactive parameters.
 * That means they can be updated after initialization.
 */
export interface MovableParameters {
  /** whether to activate the action. Default to `true` */
  enabled?: boolean;
  /** Set a limit within which node can be moved */
  limit?: MovableLimit;
  /**
   * A node that triggers mousedown event, otherwise the node itself is the trigger
   *
   * @remarks
   *
   * `trigger` should be an HTMLElement not a Svelte component.
   *
   * ```html
   * <div use:movable={{ trigger }}/>
   *
   * <-- correct usage-->
   * <div bind:this={trigger} />
   *
   * <-- incorrect usage-->
   * <Component bind:this={trigger} />
   * ```
   *
   */
  trigger?: HTMLElement;
  /**
   * CSS selectors within the `trigger` node to exclude from triggering `movable`.
   * Use this options with caution because it might affect performance.
   */
  ignore?: string | string[];
}

/**
 * `detail` payload for `movableend` and `movablestart` {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent | CustomEvent }
 * @public
 *
 * @example
 *
 * ```html
 * <script>
 *  function handler(event) {
 *    const { position, node } = event.detail;
 *    console.log('action movable was used on element', node);
 *    console.log('last known position:', position);
 * }
 * </script>
 *
 * <div
 *  use:movable
 *  on:movablestart={handler}
 *  on:movableend={handler}
 * />
 * ```
 */
export interface MovableEventDetails {
  /** the node that the action was placed on */
  node: HTMLElement;
  /** last known position, as in styles.position */
  position: {
    /** styles.position.left */
    left: number;
    /** styles.position.right */
    top: number;
  };
}
