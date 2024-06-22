/**
 * @template {import('svelte').Component} [UserComponent=import('svelte').Component]
 * @template [Resolved=import('./types.d.ts').ComponentResolved<UserComponent>]
 */
export class StackItem {
	/** @type {import('./types.d.ts').StackItemState} */
	// eslint-disable-next-line no-undef
	state = $state('idle');
	/** @type {Required<import('./types.d.ts').StackItemInstanceConfig<string, UserComponent>>} */
	config;

	#internals = {
		msToTimeout: 0,
		/** @type {ReturnType<typeof setTimeout> | undefined} */
		timeoutId: undefined,
		lastStartedTime: new Date().getTime(),
		/** @type {(r?: Resolved) => void} */
		resolve: () => {},
	};

	/**
	 * a promise that resolves when the item is popped or resolved via the .resolve method
	 * @type {Promise<Resolved | undefined>}
	 */
	resolution;

	/**
	 * @param {Required<import('./types.d.ts').StackItemInstanceConfig<string, UserComponent>>} config
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
		this.#internals.timeoutId = setTimeout(() => {
			this.#internals.msToTimeout = 0;
			this.#internals.resolve();
			this.state = 'timeout';
		}, this.#internals.msToTimeout);
		this.state = 'elapsing';
	}

	pause = () => {
		if (this.state === 'paused' || this.state === 'idle') return;
		clearTimeout(this.#internals.timeoutId);
		this.#internals.msToTimeout -= new Date().getTime() - this.#internals.lastStartedTime;
		this.state = 'paused';
	}

	/**
	 * @param {Resolved} [resolved]
	 * @returns {Promise<Resolved | undefined>}
	 */
	resolve = (resolved) => {
		if (this.state === 'resolved') return this.resolution;
		this.#internals.resolve(resolved);
		this.state = 'resolved';
		return this.resolution;
	}
}

