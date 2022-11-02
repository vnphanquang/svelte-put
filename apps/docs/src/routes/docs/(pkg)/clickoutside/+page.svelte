<script lang="ts">
  import shell from 'svelte-highlight/languages/shell';
  import typescript from 'svelte-highlight/languages/typescript';

  import Code from '$lib/ui/components/Code/Code.svelte';
  import CodeSwitch from '$lib/ui/components/Code/CodeSwitch.svelte';

  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h2>Installation</h2>

<CodeSwitch
  codes={[
    {
      variant: 'npm',
      code: `npm install --save-dev ${data.package.name}`,
      lang: shell,
      title: 'terminal',
    },
    {
      variant: 'pnpm',
      code: `pnpm add -D ${data.package.name}`,
      lang: shell,
      title: 'terminal',
    },
    {
      variant: 'yarn',
      code: `yarn add -D ${data.package.name}`,
      lang: shell,
      title: 'terminal',
    },
  ]}
/>

<h2>Usage</h2>

<h2>Typescript Support</h2>

<p>
  Ambient types for custom events should be available automatically where `clickoutside` is
  imported.
</p>

<Code
  lang="svelte"
  code="./codes/typescript-auto-example.svelte?raw"
  title="using-clickoutside.svelte"
/>

<p>If the above is not working, fall back to this:</p>

<Code lang={typescript} code="./codes/typescript-fallback.d.ts?raw" title="src/app.d.ts" />
