import { defineEnvVars } from '@sveltejs/kit/env';
import * as v from 'valibot';

import { dev } from '$app/env';

const UmamiScriptRootSchema = v.pipe(
	v.string(),
	v.url(),
	v.transform((u) => (u.endsWith('/') ? u.slice(0, -1) : u)), // trim trailing slash
);

export const variables = defineEnvVars({
	COOKIE_NAME_COLOR_SCHEME: {
		public: true,
		static: true,
		schema: v.optional(v.string(), 'color-scheme'),
		description: 'cookie name to store color-scheme user preference',
	},
	UMAMI_SCRIPT_ROOT: {
		public: true,
		static: true,
		schema: dev ? v.optional(UmamiScriptRootSchema) : UmamiScriptRootSchema,
		description: 'umami client script root url, leave blank to skip umami',
	},
	UMAMI_WEBSITE_ID: {
		public: true,
		static: true,
		schema: dev ? v.optional(v.string()) : v.string(),
		description: 'umami website ID, leave blank to skip umami',
	},
});
