<script lang="ts">
  import ResourceLink from '$lib/ui/components/ResourceLink/ResourceLink.svelte';
  import EditSquare from '$lib/ui/components/icons/material/EditSquare.svelte';

  export let packageId: string | undefined = undefined;
  export let href = '';

  $: rHref = href || getEditPageUrl(packageId);

  function getEditPageUrl(packageId = '') {
    return `https://github.com/vnphanquang/svelte-put/edit/main/apps/docs/src/routes/docs/(pkg)/${packageId}/+page.svelte`;
  }
</script>

<ResourceLink href={rHref} class="inline-flex items-center space-x-2">
  <EditSquare height="16" width="16" />
  <span> Edit this page on github </span>
</ResourceLink>
