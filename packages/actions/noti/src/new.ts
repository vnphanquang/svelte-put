/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
import { ActionReturn } from 'svelte/action';
import { writable } from 'svelte/store';

let globalCounter = 0;

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

export function store(config: NotificationCommonConfig<string, SvelteComponent>) {
  return new NotificationStoreBuilder(config);
}

export class NotificationStoreBuilder<VariantMap extends Record<string, SvelteComponent> = {}> {
  #commonConfig: Required<NotificationCommonConfig<string, SvelteComponent>> = {
    id: 'uuid',
    timeout: 3000,
  };
  #variantConfigMap: Record<string, NotificationComponentConfig<string, SvelteComponent>> = {};

  constructor(config: NotificationCommonConfig<string, SvelteComponent>) {
    this.#commonConfig = {
      ...this.#commonConfig,
      ...config,
    };
    this.#variantConfigMap = {};
  }

  variant<Variant extends string, Component extends SvelteComponent>(
    variant: Variant,
    config: Omit<NotificationComponentConfig<Variant, Component>, 'variant'>,
  ): NotificationStoreBuilder<VariantMap & Record<Variant, Component>> {
    this.#variantConfigMap[variant] = {
      variant,
      ...config,
    } as any;
    return this;
  }

  build() {
    const variantConfigMap = this.#variantConfigMap;
    const commonConfig = this.#commonConfig;

    let _portal: NotificationStoreValue['portal'] = null;
    let _notifications: NotificationStoreValue['notifications'] = [];
    const { subscribe, update } = writable<NotificationStoreValue>({
      portal: _portal,
      notifications: _notifications,
    });

    function push<
      Variant extends Extract<keyof VariantMap, string>,
      Component extends VariantMap[Variant] = VariantMap[Variant],
    >(variant: Variant, config: NotificationByVariantPushConfig<Variant, Component>): void;
    function push<Component extends SvelteComponent>(
      variant: 'custom',
      config: NotificationCustomPushConfig<Component>,
    ): void;
    function push(
      variant: string,
      config:
        | NotificationByVariantPushConfig<string, SvelteComponent>
        | NotificationCustomPushConfig<SvelteComponent>,
    ): void {
      if (!_portal)
        throw new Error(
          'Notification portal has not been registered or has unmounted. Add `use:portal={notiStore}` to an HTMLElement.',
        );

      let instanceConfig: NotificationInstanceConfig<string, SvelteComponent>;
      if (variant === 'custom') {
        const rConfig = config as NotificationCustomPushConfig<SvelteComponent>;
        if (!rConfig.component)
          throw new Error('A Svelte component must be provided with custom push');
        instanceConfig = {
          ...commonConfig,
          ...rConfig,
          variant: 'custom',
          component: rConfig.component,
          props: rConfig.props ?? {},
          id: '',
        };
      } else {
        const prebuild = variantConfigMap[variant];
        if (!prebuild)
          throw new Error(
            `No prebuilt config matches with provided variant. Variant should be on of {'custom', ${Object.keys(
              variantConfigMap,
            ).join(', ')}}`,
          );
        instanceConfig = {
          ...commonConfig,
          ...prebuild,
          ...config,
          props: {
            ...prebuild.props,
            ...config.props,
          },
          id: '',
        };
      }

      const idResolver =
        (config.id as NotificationCommonConfig<string, SvelteComponent>['id']) ?? commonConfig.id;
      if (idResolver === 'counter') {
        instanceConfig.id = (++globalCounter).toString();
      } else if (idResolver === 'uuid') {
        instanceConfig.id =
          'crypto' in window && crypto.randomUUID
            ? crypto.randomUUID()
            : (++globalCounter).toString();
      } else {
        instanceConfig.id = idResolver(instanceConfig);
      }
      const instance = new instanceConfig.component({
        target: _portal,
        props: {
          ...instanceConfig.props,
          config: instanceConfig,
        },
      });
      const pushed: PushedNotification<string, SvelteComponent> = {
        ...instanceConfig,
        instance,
      };

      update((prev) => {
        _notifications = [..._notifications, pushed];
        return { ...prev, _notifications };
      });
    }

    return {
      subscribe,
      get notifications() {
        return _notifications;
      },
      get portal(): HTMLElement | null {
        return _portal;
      },
      set portal(node: HTMLElement | null) {
        update((prev) => {
          _portal = node;
          return { ...prev, portal: _portal };
        });
      },
      push,
    };
  }
}
type NotificationPortalAttributes = {
  'on:noti:push'?: (event: CustomEvent) => void;
  'on:noti:pop'?: (event: CustomEvent) => void;
};

type NotificationPortalActionReturn = ActionReturn<NotificationStore, NotificationPortalAttributes>;

/**
 *
 * @param {HTMLElement} node
 * @param {NotificationStore} store
 * @returns {NotificationPortalActionReturn}
 */
export function portal(
  node: HTMLElement,
  store: NotificationStore,
): NotificationPortalActionReturn {
  store.portal = node;

  return {
    update(newStore) {
      store.portal = null;
      store = newStore;
      store.portal = node;
    },
    destroy() {
      store.portal = null;
    },
  };
}
