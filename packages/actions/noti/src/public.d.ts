/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
import { ActionReturn } from 'svelte/action';

import { NotificationStoreBuilder } from './store';

type NotificationCommonConfig<Variant extends string, Component extends SvelteComponent> = {
  id?:
    | 'uuid'
    | 'counter'
    | ((config: Required<Omit<NotificationComponentConfig<Variant, Component>, 'id'>>) => string);
  timeout?: number | false;
};

type NotificationComponentConfig<
  Variant extends string,
  Component extends SvelteComponent,
> = NotificationCommonConfig<Variant, Component> & {
  variant: Variant;
  component: ComponentType<Component>;
  props?: ComponentProps<Component>;
};

type NotificationInstanceConfig<
  Variant extends string,
  Component extends SvelteComponent,
> = Required<Omit<NotificationComponentConfig<Variant, Component>, 'id'>> & {
  id: string;
};

type NotificationByVariantPushConfig<
  Variant extends string,
  Component extends SvelteComponent,
> = NotificationCommonConfig<Variant, Component> & {
  props?: ComponentProps<Component>;
};

type NotificationCustomPushConfig<Component extends SvelteComponent> = NotificationCommonConfig<
  'custom',
  Component
> & {
  component: ComponentType<Component>;
  props?: ComponentProps<Component>;
};

type PushedNotification<
  Variant extends string,
  Component extends SvelteComponent,
> = NotificationInstanceConfig<Variant, Component> & {
  instance: Component;
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
