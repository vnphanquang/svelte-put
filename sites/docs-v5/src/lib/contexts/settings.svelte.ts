import { getContext, setContext } from 'svelte';

import { browser } from '$app/environment';
import { PUBLIC_COOKIE_SETTINGS_COLOR_SCHEME, PUBLIC_COOKIE_SETTINGS_PACKAGE_MANAGER } from '$env/static/public';

const SETTINGS_CONTEXT_ID = 'settings';

export const DEFAULT_SETTINGS = {
	colorScheme: 'system',
	packageManager: 'npm',
} satisfies App.Settings;

/**
 * requires `window.matchMedia` (only in browser context)
 * @returns user's color scheme preference
 */
function getPreferredColorScheme() {
	if (!browser) return 'light';
	return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export class Settings {
	colorScheme: App.ColorScheme = $state(DEFAULT_SETTINGS.colorScheme);
	preferredColorScheme = $derived.by(() => {
		if (this.colorScheme === 'system') return getPreferredColorScheme();
		return this.colorScheme;
	});
	packageManager: App.PackageManager = $state(DEFAULT_SETTINGS.packageManager);

	constructor(init: App.Settings) {
		this.colorScheme = init.colorScheme;
		this.packageManager = init.packageManager;

		// persist color scheme to cookie
		$effect(() => {
			if (browser) {
				document.documentElement.dataset.colorScheme = this.colorScheme;
				document.cookie = `${PUBLIC_COOKIE_SETTINGS_COLOR_SCHEME}=${this.colorScheme}; path=/; SameSite=Lax; Secure; Max-Age=604800`;
			}
		});

		// persist package manager to cookie
		$effect(() => {
			if (browser) {
				this.packageManager = init.packageManager;
				document.cookie = `${PUBLIC_COOKIE_SETTINGS_PACKAGE_MANAGER}=${this.packageManager}; path=/; SameSite=Lax; Secure; Max-Age=604800`;
			}
		});
	}

	static createContext(init: App.Settings) {
		return setContext(SETTINGS_CONTEXT_ID, new Settings(init));
	}

	static getContext() {
		return getContext(SETTINGS_CONTEXT_ID) as Settings;
	}
}

