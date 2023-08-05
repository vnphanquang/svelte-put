import { writable } from 'svelte/store';

import { NotFoundVariantConfig, MissingComponentInCustomPush } from './errors';

/**
 * @param {import('./public').NotificationCommonConfig<string, import('svelte').SvelteComponent>} [config]
 */
export function store(config = {}) {
  return new NotificationStoreBuilder(config);
}

/**
 * builder for notification store
 * @template {Record<string, import('svelte').SvelteComponent>} [VariantMap={}]
 */
export class NotificationStoreBuilder {
  /** @type {Required<import('./public').NotificationCommonConfig<string, import('svelte').SvelteComponent>>} */
  commonConfig = {
    id: 'uuid',
    timeout: 3000,
  };

  /** @type {Record<string, import('./public').NotificationVariantConfig<string, import('svelte').SvelteComponent>>} */
  variantConfigMap = {};

  counter = 0;

  /**
   * @param {import('./public').NotificationCommonConfig<string, import('svelte').SvelteComponent>} config
   */
  constructor(config) {
    this.commonConfig = {
      ...this.commonConfig,
      ...config,
    };
    this.variantConfigMap = {};
  }

  /**
   * add config for a notification variant
   * @template {string} Variant
   * @template {import('svelte').SvelteComponent} Component
   * @param {Variant} variant
   * @param {import('svelte').ComponentType<Component> | Omit<import('./public').NotificationVariantConfig<Variant, Component>, 'variant'>} config
   * @returns {NotificationStoreBuilder<VariantMap & Record<Variant, Component>> }
   */
  variant(variant, config) {
    if ('component' in config) {
      this.variantConfigMap[variant] = /** @type {any} */ ({
        ...config,
        variant,
      });
    } else {
      this.variantConfigMap[variant] = /** @type {any} */ ({
        component: config,
        variant,
      });
    }
    return this;
  }

  /**
   * Build the actual notification store
   */
  build() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const builder = this;

    /**
     * @type {import('./public').NotificationStoreValue['portal']}
     */
    let _portal = null;
    /**
     * @type {import('./public').NotificationStoreValue['notifications']}
     */
    let _notifications = [];

    const { subscribe, update } = writable(
      /** @type {import('./public').NotificationStoreValue}*/ ({
        portal: _portal,
        notifications: _notifications,
      }),
    );

    /** @typedef {{ id?: string, detail?: any }} NotificationPopVerboseInput */

    /**
     * @overload
     * @param {string} [id]
     * @param {any} [detail]
     * @returns {void}
     */
    /**
     * @overload
     * @param {NotificationPopVerboseInput} [config]
     * @returns {void}
     */
    /**
     *
     * @param {string | NotificationPopVerboseInput} [config]
     * @param {any} [detail]
     * @returns {void}
     */
    function pop(config, detail) {
      /** @type {string | undefined} */
      let id = undefined;

      if (config) {
        if (typeof config === 'string') {
          id = config;
        } else {
          ({ id, detail } = config);
        }
      }

      /** @type {import('./public').NotificationInstance<string, import('svelte').SvelteComponent> | undefined} */
      let pushed;
      if (id) {
        pushed = _notifications.find((n) => n.id === id);
      } else {
        pushed = _notifications.at(-1);
      }

      if (pushed) {
        pushed.$resolve(detail);
        update((prev) => {
          _notifications = _notifications.filter((n) => n.id !== pushed?.id);
          return { ...prev, notifications: _notifications };
        });
      }
    }

