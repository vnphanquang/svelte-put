import { writable } from 'svelte/store';

/**
 * create a dedicated svelte store for `lockscroll` action
 * @param {boolean | undefined} initial
 */
export function createLockScrollStore(initial = false) {
  const { subscribe, set, update } = writable(initial);

  return {
    subscribe,
    set,
    update,
    /**
     * toggle the lock state of `lockscroll` action
     * @param {boolean | undefined} force - force lock or unlock
     */
    toggle(force = undefined) {
      update((state) => force ?? !state);
    },
  };
}

/**
 * lock scroll within the given node
 * @param {HTMLElement} node
 * @param {import('./public').LockScrollParameter} param
 * @returns {import('./public').LockScrollActionReturn}
 */
export function lockscroll(node, param) {
  let locked = false;
  /** @type {import('svelte/store').Unsubscriber | undefined} */
  let unsub;

  if (node.isSameNode(document)) {
    node = document.documentElement;
  }

  function lock() {
    const scrollBarWidth = window.innerWidth - document.body.clientWidth;
    node.style.paddingRight = `${scrollBarWidth}px`;
    node.style.overflow = 'hidden';
  }

  function unlock() {
    node.style.overflow = '';
    node.style.paddingRight = '';
  }

  /** @param {boolean} _locked */
  function updateLockState(_locked) {
    if (_locked !== locked) {
      locked = _locked;
      locked ? lock() : unlock();
      node.dispatchEvent(new CustomEvent('lockscroll:toggle', { detail: { locked } }));
    }
  }

  /**
   * @param {typeof param} _param
   */
  function processParameter(_param) {
    if (typeof _param === 'boolean') {
      updateLockState(_param);
    } else {
      unsub = _param.subscribe(updateLockState);
    }
  }

  processParameter(param);

  return {
    update(update) {
      unsub?.();
      processParameter(update);
    },
    destroy() {
      unsub?.();
    },
  };
}
