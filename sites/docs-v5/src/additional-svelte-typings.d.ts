declare module 'svelte/elements' {
	export interface SVGAttributes {
		'inline-src'?: import('./static-svg.generated.js').Source;
	}
}

export {};
