<script lang="ts">
  import typescript from 'svelte-highlight/languages/typescript';

  import ActionUsageNotice from '$client/components/ActionUsageNotice/ActionUsageNotice.svelte';
  import Code from '$client/components/Code/Code.svelte';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  // import endImage from '$shared/assets/images/tooltip.webp';

  import type { PageData } from './$types';
  import { codes } from './_page/codes';
  import QuickStart from './_page/codes/quickStart.svelte';

  export let data: PageData;
</script>

<Installation pkg={data.package.name} />

<section>
  <h2>Quick Start</h2>
  <fieldset class="border-2 border-violet-500 p-4">
    <legend>Example</legend>
    <p class="mt-0">Click to push toast notification</p>
    <QuickStart />
  </fieldset>
  <Code lang="svelte" code={codes.quickStart} title="out-of-the-box tooltip action" />
</section>
