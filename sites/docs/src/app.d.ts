/// <reference types="umami-browser" />
/// <reference types="vite/client" />

import type { PageLinks } from '@internals/docpage';
import type { CompileTimeToc } from '@svelte-put/toc';
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
		interface PageData {
			slug?: string;
			links?: PageLinks;
			compiledToc?: CompileTimeToc;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
