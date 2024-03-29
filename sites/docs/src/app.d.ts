/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="@sveltejs/adapter-cloudflare" />

import type { COLOR_SCHEMES, STATUSES, PACKAGE_MANAGER } from '$lib/constants';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	declare const __BUILD_TIMESTAMP__: string;

	declare module '*&imagetools' {
		const src: string;
		export default src;
	}

	/**
	 * Svelte fails to automatically type imported mdsvex-svelte hybrid files
	 * that have code blocks in it. This module is a workaround for that
	 */
	declare module '*.svelte?mdsvex' {
		const component: import('svelte').ComponentType<import('svelte').SvelteComponent>;

		export default component;
	}

	namespace App {
		declare type Status = (typeof STATUSES)[number];
		declare type ColorScheme = (typeof COLOR_SCHEMES)[number];
		declare type PackageManager = (typeof PACKAGE_MANAGER)[number];
		declare type Settings = {
			colorScheme: ColorScheme;
			packageManager: PackageManager;
		}

		interface Locals {
			userId: string;
			settings: Settings;
		}
		interface PageData {
			settings: Settings;
			meta?: {
				title?: string;
				description?: string;
				keywords?: string[];
				canonical?: string;
				og?: {
					title?: string;
					description?: string;
					type?: 'website' | 'article' | 'profile';
					image?: string;
					imageAlt?: string;
					url?: string;
				};
				twitter?: {
					title?: string;
					description?: string;
					card?: string;
					image?: string;
					imageAlt?: string;
					site?: string;
					creator?: string;
				};
			};
		}
		// interface PageState {}
		// interface Platform {}
		// interface Error {}
	}
}

export {};
