import { writable } from 'svelte/store';

/**
 * @param {number | false} [initial]
 * @param {() => void} [onTimeOut]
 */
export function createProgressStore(initial = 0, onTimeOut = () => {}) {
  let ms = initial || -1;
  const { subscribe, update } = writable(
    /** @type {import('./public').NotificationProgressStoreValue} */ ({
      state: 'idle',
    }),
  );

  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let timeoutId = undefined;
  /** @type {number} */
  let timestamp = new Date().getTime();

  /**
   *
   * @param {import('./public').NotificationProgressStoreValue['state']} state
   */
  function updateState(state) {
    update((prev) => ({
      ...prev,
      state,
    }));
  }

  function callback() {
    onTimeOut();
    ms = 0;
    updateState('ended');
  }

  return {
    subscribe,
    resume() {
      if (ms === -1) return;
      timestamp = new Date().getTime();
      timeoutId = setTimeout(callback, ms);
      updateState('running');
    },
    pause() {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
        ms -= new Date().getTime() - timestamp;
        updateState('paused');
      }
    },
    stop() {
      clearTimeout(timeoutId);
      timeoutId = undefined;
      ms = 0;
      updateState('ended');
    },
  };
}
