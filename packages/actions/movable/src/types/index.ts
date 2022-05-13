/**
 * Limit by creating a bounding box of movable area [-delta, +delta] in both axes
 * @public
 *
 * @remarks
 *
 * - If a single value is provided, it will be applied to both axes.
 * - If parent is set, the delta value is additive. It will be added beyond the parent bounds.
 * For example, for y-axis [-delta + parent.top, parent.bottom + delta].
 * - If percentage is used, it will be relative to the width / height of the **node** itself.
 * - Currently only `px` and `%` are supported. See example for usage.
 *
 * @example
 *
 * ```svelte
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
 * <-- mix pixel and percentage -->
 * <div use:movable={{
 *    delta: { x: 20%, y: '400px' },
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
   * Move node within this parent node
   */
  parent?: HTMLElement;
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
 * @public
 *
 * svelte action parameters to config behavior of movable
 *
 * @remarks
 *
 * `movable` support reactive parameters.
 * That means they can be updated after initialization.
 */
export interface MovableParameters {
  /** whether to trigger the action */
  enabled?: boolean;
  /** Set a limit within which node can be moved */
  limit?: MovableLimit;
  /**
   * A node that triggers mousedown event, otherwise the node itself is the trigger
   *
   * @remarks
   *
   * Trigger should be an HTMLElement not a Svelte component.
   *
   * ```svelte
   * <div use:movable={{ trigger }}/>
   *
   * <-- correct usage-->
   *  <div bind:this={trigger} />
   *
   * <-- incorrect usage-->
   * <Component bind:this={trigger} />
   * ```
   *
   */
  trigger?: HTMLElement;
}

/**
 * `detail` payload for `movableend` and `movablestart` CustomEvent
 * @public
 *
 * @example
 *
 * ```svelte
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
