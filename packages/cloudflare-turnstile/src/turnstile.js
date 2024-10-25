/**
 * @param {HTMLElement} node
 * @returns {import('./types.public').TurnstileActionReturn}
 */
export function turnstile(node) {
	/** @type {string | undefined} */
	let widgetId = undefined;

	if (!window.turnstile) {
		const script = document.createElement('script');
		const src =
			node.getAttribute('turnstile-script-src') ??
			'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

		script.setAttribute('src', src);
		document.head.appendChild(script);
		script.addEventListener('load', load);
	} else if (!widgetId) {
		load();
	}

	/**
	 * @template {import('./types.public').TurnstileCustomEventName} E
	 * @template [D=Parameters<NonNullable<import('./types.public').TurnstileEventAttributes[`on${E}`]>>[0]['detail'] extends import('./types.public').TurnstileEventDetail<infer T extends Record<string, any>> ? T : never]
	 * @param {E} event
	 * @param {D} detail
	 */
	function dispatchEvent(event, detail) {
		/** @type {D} */
		detail = {
			widgetId,
			turnstile: window.turnstile,
			...detail,
		};
		node.dispatchEvent(new CustomEvent(event, { detail }));
	}


	function load() {
		const sitekey = node.getAttribute('turnstile-sitekey');
		if (!sitekey) throw new Error('Attribute `turnstile-sitekey` is required but not provided');

		/** @type {import('./types.public').TurnstileConfig} */
		const config = {
			// data
			sitekey,
			action: node.getAttribute('turnstile-action') ?? undefined,
			cData: node.getAttribute('turnstile-cData') ?? undefined,
			execution:
				/** @type {import('./types.public').TurnstileConfig['execution']} */ (
					node.getAttribute('turnstile-execution')
				) ?? undefined,
			theme:
				/** @type {import('./types.public').TurnstileConfig['theme']} */ (
					node.getAttribute('turnstile-theme')
				) ?? undefined,
			language: node.getAttribute('turnstile-language') ?? undefined,
			tabindex: node.hasAttribute('turnstile-tabindex')
				? parseInt(node.getAttribute('turnstile-tabindex') || '0') || 0
				: undefined,
			'response-field': node.hasAttribute('turnstile-response-field'),
			'response-field-name': node.getAttribute('turnstile-response-field-name') ?? undefined,
			size:
				/** @type {import('./types.public').TurnstileConfig['size']} */ (
					node.getAttribute('turnstile-size')
				) ?? undefined,
			retry:
				/** @type {import('./types.public').TurnstileConfig['retry']} */ (
					node.getAttribute('turnstile-retry')
				) ?? undefined,
			'retry-interval': node.hasAttribute('turnstile-retry-interval')
				? parseInt(node.getAttribute('turnstile-retry-interval') || '8000') || 8000
				: undefined,
			'refresh-expired':
				/** @type {import('./types.public').TurnstileConfig['refresh-expired']} */ (
					node.getAttribute('turnstile-refresh-expired')
				) ?? undefined,
			appearance:
				/** @type {import('./types.public').TurnstileConfig['appearance']} */ (
					node.getAttribute('turnstile-appearance')
				) ?? undefined,

			// events
			callback: (token) => {
				dispatchEvent('turnstile', { token });
				node.toggleAttribute('turnstile-rendered', true);
			},
			'error-callback': (code) => {
				dispatchEvent('turnstileerror', { code });
			},
			'expired-callback': (...params) => {
				// TODO: requires testing
				dispatchEvent('turnstileexpired', { ...(params.length ? { params } : {}) });
			},
			'before-interactive-callback': () => {
				dispatchEvent('turnstilebeforeinteractive', {});
			},
			'after-interactive-callback': () => {
				dispatchEvent('turnstileafterinteractive', {});
			},
			'unsupported-callback': (...params) => {
				// TODO: requires testing
				dispatchEvent('turnstileunsupported', { ...(params.length ? { params } : {}) });
			},
			'timeout-callback': (...params) => {
				// TODO: requires testing
				dispatchEvent('turnstiletimeout', { ...(params.length ? { params } : {}) });
			},
		};

		widgetId = window.turnstile?.render(node, config);
		if (widgetId) {
			node.setAttribute('turnstile-widget-id', widgetId);
		}
	}

	return {
		destroy() {
			if (widgetId) {
				window.turnstile?.remove(widgetId);
				widgetId = undefined;
			}
		},
	};
}