    /**
     * @template {Extract<keyof VariantMap, string>} Variant
     * @template {VariantMap[Variant]} [Component=VariantMap[Variant]]
     * @template [ResolveDetail=undefined | import('svelte').ComponentEvents<Component>['resolve']['detail']]
     * @overload
     * @param {Variant} variant
     * @param {import('./public').NotificationByVariantPushConfig<Variant, Component>} [config]
     * @returns {import('./public').NotificationPushOutput<Component>}
     */
    /**
     * @template {import('svelte').SvelteComponent} CustomComponent
     * @template [ResolveDetail=undefined | import('svelte').ComponentEvents<Component>['resolve']['detail']]
     * @overload
     * @param {'custom'} variant
     * @param {import('./public').NotificationCustomPushConfig<CustomComponent>} config
     * @returns {import('./public').NotificationPushOutput<CustomComponent>}
     */
    /**
     * @param {string} variant
     * @param {import('./public').NotificationByVariantPushConfig<string, import('svelte').SvelteComponent> | import('./public').NotificationCustomPushConfig<import('svelte').SvelteComponent>} [config]
     * @returns {import('./public').NotificationPushOutput<any>}
     */
    function push(variant, config) {
      // if (!_portal) {
      //   throw new Error(
      //     'Notification portal has not been registered or has unmounted. Add `use:portal={notiStore}` to an HTMLElement.',
      //   );
      // }

      // STEP 1: resolve the input config, merge with global common config from constructor
      /** @type {import('./public').NotificationInstanceConfig<string, import('svelte').SvelteComponent>} */
      let instanceConfig;
      /** @type {NonNullable<import('./public').NotificationCommonConfig<string, import('svelte').SvelteComponent>['id']>} */
      let idResolver;
      if (variant === 'custom') {
        const rConfig =
          /** @type {import('./public').NotificationCustomPushConfig<import('svelte').SvelteComponent>} */ (
            config
          );
        if (!rConfig || !rConfig.component) {
          throw new MissingComponentInCustomPush();
        }
        instanceConfig = {
          ...builder.commonConfig,
          ...rConfig,
          variant: 'custom',
          component: rConfig.component,
          props: rConfig.props ?? {},
          id: '',
        };
        idResolver = /** @type {any} */ (rConfig.id) ?? builder.commonConfig.id;
      } else {
        const variantConfig = builder.variantConfigMap[variant];
        if (!variantConfig) throw new NotFoundVariantConfig(variant, builder);
        instanceConfig = {
          ...builder.commonConfig,
          ...variantConfig,
          ...config,
          props: {
            ...variantConfig.props,
            ...config?.props,
          },
          id: '',
        };
        idResolver = /** @type {any} */ (config?.id) ?? variantConfig.id ?? builder.commonConfig.id;
      }

      // STEP 2: resolve id for the notification
      if (idResolver === 'counter') {
        instanceConfig.id = (++builder.counter).toString();
      } else if (idResolver === 'uuid') {
        instanceConfig.id =
          'crypto' in window && crypto.randomUUID
            ? crypto.randomUUID()
            : (++builder.counter).toString();
      } else {
        instanceConfig.id = idResolver(instanceConfig);
      }

      // STEP 3: prepare for the notification resolution
      /** @type {import('./public').NotificationInstance<string, import('svelte').SvelteComponent>} */
      let pushed = {
        ...instanceConfig,
        $resolve: (e) => {
          _resolve?.(e?.detail);
          return promise;
        },
      };
      /** @type {ReturnType<typeof setTimeout> | undefined} */
      let _timeoutId = undefined;
      /** @type {undefined | ((value?: ResolveDetail) => void)} */
      let _resolve = undefined;
      const promise = new Promise((resolve) => {
        _resolve = (...args) => {
          resolve(...args);

          // FIXME: outro transition will not run
          // but hopefully will be supported after this PR https://github.com/sveltejs/svelte/pull/9056
          pushed.instance?.$destroy();

          update((prev) => {
            _notifications = _notifications.filter((n) => n.id !== pushed.id);
            return { ...prev, notifications: _notifications };
          });

          _portal?.dispatchEvent(
            new CustomEvent('on:noti:pop', {
              detail: pushed,
            }),
          );
        };
      });

      // STEP 4: instantiate the svelte component
      /** @type {import('svelte').SvelteComponent | undefined} */
      let instance = undefined;
      if (_portal) {
        instance = new instanceConfig.component({
          target: _portal,
          props: {
            ...instanceConfig.props,
            notification: {
              ...pushed,
              instance,
            },
          },
          intro: true,
        });
        instance.$on('resolve', (event) => {
          clearTimeout(_timeoutId);
          _resolve?.(event.detail);
        });
      }

      // STEP 5: push to store
      pushed.instance = instance;
      update((prev) => {
        _notifications = [..._notifications, pushed];
        return { ...prev, notifications: _notifications };
      });
      _portal?.dispatchEvent(
        new CustomEvent('on:noti:push', {
          detail: pushed,
        }),
      );

      // STEP 6: start timer if any
      if (pushed.timeout) {
        _timeoutId = setTimeout(() => {
          _resolve?.();
        }, pushed.timeout);
      }

      return {
        id: pushed.id,
        resolve: () => promise,
      };
    }

    return {
      subscribe,
      get notifications() {
        return _notifications;
      },
      /** @returns {HTMLElement | null} */
      get portal() {
        return _portal;
      },
      /** @param {HTMLElement | null} node */
      set portal(node) {
        update((prev) => {
          _portal = node;
          return { ...prev, portal: _portal };
        });
      },
      push,
      pop,
    };
  }
}
