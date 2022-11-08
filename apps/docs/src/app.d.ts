/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Locals {}
  interface PageData {
    meta?: {
      title?: string;
      description?: string;
      keywords?: string[];
      og?: {
        title?: string;
        description?: string;
        type?: 'website' | 'article' | 'profile';
        image?: string;
        url?: string;
      };
      twitter?: {
        card?: string;
        imageAlt?: string;
        site?: string;
      };
    };
  }
  // interface Error {}
  // interface Platform {}
}
