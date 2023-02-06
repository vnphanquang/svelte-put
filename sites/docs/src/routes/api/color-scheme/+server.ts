import { COOKIE_COLOR_SCHEME } from '$env/static/private';

import type { RequestHandler } from './$types';

export const POST = (async ({ request, cookies }) => {
  const colorScheme = await request.text();
  cookies.set(COOKIE_COLOR_SCHEME, colorScheme, { path: '/', secure: true, httpOnly: true });
  return new Response(colorScheme);
}) satisfies RequestHandler;
