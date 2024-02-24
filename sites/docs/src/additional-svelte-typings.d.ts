declare module 'svelte/elements' {
	export interface SVGAttributes {
		'inline-src'?: string;
	}

	export interface HTMLAnchorAttributes {
		external?: boolean;
	}
}

export {};
