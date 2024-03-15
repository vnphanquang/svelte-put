import { getContext, setContext } from 'svelte';
import { derived, writable } from 'svelte/store';

import { browser } from '$app/environment';
import { PUBLIC_COOKIE_SETTINGS_COLOR_SCHEME, PUBLIC_COOKIE_SETTINGS_PACKAGE_MANAGER } from '$env/static/public';

const SETTINGS_CONTEXT_ID = 'settings';

export const DEFAULT_SETTINGS = {
	colorScheme: 'system',
	packageManger: 'npm',
} satisfies App.Settings;

/**
 * requires `window.matchMedia` (only in browser context)
 * @returns user's color scheme preference
 */
function getPrefersColorScheme() {
	if (!browser) return 'light';
	return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function createColorSchemeStore(initial: App.ColorScheme) {
	const store = writable<App.ColorScheme>(initial);

	const preferred = derived(store, (c) => (c === 'system' ? getPrefersColorScheme() : c));

	return {
		subscribe: store.subscribe,
		set(scheme: App.ColorScheme) {
			if (browser) {
				document.documentElement.dataset.colorScheme = scheme;
				document.cookie = `${PUBLIC_COOKIE_SETTINGS_COLOR_SCHEME}=${scheme}; path=/; SameSite=Lax; Secure; Max-Age=604800`;
			}
			store.set(scheme);
		},
		preferred,
	};
}

function createPackageManagerStore(initial: App.PackageManager) {
	const store = writable<App.PackageManager>(initial);
	return {
		subscribe: store.subscribe,
		set(pm: App.PackageManager) {
			if (browser) {
				document.cookie = `${PUBLIC_COOKIE_SETTINGS_PACKAGE_MANAGER}=${pm}; path=/; SameSite=Lax; Secure; Max-Age=604800`;
			}
		}
	};
}

export function setSettingsContext(initial: App.Settings) {
	const colorScheme = createColorSchemeStore(initial.colorScheme);
	const packageManger = createPackageManagerStore(initial.packageManger);

	return setContext(SETTINGS_CONTEXT_ID, {
		colorScheme,
		packageManger,
	});
}

export function getSettingsContext() {
	return getContext<ReturnType<typeof setSettingsContext>>(SETTINGS_CONTEXT_ID);
}
