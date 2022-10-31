<script lang="ts">
  import shell from 'svelte-highlight/languages/shell';
  import typescript from 'svelte-highlight/languages/typescript';
  import xml from 'svelte-highlight/languages/xml';

  import CodeSwitch from '$lib/ui/components/Code/CodeSwitch.svelte';

  import type { PageData } from './$types';

  export let data: PageData;
</script>

## Installation

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
