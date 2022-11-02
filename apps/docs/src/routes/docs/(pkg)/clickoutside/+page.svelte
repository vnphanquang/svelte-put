<script lang="ts">
  import typescript from 'svelte-highlight/languages/typescript';

  import ActionUsageNotice from '$lib/ui/components/ActionUsageNotice/ActionUsageNotice.svelte';
  import Code from '$lib/ui/components/Code/Code.svelte';
  import Installation from '$lib/ui/components/Installation/Installation.svelte';

  import type { PageData } from './$types';

  export let data: PageData;
</script>

<Installation pkg={data.package.name} />

<h2>Usage</h2>

<ActionUsageNotice action={data.package.id} />

<h2>Typescript Support</h2>

<p>
  Ambient types for custom events should be available automatically where <code
    >{data.package.id}</code
  > is imported.
</p>

<Code
  lang="svelte"
  code="./codes/typescript-auto-example.svelte?raw"
  title="using-clickoutside.svelte"
/>

<p>If the above is not working, fall back to this:</p>

<Code lang={typescript} code="./codes/typescript-fallback.d.ts?raw" title="src/app.d.ts" />
