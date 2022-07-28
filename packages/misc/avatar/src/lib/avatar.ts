import md5 from 'md5';

/**
 * Slots of Avatar component
 * @public
 */
export interface AvatarSlots {
  default: {
    /** The resolved avatar url */
    src: string;
  };
}

/**
 * Props to Avatar component
 * @public
 */
export interface AvatarProps {
  /**
   * "src" attribute. This option is of highest priority
   */
  src?: string;
  /**
   * Either the email for {@link https://en.gravatar.com/site/implement/images | Gravatar }
   * or {@link GravatarOptions } object. This option take second priority.
   *
   * @remarks
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
  class?: string;
}

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
  const hash = md5(email.trim().toLowerCase());

  let output = `https://www.gravatar.com/avatar/${hash}?`;
  for (const [parameter, value] of Object.entries(options)) {
    output += `&${parameter.charAt(0)}=${value.toString()}`;
  }

  return output;
}
