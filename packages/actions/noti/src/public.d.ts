/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { ComponentEvents, ComponentProps, ComponentType, SvelteComponent } from 'svelte';
import { ActionReturn } from 'svelte/action';

import { NotificationStoreBuilder } from './store';

type NotificationCommonConfig<Variant extends string, Component extends SvelteComponent> = {
  /**
   * milliseconds to wait and automatically pop the notification.
   * Defaults to `3000`. Set to `false` to disable
   */
  timeout?: number | false;
  /**
   * id generator for notifications. Defaults to 'uuid'.
   *
   * @remarks
   *   - counter: use an auto-incremented counter that is scoped to the store
   *   - uuid: use `crypto.randomUUID()`, fallback to `counter` if not available
   *   - callback: a custom function that accepts {@link NotificationInstanceConfig} and returns a string as the id
   */
  id?:
    | 'counter'
    | 'uuid'
    | ((config: Required<Omit<NotificationInstanceConfig<Variant, Component>, 'id'>>) => string);
};

/** predefined variant config provided while building a {@link NotificationStore} */
type NotificationVariantConfig<
  Variant extends string,
  Component extends SvelteComponent,
> = NotificationCommonConfig<Variant, Component> & {
  /** string variant representing this config, must be unique within a {@link NotificationStore}  */
  variant: Variant;
  /** any Svelte component used for rendering notification UI */
  component: ComponentType<Component>;
  /** inferred props from `component` */
  props?: Omit<ComponentProps<Component>, 'config'>;
};

/** a resolved config for a {@link NotificationInstance} */
type NotificationInstanceConfig<
  Variant extends string = string,
  Component extends SvelteComponent = SvelteComponent,
> = Required<Omit<NotificationVariantConfig<Variant, Component>, 'id'>> & {
  id: string;
};

type NotificationByVariantPushConfig<
  Variant extends string,
  Component extends SvelteComponent,
> = NotificationCommonConfig<Variant, Component> & {
  props?: Omit<ComponentProps<Component>, 'config'>;
};

type NotificationCustomPushConfig<Component extends SvelteComponent> = NotificationCommonConfig<
  'custom',
  Component
> & {
  component: ComponentType<Component>;
  props?: Omit<ComponentProps<Component>, 'config'>;
};

type NotificationInstance<
  Variant extends string,
  Component extends SvelteComponent,
> = NotificationInstanceConfig<Variant, Component> & {
  instance?: Component;
  /** internal api for resolving a notification, effectively popping it from the stack */
  $resolve: (
    e: ComponentEvents<Component>['resolve'],
  ) => Promise<ComponentEvents<Component>['resolve']['detail']>;
};

type NotificationStoreValue = {
  portal: HTMLElement | null;
  notifications: NotificationInstance<string, SvelteComponent>[];
};

type NotificationStore = ReturnType<NotificationStoreBuilder['build']>;

type NotificationPortalAttributes = {
  'on:noti:push'?: (event: CustomEvent<NotificationInstance<string, SvelteComponent>>) => void;
  'on:noti:pop'?: (event: CustomEvent<NotificationInstance<string, SvelteComponent>>) => void;
};

type NotificationPortalActionReturn = ActionReturn<NotificationStore, NotificationPortalAttributes>;

type NotificationPushOutput<Component extends SvelteComponent = SvelteComponent> = {
  id: string;
  /**
   * return a promise that resolves to a detail, either provided from invocation of {@link NotificationStore} pop method,
   * or through the CustomEvent detail of the `resolve` event within the notification component
   */
  resolve: () => Promise<ComponentEvents<Component>['resolve']['detail']>;
};
