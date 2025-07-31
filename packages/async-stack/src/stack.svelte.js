import { mount, tick, unmount } from 'svelte';

import { MissingComponentInCustomPush, NotFoundVariantConfig } from './errors.js';
import { StackItem } from './stack-item.svelte.js';

/**
 * @template {Record<string, import('svelte').Component<any>>} [VariantMap={}]
 */
export class Stack {
	/** @type {Record<string, import('./types.package').StackItemVariantConfig<string, import('svelte').Component<any>>>} */
	#variantConfigMap = {};
	#counter = 0;

	/** @type {StackItem<any>[]} */
	// eslint-disable-next-line no-undef
	items = $state([]);

	/** @type {Required<import('./types.package').StackItemCommonConfig<string, import('svelte').Component<any>>>} */
	// eslint-disable-next-line no-undef
	config = $state({
		id: 'uuid',
		timeout: 0,
	});

	actions = {
		/**
		 * @param {HTMLElement} node
		 * @param {StackItem<any>} item
		 * @returns {import('./types.package').StackItemRenderActionReturn}
		 */
		render: (node, item) => {
			const mounted = mount(item.config.component, {
				target: node,
				props: {
					...item.config.props,
					item,
				},
				intro: true,
			});
			tick().then(() => {
				const detail = { item };
				const event = new CustomEvent('stackitemmount', { detail });
				node.dispatchEvent(event);
			});
			return {
				destroy: async () => {
					await unmount(mounted);
					const detail = { item };
					const event = new CustomEvent('stackitemunmount', { detail });
					node.dispatchEvent(event);
				},
			};
		},
	};

	/**
	 * @param {Record<keyof VariantMap, import('./types.package').StackItemVariantConfig<string, import('svelte').Component>>} variantConfigMap
	 * @param {import('./types.package').StackItemCommonConfig<string, import('svelte').Component<any>>} [init]
	 */
	constructor(variantConfigMap, init) {
		if (init?.id) this.config.id = init.id;
		if (init?.timeout) this.config.timeout = init.timeout;
		this.#variantConfigMap = variantConfigMap;
	}

	/**
	 * @template {Extract<keyof VariantMap, string>} Variant
	 * @template {import('svelte').Component<any>} [UserComponent=VariantMap[Variant]]
	 * @param {Variant} variant
	 * @param {import('./types.package').StackItemByVariantPushConfig<Variant, UserComponent> | import('./types.package').StackItemCustomPushConfig<UserComponent>} [config]
	 * @returns {StackItem<any>}
	 */
	push(variant, config) {
		// STEP 1: resolve instance config, merge with common config and variant config, if any
		/** @type {import('./types.package').StackItemInstanceConfig<string, import('svelte').Component<any>>} */
		let instanceConfig;
		/** @type {NonNullable<import('./types.package').StackItemCommonConfig<string, import('svelte').Component>['id']>} */
		let idResolver;

		if (variant === 'custom') {
			const rConfig =
				/** @type {import('./types.package').StackItemCustomPushConfig<import('svelte').Component<any>>} */ (
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
				'crypto' in globalThis && crypto.randomUUID
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
	 * @template {import('svelte').Component<any>} [UserComponent=import('svelte').Component]
	 * @param {string | import('./types.package').StackItemPopVerboseInput<UserComponent>} [config]
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

		return pushed;
	}

	/**
	 * @param {string} [id]
	 * @returns {void}
	 */
	pause(id) {
		if (!id) {
			this.items.forEach((i) => i.pause());
		} else {
			const pushed = this.items.find((i) => i.config.id === id);
			pushed?.pause();
		}
	}

	/**
	 * @param {string} [id]
	 * @returns {void}
	 */
	resume(id) {
		if (!id) {
			this.items.forEach((i) => i.resume());
		} else {
			const pushed = this.items.find((i) => i.config.id === id);
			return pushed?.resume();
		}
	}
}
