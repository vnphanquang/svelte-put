import type { Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';

import { COOKIE_COLOR_SCHEME, COOKIE_USER_ID } from '$env/static/private';
import { PUBLIC_COOKIE_PACKAGE_MANAGER } from '$env/static/public';
import { PACKAGE_MANAGERS, type PackageManager } from '$shared/constants';
import type { ColorScheme } from '$shared/types';

export const handle: Handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');
  event.locals.userId = cookies[COOKIE_USER_ID] || crypto.randomUUID();
  event.locals.colorScheme = (cookies[COOKIE_COLOR_SCHEME] as ColorScheme) || 'system';
  event.locals.packageManager =
    (cookies[PUBLIC_COOKIE_PACKAGE_MANAGER] as PackageManager) || PACKAGE_MANAGERS[0];

  const response = await resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace('%cookie-color-scheme%', event.locals.colorScheme),
  });

  if (!cookies[COOKIE_USER_ID]) {
    // if this is the first time the user has visited this app,
    // set a cookie so that we recognise them when they return
    response.headers.set(
      'set-cookie',
      cookie.serialize(COOKIE_USER_ID, event.locals.userId, {
        path: '/',
        httpOnly: true,
      }),
    );
  }

  return response;
};
