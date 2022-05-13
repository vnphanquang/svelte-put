import type { MovableEventDetails, MovableParameters } from './types';
import { input } from './utils';

/**
 * Trigger node displacement on mousedown (via position.left & position.top)
 * @public
 *
 * @param node - HTMLElement to be moved
 * @param parameters - svelte action parameters
 * @returns svelte action interface
 *
 * @remarks
 *
 * `movable` should be use with element not svelte component
 *
 * ```svelte
 * <-- correct usage-->
 *  <div use:movable />
 *
 * <-- incorrect usage-->
 * <Component use:movable/>
 * ```
 *
 *
 * Be aware of side effects:
 *
 * - element.style.position is set to `relative` (if not already 'absolute' / 'relative') the first time mousedown is triggered
 *
 * - document.body.userSelect is set to `none` after `mousedown` and restored on `mouseup`
 *
 * - document.body.cursor is set to `move` after `mousedown` and restored on `mouseup`
 *
 * @example Typical usage
 *
 * 1. `mousedown` of the trigger `button` element, a `CustomEvent` `movablestart`is dispatched,
 *
 * 2. `mousemove` will trigger `div` to move accordingly;
 *
 * 3. movement will be limited to the border of the `containerNode`, plus and minus 20% of the width & height of the `div` that the action is being used on,
 *
 * 4. `mouseup` will stop the movement; a `CustomEvent` `movableend` is dispatched.
 *
 * ```svelte
 * <script lang="ts">
 *   import { fade } from 'svelte/transition'
 *   import arrows from 'svelte-awesome/icons/arrows';
 *   import Icon from 'svelte-awesome/components/Icon.svelte';
 *
 *   let modal = false;
 *   let triggerNode: HTMLElement;
 *   let containerNode: HTMLElement;
 * </script>
 *
 * <container>
 *   <!-- ... some other content ... -->
 *
 *   {#if modal}
 *     <div
 *       transition:fade={{ duration: 200 }}
 *       class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full max-w-sm"
 *       use:movable={{
 *         limit: {
 *           delta: '20%',
 *           parent: containerNode,
 *         },
 *         trigger: triggerNode,
 *       }}
 *       on:movablestart={(event) => console.log('movable:start', event.detail.node, event.detail.position)}
 *       on:movableend={(event) => console.log('movable:end', event.detail.node, event.detail.position)}
 *     >
 *       <button
 *         bind:this={triggerNode}
 *         class="c-btn-icon absolute top-2 right-10 hover:cursor-move"
 *       >
 *         <Icon data={arrows} />
 *       </button>
 *
 *       <!-- ... some other modal content ... -->
 *     </div>
 * {/if}
 *
 * </container>
 * ```
 *
 */
