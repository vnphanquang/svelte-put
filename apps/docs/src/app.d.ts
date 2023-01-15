/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

import type { TocDataAttributes } from '@svelte-put/toc';

import type { ColorScheme } from '$shared/types';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
  namespace App {
    interface Locals {
      userId: string;
      colorScheme: ColorScheme;
    }
    interface PageData {
      colorScheme: ColorScheme;
      vercelAnalyticsId?: string;
      meta?: {
        title?: string;
        description?: string;
        keywords?: string[];
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
          img?: string;
          imageAlt?: string;
          site?: string;
        };
      };
    }
    // interface Error {}
    // interface Platform {}
  }
}

declare namespace svelteHTML {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-interface
  interface HTMLAttributes<T> extends TocDataAttributes {}
}

declare module '*.svelte';
