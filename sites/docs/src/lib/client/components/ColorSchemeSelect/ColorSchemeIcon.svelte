<script lang="ts">
  import type { ColorScheme } from '$shared/types';

  export let scheme: ColorScheme;
</script>

{#if scheme === 'light'}
  <svg data-inline-src="google/light-mode" height="24" width="24" />
{:else if scheme === 'dark'}
  <svg data-inline-src="google/dark-mode" height="24" width="24" />
{:else}
  <svg data-inline-src="google/settings-suggest" height="24" width="24" />
{/if}