export function movable(
  node: HTMLElement,
  parameters: Partial<MovableParameters> = { enabled: true },
) {
  let { parent, normalizedDelta, trigger, enabled } = input(node, parameters);

  const lastMousePosition = { x: 0, y: 0 };
  const lastNodePosition = { top: 0, left: 0 };
  let ΣΔx = 0; // total displacement in x-axis
  let ΣΔy = 0; // total displacement in y-axis

  const updateLastMousePosition = (event: MouseEvent) => {
    lastMousePosition.x = event.clientX;
    lastMousePosition.y = event.clientY;
  };

  const updateLastNodePosition = ({ top, left }: typeof lastNodePosition) => {
    lastNodePosition.top = top;
    lastNodePosition.left = left;
  };

  const onMouseMove = (event: MouseEvent) => {
    const Δx = event.clientX - lastMousePosition.x;
    const Δy = event.clientY - lastMousePosition.y;
    updateLastMousePosition(event);

    let top = lastNodePosition.top + Δy;
    let left = lastNodePosition.left + Δx;

    const nodeBoundingRect = node.getBoundingClientRect();
    let boundX = 0;
    switch (normalizedDelta.x.unit) {
      case '%':
        boundX = (normalizedDelta.x.value * nodeBoundingRect.width) / 100;
        break;
      case 'px':
        boundX = normalizedDelta.x.value;
        break;
    }

    let boundY = 0;
    switch (normalizedDelta.y.unit) {
      case '%':
        boundY = (normalizedDelta.y.value * nodeBoundingRect.height) / 100;
        break;
      case 'px':
        boundY = normalizedDelta.y.value;
        break;
    }

    if (parent) {
      const insideBoundingRect = parent.getBoundingClientRect();

      const newAbsTop = nodeBoundingRect.top + Δy + boundY;
      if (newAbsTop < insideBoundingRect.top) {
        top += insideBoundingRect.top - newAbsTop;
      } else {
        const newAbsBottom = nodeBoundingRect.bottom + Δy - boundY;
        if (newAbsBottom > insideBoundingRect.bottom) {
          top -= newAbsBottom - insideBoundingRect.bottom;
        }
      }

      const newAbsLeft = nodeBoundingRect.left + Δx + boundX;
      if (newAbsLeft < insideBoundingRect.left) {
        left += insideBoundingRect.left - newAbsLeft;
      } else {
        const newAbsRight = nodeBoundingRect.right + Δx - boundX;
        if (newAbsRight > insideBoundingRect.right) {
          left -= newAbsRight - insideBoundingRect.right;
        }
      }
    } else {
      if (boundX > 0) {
        const newΣΔx = ΣΔx + left - lastNodePosition.left;
        if (newΣΔx > boundX) {
          left -= newΣΔx - boundX;
        } else if (newΣΔx < -boundX) {
          left -= newΣΔx + boundX;
        }
      }

      if (boundY > 0) {
        const newΣΔy = ΣΔy + top - lastNodePosition.top;
        if (newΣΔy > boundY) {
          top -= newΣΔy - boundY;
        } else if (newΣΔy < -boundY) {
          top -= newΣΔy + boundY;
        }
      }
    }

    node.style.left = `${left}px`;
    node.style.top = `${top}px`;

    ΣΔx += left - lastNodePosition.left;
    ΣΔy += top - lastNodePosition.top;
    updateLastNodePosition({ top, left });
  };

  const end = () => {
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', end);

    const detail: MovableEventDetails = { node, position: lastNodePosition };
    node.dispatchEvent(new CustomEvent('movableend', { detail }));
  };

  const onMouseDown = (event: MouseEvent) => {
    const computedStyles = getComputedStyle(node);

    // init position
    const regex = '^[-0-9]+';
    const left = parseInt(computedStyles.getPropertyValue('left').match(regex)?.[0] ?? '0');
    const top = parseInt(computedStyles.getPropertyValue('top').match(regex)?.[0] ?? '0');
    updateLastNodePosition({ left, top });

    const detail: MovableEventDetails = { node, position: lastNodePosition };
    node.dispatchEvent(new CustomEvent('movablestart', { detail }));

    // init position style
    const position = computedStyles.getPropertyValue('position');
    if (position !== 'relative' && position !== 'absolute') {
      node.style.position = 'relative';
    }

    updateLastMousePosition(event);

    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'move';
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', end);
  };

  if (enabled) {
    trigger.addEventListener('mousedown', onMouseDown, true);
  }
  return {
    update(parameters: Partial<MovableParameters>) {
      const update = input(node, parameters);

      trigger.removeEventListener('mousedown', onMouseDown, true);
      update.trigger.addEventListener('mousedown', onMouseDown, true);

      if (!enabled && update.enabled) {
        trigger.addEventListener('mousedown', onMouseDown, true);
      } else if (enabled && !update.enabled) {
        trigger.removeEventListener('mousedown', onMouseDown, true);
      }

      ({ parent, normalizedDelta, trigger, enabled } = update);
    },
    destroy() {
      trigger.removeEventListener('mousedown', onMouseDown, true);
    },
  };
}
