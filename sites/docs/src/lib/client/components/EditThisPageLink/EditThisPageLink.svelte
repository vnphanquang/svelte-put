<script lang="ts">
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';

  export let packageId: string | undefined = undefined;
  export let href = '';

  $: rHref = href || getEditPageUrl(packageId);

  function getEditPageUrl(packageId = '') {
    return `https://github.com/vnphanquang/svelte-put/edit/main/sites/docs/src/routes/(main)/docs/(pkg)/${packageId}/+page.svelte`;
  }
</script>

<ResourceLink href={rHref} class="inline-flex items-center space-x-2">
  <svg inline-src="google/edit-square" height="16" width="16" />
  <span> Edit this page on </span>
  <svg inline-src="simpleicon/github" height="16" width="16" />
</ResourceLink>
