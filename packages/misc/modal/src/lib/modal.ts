/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentEvents, ComponentProps } from 'svelte';
import { writable } from 'svelte/store';

import type { PushedModal, ModalPushInput, ModalComponentBase, ModalPushOutput, ModalComponentBaseResolved } from './modal.types';

type ApplicableModal = PushedModal<ModalComponentBase>;
export function createModalStore() {
  const { subscribe, set } = writable<ApplicableModal[]>([]);
  let modals: ApplicableModal[] = [];
  const resolveMap: Record<string, undefined | ((args?: any) => any)> = {};

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
      resolved: promise,
      pop: (resolvedValue) => {
        modals = modals.filter((m) => m.id !== modal.id);
        set(modals);
        _resolve?.(resolvedValue as Resolved);
      },
    };
  }

  function pop<Resolved>(id?: string, resolved?: Resolved) {
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
