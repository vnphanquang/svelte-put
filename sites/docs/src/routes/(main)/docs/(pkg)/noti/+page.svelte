<script lang="ts">
  import typescript from 'svelte-highlight/languages/typescript';

  import ActionUsageNotice from '$client/components/ActionUsageNotice/ActionUsageNotice.svelte';
  import Code from '$client/components/Code/Code.svelte';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  import endImage from '$shared/assets/images/tooltip.webp';

  import type { PageData } from './$types';

  export let data: PageData;
</script>

<Installation pkg={data.package.name} />
