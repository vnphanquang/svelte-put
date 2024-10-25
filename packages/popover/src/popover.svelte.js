import { on } from 'svelte/events';

/**
 * Enhance Popover API with idiomatic Svelte
 */
export class Popover {
	/** @type {ReturnType<typeof setTimeout> | undefined} */
	#hideTimeoutId = undefined;
	/** @type {ReturnType<typeof setTimeout> | undefined} */
	#showTimeoutId = undefined;

	/** @type {HTMLButtonElement | null} */
	// #controlEl = null;

	/** @type {HTMLElement | null} */
	#targetEl = null;

	// public API
	// eslint-disable-next-line no-undef
	open = $state(false);

	/** @type {import('./types.public').PopoverConfig} */
	config;
	/** @type {import('./types.public').PopoverControl} */
	control;
	/** @type {import('./types.public').PopoverTarget} */
	target;

	/**
	 * @param {import('./types.public').PopoverInit} [init]
	 */
	constructor(init = {}) {
		this.config = {
			id: init.id
				? init.id
				: 'crypto' in globalThis
					? crypto.randomUUID()
					: Math.random().toString(36).substring(2),
			inertWhenHidden: init.inertWhenHidden ?? true,
			triggers: {
				hover: {
					enabled: false,
					timeoutMs: 1000,
					delayMs: 0,
				},
				focus: {
					enabled: false,
					timeoutMs: 1000,
					delayMs: 0,
				},
			},
			plugins: [],
		};
		if (init.triggers) {
			const keys = /** @type {Array<keyof import('./types.public').PopoverConfig['triggers']>} */ (
				Object.keys(this.config.triggers)
			);
			for (const key of keys) {
				if (key in init.triggers) {
					if (typeof init.triggers[key] === 'boolean') {
						this.config.triggers[key].enabled = init.triggers[key];
					} else {
						this.config.triggers[key] = {
							...this.config.triggers[key],
							...init.triggers[key],
						};
					}
				}
			}
		}

		this.config.plugins = init.plugins
			? Array.isArray(init.plugins)
				? init.plugins
				: [init.plugins]
			: [];

		const rPlugins = this.config.plugins.map((p) => p(this.config));
		const plugined = {
			control: {
				attributes: rPlugins
					.map((p) => p.control?.attributes ?? {})
					.reduce((acc, val) => ({ ...acc, ...val }), {}),
				actions: rPlugins.map((p) => p.control?.actions ?? []).flat(),
			},
			target: {
				attributes: rPlugins
					.map((p) => p.target?.attributes ?? {})
					.reduce((acc, val) => ({ ...acc, ...val }), {}),
				actions: rPlugins.map((p) => p.target?.actions ?? []).flat(),
			},
		};

		this.control = {
			attributes: {
				popovertarget: this.config.id,
				popovertargetaction: 'show',
				...(plugined.control?.attributes ?? {}),
			},
			actions: (node) => {
				// this.#controlEl = node;

				/** @type {Array<() => void>} */
				const offs = [];

				if (this.config.triggers.focus.enabled) {
					offs.push(
						on(node, 'focusin', () => this.show(this.config.triggers.focus.delayMs)),
						on(node, 'focusout', () => this.hide(this.config.triggers.focus.timeoutMs)),
					);
				}

				if (this.config.triggers.hover.enabled) {
					offs.push(
						on(node, 'mouseenter', () => this.show(this.config.triggers.focus.delayMs)),
						on(node, 'mouseleave', () => this.hide(this.config.triggers.focus.timeoutMs)),
					);
				}

				// additional actions
				const actions = plugined.control?.actions ?? [];
				const actionReturns = actions.map((action) => action(node, this));

				return {
					update: () => {
						actionReturns.forEach((actionReturn) => actionReturn?.update?.(this));
					},
					destroy: () => {
						offs.forEach((off) => off());
						actionReturns.forEach((actionReturn) => actionReturn?.destroy?.());
					},
				};
			},
		};

		this.target = {
			attributes: {
				popover: 'auto',
				id: this.config.id,
				...(plugined.target?.attributes ?? {}),
			},
			actions: (node) => {
				this.#targetEl = node;

				// eslint-disable-next-line no-undef
				$effect.root(() => {
					// eslint-disable-next-line no-undef
					$effect(() => {
						// make popover inert when not open
						node.inert = !this.open;
					});
				});

				const offs = [
					on(node, 'toggle', (e) => {
						this.open = /** @type {ToggleEvent} */ (e).newState === 'open';
					}),
				];

				if (this.config.triggers.focus.enabled) {
					offs.push(
						on(node, 'focusin', () => this.open && this.show(this.config.triggers.focus.delayMs)),
						on(
							node,
							'focusout',
							() => this.open && this.hide(this.config.triggers.focus.timeoutMs),
						),
					);
				}

				if (this.config.triggers.hover.enabled) {
					offs.push(
						/**
						 * For touch devices, popover is opened by pressing on the control element (button)
						 * which gives it focus. So when the target element is touched within, control element
						 * loses focus, causing the `focusout` event to fire AFTER `touchstart`. The `setTimeout`
						 * call is to work around this.
						 */
						on(
							node,
							'touchstart',
							() => this.open && this.show(this.config.triggers.focus.delayMs + 100),
						),
						on(
							node,
							'mouseenter',
							() => this.open && this.show(this.config.triggers.focus.delayMs),
						),
						on(
							node,
							'mouseleave',
							() => this.open && this.hide(this.config.triggers.focus.timeoutMs),
						),
					);
				}

				// additional actions
				const actions = plugined.target?.actions ?? [];
				const actionReturns = actions.map((action) => action(node, this));

				return {
					update: () => {
						actionReturns.forEach((actionReturn) => actionReturn?.update?.(this));
					},
					destroy: () => {
						offs.forEach((off) => off());
						actionReturns.forEach((actionReturn) => actionReturn?.destroy?.());
					},
				};
			},
		};
	}

	/**
	 * @param {number} [ms] - milliseconds to delay until showing
	 */
	show = (ms = 0) => {
		clearTimeout(this.#hideTimeoutId);
		clearTimeout(this.#showTimeoutId);
		if (this.open) return;
		this.#showTimeoutId = setTimeout(() => {
			this.#showTimeoutId = undefined;
			this.#targetEl?.showPopover();
		}, ms);
	};

	/**
	 * @param {number} [ms] - milliseconds to delay until hiding
	 */
	hide = (ms = 0) => {
		clearTimeout(this.#hideTimeoutId);
		clearTimeout(this.#showTimeoutId);
		if (!this.open) return;
		this.#hideTimeoutId = setTimeout(() => {
			this.#hideTimeoutId = undefined;
			this.#targetEl?.hidePopover();
		}, ms);
	};

	toggle = () => {
		if (this.open) return this.hide();
		this.show();
	};
}
