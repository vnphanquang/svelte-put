import {
  gravatar as constructGravatarUrl,
  uiAvatar as constructUIAvatarUrl,
} from './avatar.helpers';
import type { AvatarProps } from './avatar.types';

/**
 * @internal
 */
function getSizeFromUrl(url: string): number | undefined {
  const matchS = url.match(/s=(\d+)/g) ?? [];
  const matchSize = url.match(/size=(\d+)/g) ?? [];
  const match = [...matchS, ...matchSize].filter((m) => url[url.indexOf(m) - 1] !== '-');
  if (match) {
    return Number(match[0].split('=')[1]);
  }
  return undefined;
}

/**
 * @internal
 */
function nonNullableFilter<TValue>(value: TValue | null | undefined): value is TValue {
  if (value === null || value === undefined) return false;
  return true;
}

/**
 * @internal
 */
export function resolveAlt(
  alt?: string,
  gravatar?: AvatarProps['gravatar'],
  uiAvatar?: AvatarProps['uiAvatar'],
): string {
  if (alt) return alt;
  if (typeof gravatar === 'object' && gravatar.email) return gravatar.email;
  if (typeof uiAvatar === 'object' && uiAvatar.name) return uiAvatar.name;
  if (typeof uiAvatar === 'string') return uiAvatar;
  return '';
}

/**
 * @internal
 */
export function resolveSize(
  fallback: number,
  size?: number,
  src?: string,
  gravatar?: AvatarProps['gravatar'],
  uiAvatar?: AvatarProps['uiAvatar'],
): number {
  try {
    if (size) return size;
    if (gravatar && typeof gravatar === 'object' && gravatar.size) return gravatar.size;
    if (uiAvatar && typeof uiAvatar === 'object' && uiAvatar.size) return uiAvatar.size;
    if (src) return getSizeFromUrl(src) || fallback;
    return fallback;
  } catch (error) {
    return fallback;
  }
}

export const DEFINITIVE_FALLBACK = 'https://www.gravatar.com/avatar?d=mp';
export function resolveSrc(
  src: string,
  gravatar: AvatarProps['gravatar'],
  uiAvatar: AvatarProps['uiAvatar'],
  fallback: string,
): string[] {
  const rUIAvatar = uiAvatar ? constructUIAvatarUrl(uiAvatar) : null;
  let rGravatar: string | null = null;
  const rFallback: string | null = fallback === DEFINITIVE_FALLBACK ? null : fallback;
  if (gravatar) {
    if (rUIAvatar || rFallback) {
      if (typeof gravatar === 'object' && !gravatar.default) {
        gravatar.default = '404';
      } else {
        gravatar = {
          email: gravatar,
          default: '404',
        } as typeof gravatar;
      }
    }
    rGravatar = constructGravatarUrl(gravatar);
  }

  return [src, rGravatar, rUIAvatar, rFallback].filter(nonNullableFilter);
}
