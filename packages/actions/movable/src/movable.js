import { tick } from 'svelte';

/**
 * Trigger node displacement on mousedown (via position.left & position.top)
 * @public
 *
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
 * 1. on `mousedown` of the handle (`button` element), a `movablestart` {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent | CustomEvent } is dispatched,
 *
 * 2. any `mousemove` event will tell `div` to move accordingly;
 *
 * 3. movement will be limited to the border of the `containerNode`, ±20% of the width & height of the `div` that the action is being used on,
 *
 * 4. `mouseup` event will stop the movement; a `movableend` {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent | CustomEvent } is dispatched.
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
 * - element.style.position is set to `relative` if not already 'absolute', 'relative', or 'fixed during the first time mousedown is triggered
 *
 * - document.body.userSelect is set to `none` after `mousedown` and restored on `mouseup`
 *
 * - document.body.cursor is set to `move` after `mousedown` and restored on `mouseup`
 *
 * @param {HTMLElement} node - HTMLElement to be moved
 * @param {import('./public').MovableParameter} param - svelte action parameters
 * @returns {import('./public').MovableActionReturn}
 *
 */
export function movable(node, param = { enabled: true }) {
  let { parent, normalizedDelta, handle, enabled, ignore, cursor } = input(node, param);

  const lastMousePosition = { x: 0, y: 0 };
  const lastNodePosition = { top: 0, left: 0 };
  let ΣΔx = 0; // total displacement in x-axis
  let ΣΔy = 0; // total displacement in y-axis

  /**
   * @returns {HTMLElement[]}
   */
  function getIgnoredElements() {
    return ignore ? Array.from(handle.querySelectorAll(ignore)) : [];
  }

  /**
   * @param {MouseEvent} event
   */
  function updateLastMousePosition(event) {
    lastMousePosition.x = event.clientX;
    lastMousePosition.y = event.clientY;
  }

  /**
   * @param {typeof lastNodePosition} param0
   */
  function updateLastNodePosition({ top, left }) {
    lastNodePosition.top = top;
    lastNodePosition.left = left;
  }

  /**
   * @param {MouseEvent} event
   */
  function onMouseMove(event) {
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
      /** @type {Pick<DOMRectReadOnly, 'top' | 'bottom' | 'left' | 'right'>} */
      let insideBoundingRect;
      if (parent === 'screen') {
        insideBoundingRect = {
          top: 0,
          bottom: window.innerHeight,
          left: 0,
          right: window.innerWidth,
        };
      } else {
        insideBoundingRect = parent.getBoundingClientRect();
      }

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
  }

  function end() {
    document.body.style.userSelect = '';
    if (cursor) {
      if (document.body.style.cursor === 'grabbing') {
        document.body.style.removeProperty('cursor');
      }
      handle.style.cursor = 'grab';
    }
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', end);

    /** @type {import('./public').MovableEventDetail} */
    const detail = { node, position: lastNodePosition };
    node.dispatchEvent(new CustomEvent('movableend', { detail }));
  }

  /**
   * @param {MouseEvent} event
   */
  function onMouseDown(event) {
    const ignoredElements = getIgnoredElements();
    if (
      ignoredElements.some((node) => node.isSameNode(/** @type {HTMLElement} */ (event.target)))
    ) {
      return;
    }

    const computedStyles = getComputedStyle(node);

    // init position
    const regex = '^[-0-9]+';
    const left = parseInt(computedStyles.getPropertyValue('left').match(regex)?.[0] ?? '0');
    const top = parseInt(computedStyles.getPropertyValue('top').match(regex)?.[0] ?? '0');
    updateLastNodePosition({ left, top });

    /** @type {import('./public').MovableEventDetail} */
    const detail = { node, position: lastNodePosition };
    node.dispatchEvent(new CustomEvent('movablestart', { detail }));

    // init position style
    const position = computedStyles.getPropertyValue('position');
    if (position !== 'relative' && position !== 'absolute' && position !== 'fixed') {
      node.style.position = 'relative';
    }

    updateLastMousePosition(event);

    document.body.style.userSelect = 'none';
    if (cursor) {
      document.body.style.cursor = 'grabbing';
      handle.style.cursor = 'grabbing';
    }
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', end);
  }

  function addCursor() {
    if (cursor) {
      handle.style.cursor = 'grab';
      const ignoredElements = getIgnoredElements();
      for (const e of ignoredElements) {
        if (!e.style.cursor) {
          e.style.cursor = 'auto';
        }
      }
    }
  }
  function removeCursor() {
    if (cursor) {
      if (handle?.style.cursor === 'grab') {
        handle.style.removeProperty('cursor');
      }
      const ignoredElements = getIgnoredElements();
      for (const e of ignoredElements) {
        if (e.style.cursor === 'auto') {
          e.style.removeProperty('cursor');
        }
      }
    }
  }

  if (enabled) {
    handle.addEventListener('mousedown', onMouseDown, true);
    tick().then(() => {
      addCursor();
    });
  }
  return {
    update(update) {
      removeCursor();
      handle.removeEventListener('mousedown', onMouseDown, true);
      ({ parent, normalizedDelta, handle, enabled, ignore, cursor } = input(node, update));

      if (enabled) {
        handle.addEventListener('mousedown', onMouseDown, true);
        tick().then(() => {
          addCursor();
        });
      }
    },
    destroy() {
      handle.removeEventListener('mousedown', onMouseDown, true);
      removeCursor();
    },
  };
}

