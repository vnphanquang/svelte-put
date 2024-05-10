import { ActionReturn, Action } from 'svelte/action';

/**
 * instruction for how `use:dragscroll` will behave
 *
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
 *
 */
export type DragScrollParameter = Partial<DragScrollConfig> | undefined;

/**  */
export type DragScrollAction = Action<HTMLElement, DragScrollParameter>;

/**  */
export type DragScrollActionReturn = ActionReturn<DragScrollParameter>;
