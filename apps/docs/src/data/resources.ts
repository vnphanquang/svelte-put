export const resources = {
  svelte: 'https://svelte.dev/',
  'svelte action': 'https://svelte.dev/docs#template-syntax-element-directives-use-action',
  'svelte-kit': 'https://kit.svelte.dev/',
} as const;

export type ResourceId = keyof typeof resources;
