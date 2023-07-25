<script lang="ts">
  import ActionUsageNotice from '$client/components/ActionUsageNotice/ActionUsageNotice.svelte';
  import Code from '$client/components/Code/Code.svelte';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';

  import type { PageData } from './$types';
  import Compose from './_page/code/compose.svelte';
  import QuickStart from './_page/code/quickStart.svelte';

  export let data: PageData;
</script>

<Installation pkg={data.package.name} />

<section>
  <h2>Quick Start</h2>

  <QuickStart />
</section>

<ActionUsageNotice action={data.package.id} />

<section>
  <h2>Composing Action</h2>
  <Compose />
</section>
