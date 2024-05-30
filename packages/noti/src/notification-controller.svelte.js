import { mount } from 'svelte';

import { MissingComponentInCustomPush, NotFoundVariantConfig } from './errors.js';
import { Notification } from './notification.svelte.js';

/**
 * @template {Record<string, import('svelte').SvelteComponent>} [VariantMap={}]
 */
export class NotificationController {
	/** @type {Record<string, import('./types.js').NotificationVariantConfig<any, any, any>>} */
	#variantConfigMap = {};
	#counter = 0;

	/**
	 * the notification stack
	 * @type {Notification<any>[]}
	 */
	// eslint-disable-next-line no-undef
	notifications = $state([]);

	/**
	 * @type {Required<import('./types.js').NotificationCommonConfig<any, any, any>>}
	 */
	// eslint-disable-next-line no-undef
	config = $state({
		id: 'uuid',
		timeout: 3000,
	});

	actions = {
		/**
		 * register the element to render a notification into
		 * @param {HTMLElement} node
		 * @param {Notification<any>} notification
		 * @returns {import('./types.js').NotificationPortalActionReturn}
		 */
		render: (node, notification) => {
			mount(notification.config.component, {
				target: node,
				props: {
					...notification.config.props,
					notification,
				},
				intro: true
			});
			return {};
		},
	};

	/**
	 * @param {Record<keyof VariantMap, import('./types.js').NotificationVariantConfig<any, any, any>>} variantConfigMap
	 * @param {import('./types.js').NotificationCommonConfig<any, any, any>} [init]
	 */
	constructor(variantConfigMap, init) {
		if (init?.id) this.config.id = init.id;
		if (init?.timeout) this.config.timeout = init.timeout;
		this.#variantConfigMap = variantConfigMap;
	}


	/**
	 * @template {Extract<keyof VariantMap, string>} Variant
	 * @template {VariantMap[Variant]} [Component=VariantMap[Variant]]
	 * @template [Resolved=undefined|Awaited<import('svelte').ComponentProps<Component>['notification']['resolution']>]
	 * @overload
	 * @param {Variant} variant
	 * @param {import('./types.js').NotificationByVariantPushConfig<Resolved, Variant, Component>} [config]
	 * @returns {Notification<Resolved>}
	 */
	/**
	 * @template {import('svelte').SvelteComponent} Component
	 * @template [Resolved=undefined|Awaited<import('svelte').ComponentProps<Component>['notification']['resolution']>]
	 * @overload
	 * @param {'custom'} variant
	 * @param {import('./types.js').NotificationCustomPushConfig<Resolved, Component>} config
	 * @returns {Notification<Resolved>}
	 */
	/**
	 * @param {string} variant
	 * @param {import('./types.js').NotificationByVariantPushConfig<any, string, import('svelte').SvelteComponent<any>> | import('./types.js').NotificationCustomPushConfig<any, import('svelte').SvelteComponent<any>>} [config]
	 * @returns {Notification<any>}
	 */
	push(variant, config) {
		// STEP 1: resolve instance config, merge with common config and variant config, if any
		/** @type {import('./types.js').NotificationInstanceConfig<any, any, any>} */
		let instanceConfig;
		/** @type {NonNullable<import('./types.js').NotificationCommonConfig<Resolved, string, import('svelte').SvelteComponent<any>>['id']>} */
		let idResolver;

		if (variant === 'custom') {
			const rConfig =
				/** @type {import('./types.js').NotificationCustomPushConfig<any, any>} */ (
					config
				);
			if (!rConfig || !rConfig.component) {
				throw new MissingComponentInCustomPush();
			}
			instanceConfig = {
				...this.config,
				...rConfig,
				variant: 'custom',
				component: rConfig.component,
				props: rConfig.props ?? {},
				id: '',
			};
			idResolver = /** @type {any} */ (rConfig.id) ?? this.config.id;
		} else {
			const variantConfig = this.#variantConfigMap[variant];
			if (!variantConfig) {
				throw new NotFoundVariantConfig(variant, Object.keys(this.#variantConfigMap));
			}
			instanceConfig = {
				...this.config,
				...variantConfig,
				...config,
				props: {
					...variantConfig.props,
					...config?.props,
				},
				id: '',
			};
			idResolver = /** @type {any} */ (config?.id) ?? variantConfig.id ?? this.config.id;
		}

		// STEP 2: resolve id for the notification
		if (idResolver === 'counter') {
			instanceConfig.id = (++this.#counter).toString();
		} else if (idResolver === 'uuid') {
			instanceConfig.id =
				'crypto' in window && crypto.randomUUID
					? crypto.randomUUID()
					: (++this.#counter).toString();
		} else {
			instanceConfig.id = idResolver(instanceConfig);
		}

		// STEP 4: preparing the `Notification` instance
		/** @type {Notification<any>} */
		let pushed = new Notification(instanceConfig);
		pushed.resolution.then(() => {
			this.notifications = this.notifications.filter((n) => n.config.id !== pushed.config.id);
		});

		// STEP 5: push to store
		this.notifications.push(pushed);

		// STEP 6: start timer if any
		pushed.resume();

		return pushed;
	}

	/**
	 * @overload
	 * @param {string} [id]
	 * @param {any} [detail]
	 * @returns {void}
	 */
	/**
	 * @overload
	 * @param {import('./types.js').NotificationPopVerboseInput} [config]
	 * @returns {void}
	 */
	/**
	 *
	 * @param {string | import('./types.js').NotificationPopVerboseInput} [config]
	 * @param {any} [resolved]
	 * @returns {void}
	 */
	pop(config, resolved) {
		/** @type {string | undefined} */
		let id = undefined;

		if (config) {
			if (typeof config === 'string') {
				id = config;
			} else {
				({ id, resolved } = config);
			}
		}

		/** @type {Notification<any> | undefined} */
		let pushed;
		if (id) {
			pushed = this.notifications.find((n) => n.config.id === id);
		} else {
			pushed = this.notifications.at(-1);
		}

		if (pushed) {
			pushed.resolve(resolved);
			this.notifications = this.notifications.filter((n) => n.config.id !== pushed.config.id);
		}
	}
}
