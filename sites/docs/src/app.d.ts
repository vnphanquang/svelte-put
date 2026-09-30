/// <reference types="umami-browser" />
/// <reference types="vite/client" />

import type { ColorScheme } from '@vnphanquang/gach/constants';

declare global {
	interface Window {
		umami?: umami.umami;
	}

	namespace App {
		// interface Error {}
		interface Locals {
			colorScheme: ColorScheme;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

