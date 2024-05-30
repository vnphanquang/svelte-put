import { NotificationController } from './notification-controller.svelte.js';

/**
 * @template {Record<string, import('svelte').SvelteComponent<any>>} [VariantMap={}]
 */
export class NotificationControllerBuilder {
	/** @type {Record<string, import('./types').NotificationVariantConfig<any, any, any>>} */
	#variantConfigMap = {};

	/**
	 * @type {import('./types').NotificationCommonConfig<any, any, any> | undefined}
	 */
	#init;

	/**
	 * @param {import('./types').NotificationCommonConfig<any, any, any>} [init]
	 */
	constructor(init) {
		this.#init = init;
	}

	/**
	 * add config for a notification variant
	 * @template Resolved
	 * @template {string} Variant
	 * @template {import('svelte').SvelteComponent<import('./types').NotificationProps<Resolved>>} Component
	 * @param {Variant} variant
	 * @param {import('svelte').ComponentType<Component> | Omit<import('./types').NotificationVariantConfig<Resolved, Variant, Component>, 'variant'>} config
	 * @returns {NotificationControllerBuilder<VariantMap & Record<Variant, Component>> }
	 */
	addVariant(variant, config) {
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
	 * @returns {NotificationController<VariantMap>}
	 */
	build() {
		return new NotificationController(/** @type {any} */(this.#variantConfigMap), this.#init);
	}
}

/**
 * @param {import('./types').NotificationCommonConfig<any, any, any>} [init]
 * @returns {NotificationControllerBuilder}
 */
export function controller(init) {
	return new NotificationControllerBuilder(init);
}
