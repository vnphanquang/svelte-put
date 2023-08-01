/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
import { ActionReturn } from 'svelte/action';

import { NotificationStoreBuilder } from './store';

type NotificationCommonConfig<Variant extends string, Component extends SvelteComponent> = {
  id?:
    | 'uuid'
    | 'counter'
    | ((config: Required<Omit<NotificationVariantConfig<Variant, Component>, 'id'>>) => string);
  timeout?: number | false;
};

type NotificationVariantConfig<
  Variant extends string,
  Component extends SvelteComponent,
> = NotificationCommonConfig<Variant, Component> & {
  variant: Variant;
  component: ComponentType<Component>;
  props?: Omit<ComponentProps<Component>, 'config'>;
};

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
