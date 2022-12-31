<script lang="ts">
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  import Github from '$client/components/icons/Github.svelte';
  import EditSquare from '$client/components/icons/material/EditSquare.svelte';

  export let packageId: string | undefined = undefined;
  export let href = '';

  $: rHref = href || getEditPageUrl(packageId);

  function getEditPageUrl(packageId = '') {
    return `https://github.com/vnphanquang/svelte-put/edit/main/apps/docs/src/routes/(main)/docs/(pkg)/${packageId}/+page.svelte`;
  }
</script>

<ResourceLink href={rHref} class="inline-flex items-center space-x-2">
  <EditSquare height="16" width="16" />
  <span> Edit this page on </span>
  <Github class="inline-block" height="16" width="16" />
</ResourceLink>
