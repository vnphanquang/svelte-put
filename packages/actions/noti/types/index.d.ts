declare module '@svelte-put/noti' {
  import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
  import type { ActionReturn } from 'svelte/action';
  /**
   * register an HTMLElement as the portal for the provided notification store
   * */
  export function portal(
    node: HTMLElement,
    store: NotificationStore,
  ): NotificationPortalActionReturn;
  /// <reference types="svelte" />

  export function store(
    config?: NotificationCommonConfig<string, import('svelte').SvelteComponent>,
  ): NotificationStoreBuilder<{}>;
  /**
   * builder for notification store
   *
   */
  class NotificationStoreBuilder<
    VariantMap extends Record<string, import('svelte').SvelteComponent<any, any, any>> = {},
  > {
    constructor(config: NotificationCommonConfig<string, import('svelte').SvelteComponent>);
    /**
     * add config for a notification variant
     * */
    variant<
      Variant extends string,
      Component extends import('svelte').SvelteComponent<any, any, any>,
    >(
      variant: Variant,
      config:
        | import('svelte').ComponentType<Component>
        | Omit<NotificationVariantConfig<Variant, Component>, 'variant'>,
    ): NotificationStoreBuilder<VariantMap & Record<Variant, Component>>;
    /**
     * Build the actual notification store
     */
    build(): {
      subscribe: (
        this: void,
        run: import('svelte/store').Subscriber<NotificationStoreValue>,
        invalidate?: import('svelte/store').Invalidator<NotificationStoreValue>,
      ) => import('svelte/store').Unsubscriber;
      readonly notifications: PushedNotification<
        string,
        import('svelte').SvelteComponent<any, any, any>
      >[];

      portal: HTMLElement;
      push: {
        <
          Variant_1 extends Extract<keyof VariantMap, string>,
          Component_1 extends VariantMap[Variant_1] = VariantMap[Variant_1],
        >(
          variant: Variant_1,
          config?: NotificationByVariantPushConfig<Variant_1, Component_1>,
        ): any;
        <CustomComponent extends import('svelte').SvelteComponent<any, any, any>>(
          variant: 'custom',
          config: NotificationCustomPushConfig<CustomComponent>,
        ): any;
      };
    };
    #private;
  }
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

  type NotificationPortalActionReturn = ActionReturn<
    NotificationStore,
    NotificationPortalAttributes
  >;
}

//# sourceMappingURL=index.d.ts.map
