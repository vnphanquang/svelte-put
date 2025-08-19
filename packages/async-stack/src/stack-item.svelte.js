import { tick } from 'svelte';

/**
 * @template {import('svelte').Component<any>} [UserComponent=import('svelte').Component<any>]
 * @template [Resolved=import('./types.public').ComponentResolved<UserComponent>]
 */
export class StackItem {
	/** @type {import('./types.package').StackItemState} */
	// eslint-disable-next-line no-undef
	state = $state('idle');
	/** @type {Required<import('./types.package').StackItemInstanceConfig<string, UserComponent>>} */
	config;

	#internals = {
		msToTimeout: 0,
		/** @type {ReturnType<typeof setTimeout> | undefined} */
		timeoutId: undefined,
		lastStartedTime: new Date().getTime(),
		/** @type {Set<import('./types.public').StackItemResolveListener<Resolved>>} */
		resolveListeners: new Set(),
		/** @type {(r?: Resolved) => void} */
		resolve: () => {},
	};

	/** @type {Promise<Resolved | undefined>} */
	resolution;

	/**
	 * @param {Required<import('./types.package').StackItemInstanceConfig<string, UserComponent>>} config
	 */
	constructor(config) {
		this.config = config;
		this.#internals.msToTimeout = config.timeout;

		this.resolution = new Promise((resolve) => {
			this.#internals.resolve = resolve;
		});
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
	 * @param {import('./types.public').StackItemResolveListener<Resolved>} callback
	 * @returns {() => void}
	 */
	onResolve = (callback) => {
		this.#internals.resolveListeners.add(callback);
		return () => {
			this.#internals.resolveListeners.delete(callback);
		};
	};
}
