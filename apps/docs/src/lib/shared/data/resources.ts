import { pkgToPath } from './packages';
export const resources = {
  svelte: 'https://svelte.dev/',
  'svelte action': 'https://svelte.dev/docs#template-syntax-element-directives-use-action',
  'svelte-kit': 'https://kit.svelte.dev/',
  'svelte slot': 'https://svelte.dev/docs#template-syntax-slot-slot-key-value',
  'svelte style': 'https://svelte.dev/docs#component-format-style',
  'svelte --style-props':
    'https://svelte.dev/docs#template-syntax-component-directives---style-props',
  addEventListener: 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener',
  github: 'https://github.com/vnphanquang/svelte-put',
  'MIT License': 'https://opensource.org/licenses/MIT',
  'Quang Phan': 'https://github.com/vnphanquang',
  Gravatar: 'https://en.gravatar.com/site/implement/images',
  'UI Avatar': 'https://ui-avatars.com',
  typescript: 'https://www.typescriptlang.org/',
  '@microsoft/api-extractor': 'https://api-extractor.com/',
  '@microsoft/api-documenter': 'https://api-extractor.com/pages/setup/generating_docs/',
  TailwindCSS: 'https://tailwindcss.com/',
  vercel: 'https://vercel.com/',
  IntersectionObserver:
    'https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver',
  CustomEvent: 'https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent',
  ...pkgToPath,
} as const;

export type ResourceId = keyof typeof resources;
