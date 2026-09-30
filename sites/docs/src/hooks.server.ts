import { sequence } from '@sveltejs/kit/hooks';
import { createColorSchemeServerHook } from '@vnphanquang/gach/hooks';

import { building } from '$app/env';
import { COOKIE_NAME_COLOR_SCHEME } from '$app/env/public';

export const handle = sequence(
	createColorSchemeServerHook({
		building,
		cookie: {
			name: COOKIE_NAME_COLOR_SCHEME,
		},
	}),
);

