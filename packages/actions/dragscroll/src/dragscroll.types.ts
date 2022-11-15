/**
 * instruction for how `use:dragscroll` will behave
 * @public
 */
export interface DragScrollParameters {
  /** whether to run this action */
  enabled: boolean;
  /** scrolling axis */
  axis: 'x' | 'y' | 'both';
  /** `MouseEvent` or `PointerEvent` (`down`, `up`, `leave`, `move`) */
  event: 'mouse' | 'pointer';
  /** automatically change cursor to `grab` on hover and `grabbing` on mousedown */
  cursor: boolean;
}
