declare module '@svelte-put/movable' {
  import type { ActionReturn } from 'svelte/action';
  /**
   * Trigger node displacement on pointerdown (via position.left & position.top)
   * @example
   *
   * Minimal usage
   *
   * ```html
   * <script>
   *   import { movable } from '@svelte-put/movable';
   * </script>
   *
   * <div use:movable>
   *   <!-- drag this div and move it freely around the screen -->
   * </div>
   * ```
   *
   * @example
   *
   * A more typical & complex usage of `movable`: move a node
   * when user clicks and on a handle; and limit the movement within
   * a certain boundary.
   *
   * ```html
   * <script lang="ts">
   *   import { movable } from '@svelte-put/movable';
   *
   *   let modal = false;
   *   let handleNode: HTMLElement;
   *   let containerNode: HTMLElement;
   * </script>
   *
   * <section bind:this={containerNode}>
   *   <!-- ... some content ... -->
   *
   *   {#if modal}
   *     <div
   *       use:movable={{
   *         limit: {
   *           delta: '20%',
   *           parent: containerNode,
   *         },
   *         handle: handleNode,
   *       }}
   *       on:movablestart={(event) => console.log('movable:start', event.detail.node, event.detail.position)}
   *       on:movableend={(event) => console.log('movable:end', event.detail.node, event.detail.position)}
   *     >
   *       <button bind:this={handleNode}>
   *          likely some 'move' icon
   *       </button>
   *
   *       <!-- ... some other modal content ... -->
   *     </div>
   *   {/if}
   *
   * </section>
   * ```
   *
   * Things that will happen in the above example:
   *
   * 1. on `pointerdown` of the handle (`button` element), a `movablestart` {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent | CustomEvent } is dispatched,
   *
   * 2. any `pointermove` event will tell `div` to move accordingly;
   *
   * 3. movement will be limited to the border of the `containerNode`, ±20% of the width & height of the `div` that the action is being used on,
   *
   * 4. `pointerup` event will stop the movement; a `movableend` {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent | CustomEvent } is dispatched.
   *
   * @remarks
   *
   * As with any svelte action, `movable` should be use with element and not component.
   *
   * ```html
   * <-- correct usage-->
   *  <div use:movable />
   *
   * <-- incorrect usage-->
   * <Component use:movable/>
   * ```
   *
   * It is recommended to use the `handle` option in {@link MovableParameters } to avoid unintended behavior.
   * If no `handle` is provided, the whole node is the handle and it might be difficult for
   * user to copy texts within the node.
   *
   * Be aware of side effects:
   *
   * - element.style.position is set to `relative` if not already 'absolute', 'relative', or 'fixed during the first time pointerdown is triggered
   *
   * - document.body.userSelect is set to `none` after `pointerdown` and restored on `pointerup`
   *
   * - document.body.cursor is set to `move` after `pointerdown` and restored on `pointerup`
   *
   * @param node - HTMLElement to be moved
   * @param param - svelte action parameters
   * */
  export function movable(node: HTMLElement, param?: MovableParameter): MovableActionReturn;
  /**
   * @typedef NormalizedLimit
   * MovableLimit interface normalized to use in runtime
   *
   *
   *
   */
  /**
   * @param delta - MovableLimit to normalize
   * */
  export function normalizeDelta(delta: MovableLimit['delta']): {
    x: NormalizedLimit;
    y: NormalizedLimit;
  };

  export function input(
    node: HTMLElement,
    param?: MovableParameter,
  ): {
    enabled: boolean;
    parent: HTMLElement | 'screen' | undefined;
    normalizedDelta: {
      x: NormalizedLimit;
      y: NormalizedLimit;
    };
    handle: HTMLElement;
    ignore: string;
    cursor: boolean;
  };
  /**
   * MovableLimit interface normalized to use in runtime
   */
  export type NormalizedLimit = {
    unit: 'px' | '%';
    value: number;
  };
  export type SpacingUnit = 'px' | '%';
  export type Axis = 'x' | 'y';
  /**
   * Deprecated, use `MovableEventDetail` instead
   */
  export type MovableEventDetails = MovableEventDetail;
  /**
   * Deprecated, use `MovableParameter` and `MovableConfig` instead
   */
  export type MovableParameters = MovableConfig;
  /**
   * Additional attributes extended from `svelte-put/intersect`
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
  interface MovableAttributes {
    'on:movablestart'?: (event: CustomEvent<MovableEventDetail>) => void;
    'on:movableend'?: (event: CustomEvent<MovableEventDetail>) => void;
  }

  /**
   * Limit by creating a bounding box of movable area `[-delta, +delta]` in both axes
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
  type MovableLimitDelta = `${number}px` | `${number}%`;

  /**
   * The limit within which node can be moved
   * */
  interface MovableLimit {
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
   * config behavior of `movable`
   * @remarks
   *
   * `movable` support reactive parameters.
   * That means they can be updated after initialization.
   */
  interface MovableConfig {
    /** whether to activate the action. Default to `true` */
    enabled?: boolean;
    /** Set a limit within which node can be moved */
    limit?: MovableLimit;
    /**
     * A node that triggers mousedown event, otherwise the node itself is the handle
     *
     * @remarks
     *
     * `handle` should be an HTMLElement not a Svelte component.
     *
     * ```html
     * <div use:movable={{ handle }}/>
     *
     * <-- correct usage-->
     * <div bind:this={handle} />
     *
     * <-- incorrect usage-->
     * <Component bind:this={handle} />
     * ```
     *
     */
    handle?: HTMLElement;
    /**
     * @deprecated use `handle` instead (same functionality, just more sensible naming)
     */
    trigger?: HTMLElement;
    /**
     * CSS selectors within the `handle` node to exclude from triggering `movable`.
     * Use this options with caution because it might affect performance.
     */
    ignore?: string | string[];
    /** automatically change cursor to `grab` on hover and `grabbing` on mousedown of `handle` */
    cursor?: boolean;
  }

  /**
   * parameter received from action input
   * */
  type MovableParameter = MovableConfig | undefined;

  /**
   * `detail` payload for `movableend` and `movablestart` {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent | CustomEvent }
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
  interface MovableEventDetail {
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

  type MovableActionReturn = ActionReturn<MovableParameter, MovableAttributes>;
}

//# sourceMappingURL=index.d.ts.map
