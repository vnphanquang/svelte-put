declare module '@svelte-put/dragscroll' {
  import type { ActionReturn } from 'svelte/action';
  export function resolveConfig(param?: DragScrollParameter): {
    enabled: boolean;
    axes: {
      x: boolean;
      y: boolean;
    };
    events: {
      down: 'mousedown' | 'pointerdown';
      up: 'mouseup' | 'pointerup';
      move: 'mousemove' | 'pointermove';
      leave: 'mouseleave' | 'pointerleave';
    };
    cursor: boolean;
  };
  /**
   * svelte action `use:dragscroll` for adding 'drag-to-scroll' behavior
   * @param node - node to apply the action
   * @param param - instructions for customizing action behavior
   * */
  export function dragscroll(
    node: HTMLElement,
    param?: DragScrollParameter,
  ): DragScrollActionReturn;
  /**
   * Deprecated, use `DragScrollParameter` and `DragScrollConfig` instead
   */
  export type DragScrollParameters = DragScrollConfig;
  /**
   * instruction for how `use:dragscroll` will behave
   * */
  interface DragScrollConfig {
    /** whether to run this action */
    enabled: boolean;
    /** scrolling axis */
    axis: 'x' | 'y' | 'both';
    /** `MouseEvent` or `PointerEvent` (`down`, `up`, `leave`, `move`) */
    event: 'mouse' | 'pointer';
    /** automatically change cursor to `grab` on hover and `grabbing` on mousedown */
    cursor: boolean;
  }

  /**
   * parameter received from action input
   * */
  type DragScrollParameter = Partial<DragScrollConfig> | undefined;

  type DragScrollActionReturn = ActionReturn<DragScrollParameter>;
}

//# sourceMappingURL=index.d.ts.map
