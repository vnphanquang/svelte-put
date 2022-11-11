<script lang="ts">
  import shell from 'svelte-highlight/languages/shell';

  import Code from '$lib/ui/components/Code/Code.svelte';

  export let pkg: string;
  export let dev = true;
</script>

<section>
  <h2>Installation</h2>
  <Code
    code={{
      npm: `npm install ${dev ? '--save-dev ' : ''}${pkg}`,
      pnpm: `pnpm add ${dev ? '-D ' : ''}${pkg}`,
      yarn: `yarn add ${dev ? '-D ' : ''}${pkg}`,
    }}
    lang={shell}
    title="terminal"
  />
</section>
