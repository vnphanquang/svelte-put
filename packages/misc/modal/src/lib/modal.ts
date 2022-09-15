/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentEvents, ComponentProps } from 'svelte';
import { writable } from 'svelte/store';

import type { PushedModal, ModalPushInput, ModalComponentBase, ModalPushOutput, ModalComponentBaseResolved } from './modal.types';

type ApplicableModal = PushedModal<ModalComponentBase>;

/**
 * Create a svelte store for handling modal
 * @public
 *
 * @example
 *
 * ```typescript
 * import { createModalStore } from '@svelte-put/modal';
 * const store = createModalStore();
 * ```
 *
 * @returns extended svelte store
 */
export function createModalStore() {
  const { subscribe, set } = writable<ApplicableModal[]>([]);
  let modals: ApplicableModal[] = [];
  const resolveMap: Record<string, undefined | ((args?: any) => any)> = {};

  /**
   * Push a new modal to the stack
   *
   * @param input - {@link ModalPushInput}
   * @returns the {@link ModalPushOutput}
   */
  function push<
    Component extends ModalComponentBase,
    Resolved extends ModalComponentBaseResolved = ComponentEvents<Component>['resolve']['detail'],
  >(
    input: ModalPushInput<Component>,
  ): ModalPushOutput<Component> {
    let _resolve: ((value: Resolved) => void) | undefined;
    const promise = new Promise<Resolved>((resolve) => {
      _resolve = resolve;
    });

    const modal: PushedModal<Component> = {
      id: crypto.randomUUID(),
      props: {} as ComponentProps<Component>,
      ...input,
    };
    modals.push(modal);
    resolveMap[modal.id] = _resolve;

    set([...modals]);

    return {
      id: modal.id,
      resolve: () => promise,
    };
  }

  /**
   * Pop the modal with given id.
   * If `id` is not provided, pop the topmost modal
   *
   * @param id - from the return of `push` method
   * @param resolved - custom resolved value. Defaults to `null`
   * @returns the popped {@link PushedModal} or `undefined` in the
   * case no modal was found that matches the specified input
   */
  function pop<Resolved>(id?: string, resolved: Resolved | null = null) {
    let popped: ApplicableModal | undefined;
    if (id) {
      modals = modals.filter((modal) => {
        if (modal.id === id) {
          popped = modal;
          return false;
        }
        return true;
      });
      set(modals);
    } else {
      popped = modals.pop();
      set([...modals]);
    }
    if (popped) {
      resolveMap[popped.id]?.(resolved);
      resolveMap[popped.id] = undefined;
    }
    return popped;
  }

  return {
    subscribe,
    push,
    pop,
  };
}
