<script lang="ts">
  import ActionUsageNotice from '$client/components/ActionUsageNotice/ActionUsageNotice.svelte';
  import Code from '$client/components/Code/Code.svelte';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  // import endImage from '$shared/assets/images/scroll-lock.webp';

  import type { PageData } from './$types';
  import { codes } from './_page/codes';
  import Prepare from './_page/codes/prepare.code.svelte';
  import QuickStart from './_page/codes/quickStart.code.svelte';

  export let data: PageData;
</script>

<Installation pkg={data.package.name} />

<section>
  <h2>Quick Start</h2>
  <fieldset class="border-2 border-violet-500 p-4">
    <legend>Example</legend>
    <p class="mt-0">Hover or tab into focus to trigger tooltip</p>
    <QuickStart />
  </fieldset>
  <Code lang="svelte" code={codes.quickStart} title="using tooltip action" />
</section>

<ActionUsageNotice action={data.package.id} />

<section>
  <h2>Preparing Your Own Tooltip Action</h2>
  <fieldset class="border-2 border-violet-500 p-4">
    <legend>Example</legend>
    <p class="mt-0">Hover or tab into focus to trigger tooltip</p>
    <Prepare />
  </fieldset>
  <Code lang="svelte" code={codes.prepare.svelte} title="using prepared action" />
</section>

<!-- <img
  src={endImage}
  alt="mouse click faster"
  width="300"
  height="175"
  loading="lazy"
  decoding="async"
/>

<p>Happy locking scroll! 👨‍💻</p> -->
