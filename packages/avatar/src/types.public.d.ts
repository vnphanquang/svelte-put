import type { Snippet } from 'svelte';
import type { HTMLImgAttributes } from 'svelte/elements';
/**
 * URL or option to fallback when email hash returns no match from Gravatar.
 * See {@link https://en.gravatar.com/site/implement/images | Gravatar } for
 * detailed explanation of each option.
 *
 */
export type GravatarDefault =
	| '404'
	| 'mp'
	| 'identicon'
	| 'monsterid'
	| 'wavatar'
	| 'retro'
	| 'robohash'
	| 'blank'
	| `${'http' | 'https'}://${string}.${'png' | 'jpg' | 'jpeg' | 'gif'}`;

export interface GravatarOptions {
	/** email to md5-hash */
	email: string;
	/** Size in pixel, from 1px up to 2048px*/
	size?: number;
	/** fallback image. See {@link https://en.gravatar.com/site/implement/images | Gravatar } for detailed explanation */
	default?: GravatarDefault;
	/** Whether to force using default image  */
	forcedefault?: 'y';
	/** Rating to request */
	rating?: 'g' | 'pg' | 'r' | 'x';
}

/**
 * Options for building {@link https://ui-avatars.com | UIAvatar } url.
 * Each option should map to a supported UIAvatar setting item
 *
 */
export interface UIAvatarOptions {
	/** Name used to generate initials. Ex: John+Doe */
	name: string;
	/** Hex color for background, without the hash (#) */
	background?: string;
	/** Hex color for font, without the hash (#) */
	color?: string;
	/** Image size in pixels, between 16 and 512. Default to 64 */
	size?: number;
	/** Font size in percentage of size, between 0.1 and 1. Default to 0.5 */
	'font-size'?: number;
	/** Length of the generated initials. Default to 2 */
	length?: number;
	/** Whether the returnee image should be a circle. Default to false */
	rounded?: boolean;
	/** Whether the returned letters should use a bold font. Default to false */
	bold?: boolean;
	/** Whether to uppercase the initials. Default to true */
	uppercase?: boolean;
	/** Format of returned image */
	format?: 'svg' | 'png';
}

/**
 * Props to Avatar component
 */
export interface AvatarProps extends HTMLImgAttributes {
	/**
	 * "src" attribute. This option is of highest priority
	 */
	src?: string;
	/**
	 * Either the email for {@link https://en.gravatar.com/site/implement/images | Gravatar }
	 * or {@link GravatarOptions } object. This option take second priority.
	 *
	 * By default, the Gravatar `default` query is set to 404, so that if gravatar is not valid,
	 * the next priority url will be used. Be careful when setting this `default` to other values,
	 * as gravatar will then always return a valid resource, hence stopping the resolution flow
	 * (i.e uiAvatar & fallback will never be used).
	 */
	gravatar?: GravatarOptions | string;
	/**
	 * Either the name for building initials with {@link https://ui-avatars.com | UIAvatar }
	 * or {@link UIAvatarOptions } object. This option take third priority.
	 */
	uiAvatar?: string | UIAvatarOptions;
	/**
	 * The fallback url string. This option takes lowest priority.
	 * It defaults to the internal fallback (https://www.gravatar.com/avatar?d=mp).
	 * If you provide a different url that is not a valid resource, the internal fallback
	 * will be used.
	 */
	fallback?: string;
	/**
	 * value for "width" & "height" attribute of <img>.
	 * Will have no effect if default slot is overridden
	 */
	size?: number;
	/**
	 * value for "alt" attribute of <img>.
	 * Default to uiAvatar.name or gravatar.email if any.
	 * Will have no effect if default slot is overridden
	 */
	alt?: string;
	img?: Snippet<[{ src: string; size: number; alt: string; sources: string[] }]>;
}

