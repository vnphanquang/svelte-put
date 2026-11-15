/* eslint-disable jsdoc/reject-any-type, svelte/prefer-svelte-reactivity */
import { tick } from 'svelte';

/** @import { Component, ComponentProps } from 'svelte' */
/**
 * @import {
 *  StackItemInstanceConfig,
 *  StackItemState,
 * } from './types.package';
 */
/**
 * @import {
 *  ComponentResolved,
 *  StackItemRender,
 *  StackItemResolveListener,
 * } from './types.public';
 */

/**
 * @template {Component<any>} [UserComponent=Component<any>]
 * @template [Resolved=ComponentResolved<UserComponent>]
 */
export class StackItem {
	/** @type {StackItemState} */
	state = $state('idle');
	/** @type {StackItemInstanceConfig<string, UserComponent>} */
	config;
	/** @type {StackItemRender<UserComponent>} */
	render;

	#internals = {
		msToTimeout: 0,
		/** @type {ReturnType<typeof setTimeout> | undefined} */
		timeoutId: undefined,
		lastStartedTime: new Date().getTime(),
		/** @type {Set<StackItemResolveListener<Resolved>>} */
		resolveListeners: new Set(),
		/** @type {(r?: Resolved) => void} */
		resolve: () => {},
	};

	/** @type {Promise<Resolved | undefined>} */
	resolution;

	/**
	 * @param {StackItemInstanceConfig<string, UserComponent>} config
	 */
	constructor(config) {
		this.config = config;
		this.#internals.msToTimeout = config.timeout;
		this.render = {
			component: this.config.component,
			props: () =>
				/** @type {ComponentProps<UserComponent>} */ ({
					...this.config.props,
					item: this,
				}),
		};

		this.resolution = new Promise((resolve) => {
			this.#internals.resolve = resolve;
		});
	}

	/**
	 * @returns {number | null}
	 */
	get progress() {
		if (this.config.timeout === 0) return null;
		if (this.state === 'elapsing') {
			const elapsedMs = Date.now() - this.#internals.lastStartedTime;
			const actualMsToTimeout = this.#internals.msToTimeout - elapsedMs;
			return (this.config.timeout - actualMsToTimeout) / this.config.timeout;
		}
		return (this.config.timeout - this.#internals.msToTimeout) / this.config.timeout;
	}

	resume = () => {
		if (this.#internals.msToTimeout <= 0 || this.state === 'elapsing') return;
		clearTimeout(this.#internals.timeoutId);
		this.#internals.lastStartedTime = new Date().getTime();
		this.#internals.timeoutId = setTimeout(async () => {
			this.#internals.msToTimeout = 0;
			await this.resolve();
			this.state = 'timeout';
		}, this.#internals.msToTimeout);
		this.state = 'elapsing';
	};

	pause = () => {
		if (this.state === 'paused' || this.state === 'idle') return;
		clearTimeout(this.#internals.timeoutId);
		this.#internals.msToTimeout -= new Date().getTime() - this.#internals.lastStartedTime;
		this.state = 'paused';
	};

	/**
	 * @param {Resolved} [resolved]
	 * @returns {Promise<Resolved | undefined>}
	 */
	resolve = async (resolved) => {
		await tick(); // make sure DOM updates are applied before resolving
		if (this.state === 'resolved' || this.state === 'timeout') return this.resolution;
		let cancelled = false;
		function cancel() {
			cancelled = true;
		}
		await Promise.all(
			Array.from(this.#internals.resolveListeners).map((callback) =>
				callback({ resolved, cancel }),
			),
		);
		if (cancelled) return;
		this.#internals.resolve(resolved);
		this.state = 'resolved';
		return this.resolution;
	};

	/**
	 * @param {StackItemResolveListener<Resolved>} callback
	 * @returns {() => void}
	 */
	onResolve = (callback) => {
		this.#internals.resolveListeners.add(callback);
		return () => {
			this.#internals.resolveListeners.delete(callback);
		};
	};
}
