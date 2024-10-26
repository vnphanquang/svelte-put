/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="@sveltejs/adapter-cloudflare" />

declare global {
	declare const __BUILD_TIMESTAMP__: string;

	declare module '*&imagetools' {
		const src: string;
		export default src;
	}

	namespace App {
		declare type Status = (typeof import('$lib/constants').STATUSES)[number];
		declare type ColorScheme = (typeof import('$lib/constants').COLOR_SCHEMES)[number];
		declare type PackageManager = (typeof import('$lib/constants').PACKAGE_MANAGER)[number];
		declare type Settings = {
			colorScheme: ColorScheme;
			packageManager: PackageManager;
		};

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
	}
}

export {};
