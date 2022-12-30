// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Action, ActionReturn } from 'svelte/action';

import type { DragScrollParameters } from './dragscroll.types';

/**
 * @internal
 */
function resolveParameters(parameters: Partial<DragScrollParameters> = {}) {
  const { cursor = true, enabled = true, axis = 'x', event = 'pointer' } = parameters;
  return {
    enabled,
    axes: {
      x: axis === 'x' || axis === 'both',
      y: axis === 'y' || axis === 'both',
    },
    events: {
      down: event === 'pointer' ? ('pointerdown' as const) : ('mousedown' as const),
      up: event === 'pointer' ? ('pointerup' as const) : ('mouseup' as const),
      move: event === 'pointer' ? ('pointermove' as const) : ('mousemove' as const),
      leave: event === 'pointer' ? ('pointerleave' as const) : ('mouseleave' as const),
    },
    cursor,
  };
}

/**
 * svelte action `use:dragscroll` for adding 'drag-to-scroll' behavior
 * @public
 *
 * @param node - node to apply the action
 * @param parameters - instructions for customizing action behavior
 * @returns svelte {@link ActionReturn}
 */
export const dragscroll: Action<HTMLElement, Partial<DragScrollParameters>> = function (
  node,
  parameters = {},
) {
  let isDown = false;
  let startX: number;
  let startY: number;
  let scrollLeft: number;
  let scrollTop: number;
  let { enabled, axes, events, cursor } = resolveParameters(parameters);

  function handlePointerDown(e: PointerEvent | MouseEvent) {
    changeCursor(true);
    isDown = true;
    startX = e.pageX - node.offsetLeft;
    scrollLeft = node.scrollLeft;
    startY = e.pageY - node.offsetTop;
    scrollTop = node.scrollTop;
  }

  function handlePointerUpAndLeave() {
    changeCursor();
    isDown = false;
  }

  function handlePointerMove(e: PointerEvent | MouseEvent) {
    if (!isDown) return;
    e.preventDefault();
    if (axes.x) {
      const x = e.pageX - node.offsetLeft;
      const walkX = x - startX;
      node.scrollLeft = scrollLeft - walkX;
    }
    if (axes.y) {
      const y = e.pageY - node.offsetTop;
      const walkY = y - startY;
      node.scrollTop = scrollTop - walkY;
    }
  }

  function addEvents() {
    if (!node) return;
    node.addEventListener(events.down, handlePointerDown);
    node.addEventListener(events.leave, handlePointerUpAndLeave);
    node.addEventListener(events.up, handlePointerUpAndLeave);
    node.addEventListener(events.move, handlePointerMove);
  }

  function removeEvents() {
    if (!node) return;
    node.removeEventListener(events.down, handlePointerDown);
    node.removeEventListener(events.leave, handlePointerUpAndLeave);
    node.removeEventListener(events.up, handlePointerUpAndLeave);
    node.removeEventListener(events.move, handlePointerMove);
  }

  function changeCursor(active = false) {
    if (!node) return;
    if (cursor) {
      node.style.cursor = active ? 'grabbing' : 'grab';
    } else {
      node.style.removeProperty('cursor');
    }
  }

  if (enabled) {
    changeCursor();
    addEvents();
  }

  return {
    update(update = {}) {
      removeEvents();
      ({ enabled, axes, events, cursor } = resolveParameters(update));
      changeCursor();
      addEvents();
    },
    destroy() {
      removeEvents();
    },
  };
};
