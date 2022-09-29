/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createEventDispatcher,
  type ComponentEvents,
  type ComponentProps,
  type ComponentType,
} from 'svelte';
import { writable } from 'svelte/store';

import type {
  ModalPushInput,
  ModalComponentBase,
  ModalPushOutput,
  ModalComponentBaseResolved,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ExtendedModalEvents,
  ModalInternalResolver,
  ModalComponentBaseEvents,
} from './modal.types';

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
  const { subscribe, set } = writable<ModalPushOutput[]>([]);
  let modals: ModalPushOutput[] = [];
  const resolveMap: Record<string, undefined | ModalInternalResolver> = {};

  /**
   * Push a new modal to the stack
   *
   * @param input - {@link ModalPushInput}
   * @returns the {@link ModalPushOutput}
   */
  function push<
    Component extends ModalComponentBase,
    Resolved extends ModalComponentBaseResolved = ComponentEvents<Component>['resolve']['detail'],
  >(input: ModalPushInput<Component>): ModalPushOutput<Component> {
    let _resolve: ModalInternalResolver<Resolved> | undefined;
    let resolved = false;
    const promise = new Promise<Resolved>((resolve) => {
      _resolve = (value) => {
        resolved = true;
        resolve(value);
      };
    });

    let id: string = (crypto && crypto.randomUUID && crypto.randomUUID()) ?? `modal-indexed-${modals.length}`;
    let props: ComponentProps<Component>;
    let component: ComponentType<Component>;
    if (typeof input === 'function') {
      component = input;
      props = {} as ComponentProps<Component>;
    } else {
      id = input.id ?? id;
      props = input.props ?? ({} as ComponentProps<Component>);
      component = input.component;
    }

    const pushed: ModalPushOutput<Component> = {
      id,
      props,
      component,
      resolve: () => promise,
      resolved,
    };

    modals.push(pushed);
    resolveMap[pushed.id] = _resolve as unknown as ModalInternalResolver;

    set([...modals]);

    return pushed;
  }

  /**
   * Pop the modal with given id.
   * If `id` is not provided, pop the topmost modal
   *
   * @remarks
   *
   * When calling this manually (rather than being called from the `ModalPortal` component),
   * the trigger is expected to be `pop`;
   *
   * @param pushed - the returned {@link ModalPushOutput} output from `push`
   * @param resolved - custom resolved value, if any
   * @returns the popped {@link ModalPushOutput} or `undefined` in the
   * case no modal was found that matches the specified input
   */
  function pop<
    Component extends ModalComponentBase,
    Resolved extends ModalComponentBaseResolved = ComponentEvents<Component>['resolve']['detail'],
    Pushed extends ModalPushOutput<Component, Resolved> | undefined = ModalPushOutput<
      Component,
      Resolved
    >,
  >(
    pushed?: Pushed,
    resolved?: Resolved,
  ):
    | (Pushed extends undefined ? ModalPushOutput : ModalPushOutput<Component, Resolved>)
    | undefined {
    let popped: ModalPushOutput<Component, Resolved> | undefined;
    if (pushed?.id) {
      modals = modals.filter((modal) => {
        if (modal.id === pushed.id) {
          popped = modal as ModalPushOutput<Component, Resolved>;
          return false;
        }
        return true;
      });
      set(modals);
    } else {
      popped = modals.pop() as ModalPushOutput<Component, Resolved>;
      set([...modals]);
    }
    if (popped) {
      resolveMap[popped.id]?.({
        trigger: 'pop',
        ...(resolved ?? {}),
      });
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

/**
 * Helper that wraps svelte `createEventDispatcher` for creating typesafe
 * event dispatcher from the `$$Events` type. See {@link ExtendedModalEvents}
 *
 * @returns svelte event dispatcher
 */
export function createModalEventDispatcher<
  Events extends ModalComponentBaseEvents<ModalComponentBaseResolved<ExtendedResolved>> &
    Record<string, CustomEvent<any>>,
  ExtendedResolved extends Record<string, any> = Omit<Events['resolve']['detail'], 'trigger'>,
>() {
  return createEventDispatcher<{
    [key in keyof Events]: Events[key]['detail'];
  }>();
}
