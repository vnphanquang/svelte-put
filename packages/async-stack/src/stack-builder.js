import { Stack } from './stack.svelte.js';

/**
 * @template {Record<string, import('svelte').Component>} [VariantMap={}]
 */
export class StackBuilder {
	/** @type {Record<string, import('./types').StackItemVariantConfig<any, any, any>>} */
	#variantConfigMap = {};

	/**
	 * @type {import('./types').StackItemCommonConfig<any, any, any> | undefined}
	 */
	#init;

	/**
	 * @param {import('./types').StackItemCommonConfig<any, any, any>} [init]
	 */
	constructor(init) {
		this.#init = init;
	}

	/**
	 * add config for a stack item variant
	 * @template Resolved
	 * @template {string} Variant
	 * @template {import('svelte').Component} UserComponent
	 * @param {Variant} variant
	 * @param {UserComponent | Omit<import('./types').StackItemVariantConfig<Resolved, Variant, UserComponent>, 'variant'>} config
	 * @returns {StackBuilder<VariantMap & Record<Variant, UserComponent>> }
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
	 * Build the actual stack
	 * @returns {Stack<VariantMap>}
	 */
	build() {
		return new Stack(/** @type {any} */ (this.#variantConfigMap), this.#init);
	}
}

/**
 * @param {import('./types').StackItemCommonConfig<any, any, any>} [init]
 * @returns {StackBuilder}
 */
export function stack(init) {
	return new StackBuilder(init);
}

