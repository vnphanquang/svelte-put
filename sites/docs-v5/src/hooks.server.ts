import type { Handle } from '@sveltejs/kit';

import { COOKIE_USER_ID } from '$env/static/private';
import { PUBLIC_COOKIE_SETTINGS_COLOR_SCHEME, PUBLIC_COOKIE_SETTINGS_PACKAGE_MANAGER } from '$env/static/public';
import { COMMON_COOKIE_CONFIG, PUBLIC_COOKIE_CONFIG } from '$lib/constants';

export const handle: Handle = async ({ event, resolve }) => {
	const { locals, url, cookies, route } = event;

	// Ensure that the user has a unique ID
	locals.userId = cookies.get(COOKIE_USER_ID) || crypto.randomUUID();
	cookies.set(COOKIE_USER_ID, locals.userId, COMMON_COOKIE_CONFIG);

	// return as is if fetching api routes
	if (route.id?.includes('(api)')) {
		return resolve(event);
	}

	locals.settings = {
		colorScheme:
			(url.searchParams.get('color-scheme') as App.ColorScheme) ||
			(cookies.get(PUBLIC_COOKIE_SETTINGS_COLOR_SCHEME) as App.ColorScheme) ||
			'system',
		packageManager: cookies.get(PUBLIC_COOKIE_SETTINGS_PACKAGE_MANAGER) as App.PackageManager || 'npm',
	};

	cookies.set(PUBLIC_COOKIE_SETTINGS_COLOR_SCHEME, locals.settings.colorScheme, PUBLIC_COOKIE_CONFIG);
	cookies.set(PUBLIC_COOKIE_SETTINGS_PACKAGE_MANAGER, locals.settings.packageManager, PUBLIC_COOKIE_CONFIG);

	return await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%color-scheme%', locals.settings.colorScheme),
	});
}
