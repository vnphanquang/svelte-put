import { Stack } from './stack.svelte.js';

/**
 * @template {Record<string, import('svelte').Component<any>>} [VariantMap={}]
 */
export class StackBuilder {
	/** @type {Record<string, import('./types.package').StackItemVariantConfig<string, import('svelte').Component<any>>>} */
	#variantConfigMap = {};

	/**
	 * @type {import('./types.package').StackItemCommonConfig<string, import('svelte').Component<any>> | undefined}
	 */
	#init;

	/**
	 * @param {import('./types.package').StackItemCommonConfig<string, import('svelte').Component<any>>} [init]
	 */
	constructor(init) {
		this.#init = init;
	}

	/**
	 * add config for a stack item variant
	 * @template {string} Variant
	 * @template {import('svelte').Component<any>} UserComponent
	 * @param {Variant} variant
	 * @param {UserComponent | Omit<import('./types.package').StackItemVariantConfig<Variant, UserComponent>, 'variant'>} config
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
 * @param {import('./types.package').StackItemCommonConfig<string, import('svelte').Component>} [init]
 * @returns {StackBuilder}
 */
export function stack(init) {
	return new StackBuilder(init);
}

