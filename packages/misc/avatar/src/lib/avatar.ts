import md5 from 'md5';

/**
 * URL or option to fallback when email hash returns no match from Gravatar.
 * See {@link https://en.gravatar.com/site/implement/images | Gravatar } for
 * detailed explanation of each option.
 * @public
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

/**
 * Options for building {@link https://en.gravatar.com/site/implement/images | Gravatar } url.
 * Each option should map to a supported Gravatar query param
 * @public
 */
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
 * @public
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
 * Builds a {@link https://ui-avatars.com | UIAvatar } url
 * @public
 *
 * @param input - name for UIAvatar or object of options
 * @returns UIAvatar url
 */
export function uiAvatar(input: string | UIAvatarOptions): string {
  let output = '';
  if (typeof input === 'string') {
    output = `https://ui-avatars.com/api/?name=${input}`;
  } else {
    const { name, ...options } = input;
    output = `https://ui-avatars.com/api/?name=${name}`;

    for (const [parameter, value] of Object.entries(options)) {
      output += `&${parameter}=${value.toString()}`;
    }
  }

  return output;
}

/**
 * Builds a {@link https://en.gravatar.com/site/implement/images | Gravatar } url
 * @public
 *
 * @param input - email for Gravatar or object of options
 * @returns Gravatar url
 */
export function gravatar(input: string | GravatarOptions): string {
  let email = '';
  let options: Omit<GravatarOptions, 'email'> = {};
  if (typeof input === 'string') {
    email = input;
  } else {
    ({ email, ...options } = input);
  }
  email = md5(email);

  let output = `https://www.gravatar.com/avatar/${email.trim().toLowerCase()}?`;
  for (const [parameter, value] of Object.entries(options)) {
    output += `&${parameter.charAt(0)}=${value.toString()}`;
  }

  return output;
}
