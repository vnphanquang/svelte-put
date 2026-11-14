/** @import { CloudflareTurnstileValidateInput, CloudflareTurnstileValidateOutput } from './types.public' */

/**
 * @typedef CloudflareTokenValidateResponse
 * @property {boolean} success
 * @property {string} action
 * @property {number} cdata
 * @property {string[]} error-codes
 */

/**
 * @experimental
 * validate a Cloudflare Turnstile token on the server
 *
 * @param {CloudflareTurnstileValidateInput} input
 * @returns {Promise<CloudflareTurnstileValidateOutput>}
 */
export async function validate(input) {
	const { token, secret, ip, key, endpoint } = input;

	const formData = new FormData();
	formData.append('secret', secret);
	formData.append('response', token);

	if (key !== null) {
		formData.append(
			'idempotency_key',
			key ??
				('crypto' in globalThis ? crypto.randomUUID() : Math.random().toString(36).substring(2)),
		);
	}

	if (ip) {
		formData.append('remoteip', ip);
	}

	const response = await (input.fetch ?? fetch)(
		endpoint ?? 'https://challenges.cloudflare.com/turnstile/v0/siteverify',
		{
			method: 'POST',
			body: formData,
		},
	);
	const data = /** @type {CloudflareTokenValidateResponse} */ (await response.json());

	return {
		success: data.success,
		codes: data['error-codes'],
	};
}

export * from './types.public.js';
