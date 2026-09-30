import { getRequestEvent, query } from '$app/server';

export const getPreferences = query(() => {
	const { locals } = getRequestEvent();
	return { colorScheme: locals.colorScheme };
});
