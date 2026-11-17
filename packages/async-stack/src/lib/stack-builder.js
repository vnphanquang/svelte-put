/* eslint-disable jsdoc/reject-any-type */
import { Stack } from './stack.svelte.js';

/** @import { Component } from 'svelte' */
/**
 * @import {
 *	StackItemVariantConfig,
 *	StackItemCommonConfig,
 * } from './types.package'
 */

/**
 * @template {Record<string, Component<any>>} [VariantMap={}]
 */
class StackBuilder {
	/** @type {Record<string, StackItemVariantConfig<string, Component<any>>>} */
	#variantConfigMap = {};

	/**
	 * @type {StackItemCommonConfig<string, Component<any>> | undefined}
	 */
	#init;

	/**
	 * @param {StackItemCommonConfig<string, Component<any>>} [init]
	 */
	constructor(init) {
		this.#init = init;
	}

	/**
	 * add config for a stack item variant
	 * @template {string} Variant
	 * @template {Component<any>} UserComponent
	 * @param {Variant} variant
	 * @param {UserComponent | Omit<StackItemVariantConfig<Variant, UserComponent>, 'variant'>} config
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
 * @param {StackItemCommonConfig<string, Component>} [init]
 * @returns {StackBuilder}
 */
export function stack(init) {
	return new StackBuilder(init);
}
