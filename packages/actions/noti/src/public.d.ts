/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
import { ActionReturn } from 'svelte/action';

import { NotificationStoreBuilder } from './store';

type NotificationCommonConfig<Variant extends string, Component extends SvelteComponent> = {
  /**
   * id generator for notifications. Defaults to 'uuid'.
   *
   * @remarks
   *   - counter - use an auto-incremented counter that is scoped to the store
   *   - uuid - use `crypto.randomUUID()`, fallback to `counter` if not available
   *   - function - custom function that accepts a {@link NotificationInstanceConfig} and returns a string as the id
   */
  id?:
    | 'uuid'
    | 'counter'
    | ((config: Required<Omit<NotificationInstanceConfig<Variant, Component>, 'id'>>) => string);
  /**
   * milliseconds to wait and automatically pop the notification.
   * Defaults to `3000`. Set to `false` to disable
   */
  timeout?: number | false;
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

/** a resolved config for a {@link PushedNotification} */
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

type PushedNotification<
  Variant extends string,
  Component extends SvelteComponent,
> = NotificationInstanceConfig<Variant, Component> & {
  instance?: Component;
};

type NotificationStoreValue = {
  portal: HTMLElement | null;
  notifications: PushedNotification<string, SvelteComponent>[];
};

type NotificationStore = ReturnType<NotificationStoreBuilder['build']>;

type NotificationPortalAttributes = {
  'on:noti:push'?: (event: CustomEvent<PushedNotification<string, SvelteComponent>>) => void;
  'on:noti:pop'?: (event: CustomEvent<PushedNotification<string, SvelteComponent>>) => void;
};

type NotificationPortalActionReturn = ActionReturn<NotificationStore, NotificationPortalAttributes>;
