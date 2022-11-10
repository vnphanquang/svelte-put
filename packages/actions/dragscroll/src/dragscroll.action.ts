import type { DragScrollParameters } from './dragscroll.types';

/**
 * @public
 *
 * @param node - node to apply the action
 * @param parameters - instructions for customizing action behavior
 * @returns
 */
export function dragscroll(node: HTMLElement, parameters: DragScrollParameters = {}) {
  // add support for each/both axis;
  let isDown = false;
  let startX: number;
  let scrollLeft: number;
  let { enabled = true } = parameters;

  function handlePointerDown(e: PointerEvent) {
    isDown = true;
    startX = e.pageX - node.offsetLeft;
    scrollLeft = node.scrollLeft;
  }

  function handlePointerUpAndLeave() {
    isDown = false;
  }

  function handlePointerMove(e: PointerEvent) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - node.offsetLeft;
    const walk = x - startX;
    node.scrollLeft = scrollLeft - walk;
  }

  function addEvents(node: HTMLElement) {
    node.addEventListener('pointerdown', handlePointerDown);
    node.addEventListener('pointerleave', handlePointerUpAndLeave);
    node.addEventListener('pointerup', handlePointerUpAndLeave);
    node.addEventListener('pointermove', handlePointerMove);
  }

  function removeEvents(node: HTMLElement) {
    node.removeEventListener('pointerdown', handlePointerDown);
    node.removeEventListener('pointerleave', handlePointerUpAndLeave);
    node.removeEventListener('pointerup', handlePointerUpAndLeave);
    node.removeEventListener('pointermove', handlePointerMove);
  }

  if (enabled) {
    addEvents(node);
  }

  return {
    update(update: DragScrollParameters = {}) {
      const newUpdate = update.enabled ?? true;
      if (enabled && !newUpdate) removeEvents(node);
      if (!enabled && newUpdate) addEvents(node);
      enabled = newUpdate;
    },
    destroy() {
      removeEvents(node);
    },
  };
}
