import { derived, writable } from 'svelte/store';

import { browser } from '$app/environment';

export interface ThemeStoreValue {
  mode: 'dark' | 'light' | 'system';
}

function getCachedTheme() {
  try {
    const json = localStorage.getItem('theme');
    if (json) {
      return JSON.parse(json) as ThemeStoreValue;
    }
  } catch (error) {
    // ignore
  }
}

function getPrefersColorScheme() {
  return browser && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setThemeMode(mode: ThemeStoreValue['mode']) {
  let rMode: Exclude<ThemeStoreValue['mode'], 'system'> = getPrefersColorScheme();
  if (mode !== 'system') {
    rMode = mode;
  }
  document.documentElement.classList.toggle('dark', rMode === 'dark');
}

const DEFAULT_THEME: ThemeStoreValue = {
  mode: 'system',
};

function createThemeStore() {
  const { subscribe, update, set } = writable<ThemeStoreValue>(DEFAULT_THEME);

  return {
    subscribe,
    initialize: async () => {
      const cached = getCachedTheme();
      if (cached) {
        await set(cached);
        setThemeMode(cached.mode);
      }
      subscribe((value) => {
        localStorage.setItem('theme', JSON.stringify(value));
      });
    },
    changeMode: (mode: ThemeStoreValue['mode']) => {
      setThemeMode(mode);
      update((value) => ({ ...value, mode }));
    },
  };
}

export const storeTheme = createThemeStore();
export const themeMode = derived(storeTheme, ($storeTheme) =>
  $storeTheme.mode === 'system' ? getPrefersColorScheme() : $storeTheme.mode,
);
