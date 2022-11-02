<script lang="ts">
  import shell from 'svelte-highlight/languages/shell';

  import CodeSwitch from '$lib/ui/components/Code/CodeSwitch.svelte';

  export let pkg: string;
  export let dev = true;
</script>

<h2>Installation</h2>

<CodeSwitch
  codes={[
    {
      variant: 'npm',
      code: `npm install ${dev ? '--save-dev ' : ''}${pkg}`,
      lang: shell,
      title: 'terminal',
    },
    {
      variant: 'pnpm',
      code: `pnpm add ${dev ? '-D ' : ''}${pkg}`,
      lang: shell,
      title: 'terminal',
    },
    {
      variant: 'yarn',
      code: `yarn add ${dev ? '-D ' : ''}${pkg}`,
      lang: shell,
      title: 'terminal',
    },
  ]}
/>
