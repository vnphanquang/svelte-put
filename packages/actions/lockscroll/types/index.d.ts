declare module '@svelte-put/lockscroll' {
  import type { ActionReturn } from 'svelte/action';
  import type { Readable } from 'svelte/store';
  /// <reference types="svelte" />
  /**
   * create a dedicated svelte store for `lockscroll` action
   * */
  export function createLockScrollStore(initial?: boolean | undefined): {
    subscribe: (
      this: void,
      run: import('svelte/store').Subscriber<boolean>,
      invalidate?: import('svelte/store').Invalidator<boolean>,
    ) => import('svelte/store').Unsubscriber;
    set: (this: void, value: boolean) => void;
    update: (this: void, updater: import('svelte/store').Updater<boolean>) => void;
    /**
     * toggle the lock state of `lockscroll` action
     * @param force - force lock or unlock
     */
    toggle(force?: boolean | undefined): void;
  };
  /**
   * lock scroll within the given node
   * */
  export function lockscroll(node: HTMLElement, param: LockScrollParameter): LockScrollActionReturn;
  type LockScrollStore = ReturnType<typeof createLockScrollStore>;

  type LockScrollParameter = boolean | LockScrollStorePattern;

  type LockScrollStorePattern = LockScrollStore | Readable<boolean>;

  type LockScrollDetail = {
    locked: boolean;
  };

  type LockScrollAttributes = {
    'on:lockscroll:toggle'?: (event: CustomEvent<LockScrollDetail>) => void;
  };

  type LockScrollActionReturn = ActionReturn<LockScrollParameter, LockScrollAttributes>;
}

//# sourceMappingURL=index.d.ts.map
