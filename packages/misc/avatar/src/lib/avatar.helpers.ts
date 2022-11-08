import md5 from 'md5';

import type { GravatarOptions, UIAvatarOptions } from './avatar.types';
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
