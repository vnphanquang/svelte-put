import { ActionReturn, Action } from 'svelte/action';

/**
 * instruction for how `use:dragscroll` will behave
 * @public
 */
export interface DragScrollConfig {
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
 * @public
 */
export type DragScrollParameter = Partial<DragScrollConfig> | undefined;

/** @public */
export type DragScrollAction = Action<HTMLElement, DragScrollParameter>;

/** @public */
export type DragScrollActionReturn = ActionReturn<DragScrollParameter>;