/**
 * @internal
 * @typedef {{
 *  unit: 'px' | '%';
 *  value: number;
 * }} NormalizedLimit
 * MovableLimit interface normalized to use in runtime
 *
 * @typedef {'px' | '%'} SpacingUnit
 * @typedef {'x' | 'y'} Axis
 */

/**
 * @internal
 *
 * @param {import('./public').MovableLimit['delta']} delta - MovableLimit to normalize
 * @returns {{ x: NormalizedLimit, y: NormalizedLimit }}
 */
export function normalizeDelta(delta) {
  /** @type {NormalizedLimit} */
  const x = { unit: 'px', value: 0 };
  /** @type {NormalizedLimit} */
  const y = { unit: 'px', value: 0 };

  /**
   *
   * @param {string} text
   * @param {Axis | undefined} axis
   * @returns {SpacingUnit}
   */
  function extractUnit(text, axis = undefined) {
    /** @type {SpacingUnit} */
    let unit = 'px';
    if (text.slice(-1) === '%') {
      unit = '%';
    } else if (text.slice(-2) === 'px') {
      unit = 'px';
    } else {
      throw new Error(`Invalid delta ${axis ?? ''} unit. Only 'px' and '%' are supported.`);
    }
    return unit;
  }

  if (delta) {
    if (typeof delta === 'string') {
      x.unit = y.unit = extractUnit(delta);
      x.value = y.value = parseInt(delta, 10);
      x.value = y.value = parseInt(delta.slice(0, -1));
    } else {
      x.unit = extractUnit(delta.x, 'x');
      x.value = parseInt(delta.x.slice(0, -1));

      y.unit = extractUnit(delta.y, 'y');
      y.value = parseInt(delta.y.slice(0, -1));
    }
  }

  return { x, y };
}

/**
 *
 * @internal
 *
 * @param {HTMLElement} node
 * @param {import('./public').MovableParameter} param
 * @returns
 */
export function input(node, param = {}) {
  return {
    enabled: param.enabled ?? true,
    parent: param.limit?.parent,
    normalizedDelta: normalizeDelta(param.limit?.delta),
    handle: param.handle ?? param.trigger ?? node,
    ignore: (param.ignore
      ? typeof param.ignore === 'string'
        ? [param.ignore]
        : param.ignore
      : []
    ).join(','),
    cursor: param.cursor ?? true,
  };
}
