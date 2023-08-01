import { writable } from 'svelte/store';

let globalCounter = 0;

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
  #commonConfig = {
    id: 'uuid',
    timeout: 3000,
  };

  /** @type {Record<string, import('./public').NotificationVariantConfig<string, import('svelte').SvelteComponent>>} */
  #variantConfigMap = {};

  /**
   * @param {import('./public').NotificationCommonConfig<string, import('svelte').SvelteComponent>} config
   */
  constructor(config) {
    this.#commonConfig = {
      ...this.#commonConfig,
      ...config,
    };
    this.#variantConfigMap = {};
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
      this.#variantConfigMap[variant] = /** @type {any} */ ({
        ...config,
        variant,
      });
    } else {
      this.#variantConfigMap[variant] = /** @type {any} */ ({
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
    const variantConfigMap = this.#variantConfigMap;
    const commonConfig = this.#commonConfig;

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

    /**
     * @template {Extract<keyof VariantMap, string>} Variant
     * @template {VariantMap[Variant]} [Component=VariantMap[Variant]]
     * @overload
     * @param {Variant} variant
     * @param {import('./public').NotificationByVariantPushConfig<Variant, Component>} [config]
     * @returns {any}
     */
    /**
     * @template {import('svelte').SvelteComponent} CustomComponent
     * @overload
     * @param {'custom'} variant
     * @param {import('./public').NotificationCustomPushConfig<CustomComponent>} config
     * @returns {any}
     */
    /**
     * @param {string} variant
     * @param {import('./public').NotificationByVariantPushConfig<string, import('svelte').SvelteComponent> | import('./public').NotificationCustomPushConfig<import('svelte').SvelteComponent>} [config]
     * @returns {any}
     */
    function push(variant, config) {
      if (!_portal) {
        throw new Error(
          'Notification portal has not been registered or has unmounted. Add `use:portal={notiStore}` to an HTMLElement.',
        );
      }

      // STEP 1: resolve the input config, merge with global common config from constructor
      /** @type {import('./public').NotificationInstanceConfig<string, import('svelte').SvelteComponent>} */
      let instanceConfig;
      if (variant === 'custom') {
        const rConfig =
          /** @type {import('./public').NotificationCustomPushConfig<import('svelte').SvelteComponent>} */ (
            config
          );
        if (!rConfig || !rConfig.component) {
          throw new Error(
            'Notification custom push must have a config with at least component specified.',
          );
        }
        instanceConfig = {
          ...commonConfig,
          ...rConfig,
          variant: 'custom',
          component: rConfig.component,
          props: rConfig.props ?? {},
          id: '',
        };
      } else {
        const variantConfig = variantConfigMap[variant];
        if (!variantConfig)
          throw new Error(
            `No prebuilt config matches with provided variant. Variant should be on of {'custom', ${Object.keys(
              variantConfigMap,
            ).join(', ')}}`,
          );
        instanceConfig = {
          ...commonConfig,
          ...variantConfig,
          ...config,
          props: {
            ...variantConfig.props,
            ...config?.props,
          },
          id: '',
        };
      }

      // STEP 2: resolve id for the notification
      const idResolver =
        /** @type {import('./public').NotificationCommonConfig<string, import('svelte').SvelteComponent>['id']} */ (
          config?.id
        ) ?? commonConfig.id;
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

      // STEP 3: prepare for the notification resolution
      /** @type {import('./public').PushedNotification<string, import('svelte').SvelteComponent>} */
      let pushed;
      /** @type {ReturnType<typeof setTimeout> | undefined} */
      let _timeoutId = undefined;
      /** @type {undefined | ((value?: unknown) => void)} */
      let _resolve = undefined;
      const promise = new Promise((resolve) => {
        _resolve = (...args) => {
          resolve(...args);
          pushed.instance.$destroy();
          _portal?.dispatchEvent(
            new CustomEvent('on:noti:pop', {
              detail: pushed,
            }),
          );
        };
      });

      // STEP 4: instantiate the svelte component
      const instance = new instanceConfig.component({
        target: _portal,
        props: {
          ...instanceConfig.props,
          config: instanceConfig,
        },
      });
      instance.$on('resolve', (event) => {
        clearTimeout(_timeoutId);
        _resolve?.(event.detail);
      });

      // STEP 5: push to store
      pushed = {
        ...instanceConfig,
        instance,
      };
      update((prev) => {
        _notifications = [..._notifications, pushed];
        return { ...prev, _notifications };
      });
      _portal.dispatchEvent(
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
    };
  }
}
