import { defineEnvVars } from '@sveltejs/kit/env';
import * as v from 'valibot';

import { building, dev } from '$app/env';

export const variables = defineEnvVars({
	COOKIE_NAME_COLOR_SCHEME: {
		public: true,
		static: true,
		schema: v.optional(v.string(), 'color-scheme'),
		description: 'cookie name to store color-scheme user preference',
	},
	UMAMI_SCRIPT_URL: {
		public: true,
		schema: building || dev ? v.optional(v.string()) : v.string(),
		description: 'umami client script, leave blank to skip umami',
	},
	UMAMI_WEBSITE_ID: {
		public: true,
		schema: building || dev ? v.optional(v.string()) : v.string(),
		description: 'umami website ID, leave blank to skip umami',
	},
});
