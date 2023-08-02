declare module '@svelte-put/noti' {
  import type { ComponentEvents, ComponentProps, ComponentType, SvelteComponent } from 'svelte';
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

    commonConfig: Required<NotificationCommonConfig<string, import('svelte').SvelteComponent>>;

    variantConfigMap: Record<
      string,
      NotificationVariantConfig<string, import('svelte').SvelteComponent>
    >;
    counter: number;
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
          ResolveDetail = import('svelte').ComponentEvents<Component_1>['resolve']['detail'],
        >(
          variant: Variant_1,
          config?: NotificationByVariantPushConfig<Variant_1, Component_1>,
        ): NotificationPushOutput<Component_1>;
        <
          CustomComponent extends import('svelte').SvelteComponent<any, any, any>,
          ResolveDetail = import('svelte').ComponentEvents<Component_1>['resolve']['detail'],
        >(
          variant: 'custom',
          config: NotificationCustomPushConfig<CustomComponent>,
        ): NotificationPushOutput<CustomComponent>;
      };
      pop: {
        (id?: string, detail?: any): void;
        (config?: { id?: string; detail?: any }): void;
      };
    };
  }
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
    /** internal api for resolving a notification, effectively popping it from the stack */
    $resolve: (
      e: ComponentEvents<Component>['resolve'],
    ) => Promise<ComponentEvents<Component>['resolve']['detail']>;
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

  type NotificationPushOutput<Component extends SvelteComponent = SvelteComponent> = {
    id: string;
    /**
     * return a promise that resolves to a detail, either provided from invocation of {@link NotificationStore} pop method,
     * or through the CustomEvent detail of the `resolve` event within the notification component
     */
    resolve: () => Promise<ComponentEvents<Component>['resolve']['detail']>;
  };
}

//# sourceMappingURL=index.d.ts.map
