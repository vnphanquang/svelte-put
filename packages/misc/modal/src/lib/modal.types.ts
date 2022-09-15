/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import type { ComponentEvents, ComponentProps, ComponentType, SvelteComponentTyped } from 'svelte';

/**
 * The base interface when modal is resolved
 * @public
 */
export type ModalComponentBaseResolved = {
  trigger?: string;
} | null;

/**
 * The base events for modal
 * @public
 */
export type ModalComponentBaseProps = {};

/**
 * The base events for modal
 * @public
 */
export type ModalComponentBaseEvents<Resolved extends ModalComponentBaseResolved> = {
  resolve: CustomEvent<Resolved>;
};

/**
 * The base slots for modal
 * @public
 */
export type ModalComponentBaseSlots = {};

/**
 * The base component for modal. Modals extending this component needs to
 * meet the specified constraints
 * @public
 */
export type ModalComponentBase = SvelteComponentTyped<
  ModalComponentBaseProps,
  ModalComponentBaseEvents<ModalComponentBaseResolved>,
  ModalComponentBaseSlots
>;

/**
 * A modal pushed to the modal store
 * @public
 */
export interface PushedModal<Component extends ModalComponentBase> {
  /** default to new uuid */
  id: string;
  /** component to render in modal layout */
  component: ComponentType<Component>;
  /** props passed to modal component */
  props: ComponentProps<Component>;
}

/**
 * Same interface as in {@link PushedModal} but all optional except for `component`
 * @public
 */
export type ModalPushInput<Component extends ModalComponentBase> = Partial<PushedModal<Component>> &
  Pick<PushedModal<Component>, 'component'>;

/**
 * The return of the `push` method of modal store
 * @public
 */
export interface ModalPushOutput<
  Component extends ModalComponentBase,
  Resolved extends ModalComponentBaseResolved = ComponentEvents<Component>['resolve']['detail'],
> {
  /**
   * id of the pushed modal, pass to `pop` to dismiss modal
   *
   * @example
   *
   * ```typescript
   * import { createModalStore } from '@svelte-put/modal';
   * const store = createModalStore();
   * const pushed = store.push({ component: SomeComponent, props: { someProp: 'value' } });
   * store.pop(pushed.id);
   * ```
   */
  id: string;
  /**
   * wait for the modal to resolve, and return the promise wrapping the resolved value
   *
   * @example
   *
   * ```typescript
   * import { createModalStore } from '@svelte-put/modal';
   * const store = createModalStore();
   * const pushed = store.push({ component: ConfirmationModal });
   * // assuming ConfirmationModal resolves with { confirmed: boolean }
   * const { confirmed } = await pushed.resolve();
   * ```
   */
  resolve: () => Promise<Resolved>;
}
