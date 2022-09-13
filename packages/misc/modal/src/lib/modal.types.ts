/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import type { ComponentEvents, ComponentProps, ComponentType, SvelteComponentTyped } from 'svelte';

export type ModalComponentBaseResolved = {
  trigger?: string;
} | null;
export type ModalComponentBaseProps = {};
export type ModalComponentBaseEvents<Resolved extends ModalComponentBaseResolved> = { resolve: CustomEvent<Resolved> };
export type ModalComponentBaseSlots = {};
export type ModalComponentBase = SvelteComponentTyped<
  ModalComponentBaseProps,
  ModalComponentBaseEvents<ModalComponentBaseResolved>,
  ModalComponentBaseSlots
>;

export interface PushedModal<Component extends ModalComponentBase> {
  /** default to new uuid */
  id: string;
  /** component to render in modal layout */
  component: ComponentType<Component>;
  /** props passed to modal component */
  props: ComponentProps<Component>;
}

export interface ModalEventDispatcher<Resolved> {
  resolve: Resolved;
}

export type ModalPushInput<Component extends ModalComponentBase> = Partial<
  PushedModal<Component>
> &
  Pick<PushedModal<Component>, 'component'>;

export interface ModalPushOutput<
  Component extends ModalComponentBase,
  Resolved extends ModalComponentBaseResolved = ComponentEvents<Component>['resolve']['detail'],
> {
  id: string;
  resolved: Promise<Resolved>;
  pop: (value: Resolved) => void;
}
