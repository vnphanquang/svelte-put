import { type Cookies } from '@sveltejs/kit';

export const SOCIAL_LINKS = {
	GITHUB: 'https://github.com/vnphanquang/svelte-put',
} as const;

export const STATUSES = ['info', 'success', 'warning', 'error'] as const;
export const COLOR_SCHEMES = ['light', 'dark', 'system'] as const;
export const PACKAGE_MANAGER = ['npm', 'pnpm', 'yarn'] as const;

export const COMMON_COOKIE_CONFIG = {
	path: '/',
	secure: true,
	httpOnly: true,
	maxAge: 604800, // 7 days
} satisfies Parameters<Cookies['set']>[2];

export const PUBLIC_COOKIE_CONFIG = {
	...COMMON_COOKIE_CONFIG,
	httpOnly: false,
} satisfies Parameters<Cookies['set']>[2];
