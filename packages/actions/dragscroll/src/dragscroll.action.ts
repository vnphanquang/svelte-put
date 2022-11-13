import type { DragScrollParameters } from './dragscroll.types';

/**
 * @internal
 */
function resolveParameters(parameters: Partial<DragScrollParameters> = {}) {
  const { enabled = true, axis = 'x', event = 'pointer' } = parameters;
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
  };
}

/**
 * svelte action `use:dragscroll` for adding 'drag-to-scroll' behavior
 * @public
 *
 * @param node - node to apply the action
 * @param parameters - instructions for customizing action behavior
 * @returns
 */
export function dragscroll(node: HTMLElement, parameters: Partial<DragScrollParameters> = {}) {
  let isDown = false;
  let startX: number;
  let startY: number;
  let scrollLeft: number;
  let scrollTop: number;
  let { enabled, axes, events } = resolveParameters(parameters);

  function handlePointerDown(e: PointerEvent | MouseEvent) {
    isDown = true;
    startX = e.pageX - node.offsetLeft;
    scrollLeft = node.scrollLeft;
    startY = e.pageY - node.offsetTop;
    scrollTop = node.scrollTop;
  }

  function handlePointerUpAndLeave() {
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

  function addEvents(node?: HTMLElement) {
    if (node) {
      node.addEventListener(events.down, handlePointerDown);
      node.addEventListener(events.leave, handlePointerUpAndLeave);
      node.addEventListener(events.up, handlePointerUpAndLeave);
      node.addEventListener(events.move, handlePointerMove);
    }
  }

  function removeEvents(node?: HTMLElement) {
    if (node) {
      node.removeEventListener(events.down, handlePointerDown);
      node.removeEventListener(events.leave, handlePointerUpAndLeave);
      node.removeEventListener(events.up, handlePointerUpAndLeave);
      node.removeEventListener(events.move, handlePointerMove);
    }
  }

  if (enabled) {
    addEvents(node);
  }

  return {
    update(update: Partial<DragScrollParameters> = {}) {
      removeEvents(node);
      ({ enabled, axes, events } = resolveParameters(update));
      addEvents(node);
    },
    destroy() {
      removeEvents(node);
    },
  };
}
