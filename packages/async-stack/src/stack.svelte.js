import { mount } from 'svelte';

import { MissingComponentInCustomPush, NotFoundVariantConfig } from './errors.js';
import { StackItem } from './stack-item.svelte.js';

/**
 * @template {Record<string, import('svelte').Component>} [VariantMap={}]
 */
export class Stack {
	/** @type {Record<string, import('./types.d.ts').StackItemVariantConfig<string, import('svelte').Component>>} */
	#variantConfigMap = {};
	#counter = 0;

	/**
	 * the stack items
	 * @type {StackItem<any>[]}
	 */
	// eslint-disable-next-line no-undef
	items = $state([]);

	/**
	 * @type {Required<import('./types.d.ts').StackItemCommonConfig<string, import('svelte').Component>>}
	 */
	// eslint-disable-next-line no-undef
	config = $state({
		id: 'uuid',
		timeout: 0,
	});

	actions = {
		/**
		 * register the element to render a stack item into
		 * @param {HTMLElement} node
		 * @param {StackItem<any>} item
		 * @returns {import('./types.d.ts').StackItemRenderActionReturn}
		 */
		render: (node, item) => {
			mount(item.config.component, {
				target: node,
				props: {
					...item.config.props,
					item,
				},
				intro: true
			});
			return {};
		},
	};

	/**
	 * @param {Record<keyof VariantMap, import('./types.d.ts').StackItemVariantConfig<string, import('svelte').Component>>} variantConfigMap
	 * @param {import('./types.d.ts').StackItemCommonConfig<string, import('svelte').Component>} [init]
	 */
	constructor(variantConfigMap, init) {
		if (init?.id) this.config.id = init.id;
		if (init?.timeout) this.config.timeout = init.timeout;
		this.#variantConfigMap = variantConfigMap;
	}


	/**
	 * @template {Extract<keyof VariantMap, string>} Variant
	 * @template {VariantMap[Variant]} [UserComponent=VariantMap[Variant]]
	 * @overload
	 * @param {Variant} variant
	 * @param {import('./types.d.ts').StackItemByVariantPushConfig<Variant, UserComponent>} [config]
	 * @returns {StackItem<UserComponent>}
	 */
	/**
	 * @template {import('svelte').Component} UserComponent
	 * @overload
	 * @param {'custom'} variant
	 * @param {import('./types.d.ts').StackItemCustomPushConfig<UserComponent>} config
	 * @returns {StackItem<UserComponent>}
	 */
	/**
	 * @param {string} variant
	 * @param {import('./types.d.ts').StackItemByVariantPushConfig<string, import('svelte').Component> | import('./types.d.ts').StackItemCustomPushConfig<import('svelte').Component>} [config]
	 * @returns {StackItem<any>}
	 */
	push(variant, config) {
		// STEP 1: resolve instance config, merge with common config and variant config, if any
		/** @type {import('./types.d.ts').StackItemInstanceConfig<string, import('svelte').Component>} */
		let instanceConfig;
		/** @type {NonNullable<import('./types.d.ts').StackItemCommonConfig<string, import('svelte').Component>['id']>} */
		let idResolver;

		if (variant === 'custom') {
			const rConfig =
				/** @type {import('./types.d.ts').StackItemCustomPushConfig<import('svelte').Component>} */ (
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

		// STEP 2: resolve id for the stack item
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

		// STEP 4: preparing the `StackItem` instance
		/** @type {StackItem<any>} */
		let pushed = new StackItem(instanceConfig);
		pushed.resolution.then(() => {
			this.items = this.items.filter((n) => n.config.id !== pushed.config.id);
		});

		// STEP 5: push to store
		this.items.push(pushed);

		// STEP 6: start timer if any
		pushed.resume();

		return pushed;
	}

	/**
	 * @template {import('svelte').Component} [UserComponent=import('svelte').Component]
	 * @overload
	 * @param {string} [id]
	 * @param {any} [detail]
	 * @returns {StackItem<UserComponent> | null}
	 */
	/**
	 * @template {import('svelte').Component} [UserComponent=import('svelte').Component]
	 * @overload
	 * @param {import('./types.d.ts').StackItemPopVerboseInput<UserComponent>} [config]
	 * @returns {StackItem<UserComponent> | null}
	 */
	/**
	 * @template {import('svelte').Component} [UserComponent=import('svelte').Component]
	 * @param {string | import('./types.d.ts').StackItemPopVerboseInput<UserComponent>} [config]
	 * @param {any} [resolved]
	 * @returns {StackItem<UserComponent> | null}
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

		/** @type {StackItem<UserComponent> | null} */
		let pushed = null;
		if (id) {
			pushed = this.items.find((n) => n.config.id === id) ?? null;
		} else {
			pushed = this.items.at(-1) ?? null;
		}

		if (pushed) {
			pushed.resolve(resolved);
			this.items = this.items.filter((n) => n.config.id !== pushed.config.id);
		}

		return  pushed;
	}

	/**
	 * pause a stack item, if it has a timeout
	 * @param {string} id
	 * @returns {void}
	 */
	pause(id) {
		const pushed = this.items.find((i) => i.config.id === id);
		return pushed?.pause();
	}

	/**
	 * resume a stack item, if it has been paused
	 * @param {string} id
	 * @returns {void}
	 */
	resume(id) {
		const pushed = this.items.find((i) => i.config.id === id);
		return pushed?.resume();
	}
}

