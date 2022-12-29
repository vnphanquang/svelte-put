/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  interface Locals {
    userId: string;
    colorScheme: import('$shared/types').ColorScheme;
  }
  interface PageData {
    colorScheme: import('$shared/types').ColorScheme;
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

declare namespace svelteHTML {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    'data-toc-disabled'?: boolean;
    'data-toc-strategy'?: 'parent' | 'self';
    'data-toc-id'?: string;
  }
}
