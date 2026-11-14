/**
 * configurations for a validation request to Cloudflare Siteverify API
 */
export interface CloudflareTurnstileValidateInput {
	/**
	 * the token generated from client-side challenge
	 */
	token: string;
	/**
	 * widget's secret key from the Cloudflare dashboard
	 */
	secret: string;
	/**
	 * visitor's IP address, if any
	 */
	ip?: string;
	/**
	 * an idempotency key, will be generated using `crypto.randomUUID`
	 * unless explicitly given, or skip if \`null\`
	 */
	key?: string | null;
	/**
	 * the Cloudflare Turnstile endpoint to send payload to
	 * @default `'https://challenges.cloudflare.com/turnstile/v0/siteverify'`
	 */
	endpoint?: string;
	/** custom fetch implementation to use, if any */
	fetch?: typeof globalThis.fetch;
}

export type CloudflareTurnstileValidateSuccess = { success: true };
export type CloudflareTurnstileValidateFailure = { success: false; codes: string[] };
export type CloudflareTurnstileValidateOutput =
	CloudflareTurnstileValidateSuccess | CloudflareTurnstileValidateFailure;
