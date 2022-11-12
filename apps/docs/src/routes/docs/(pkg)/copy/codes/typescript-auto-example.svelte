<script lang="ts">
  import { copy, type CopyDetail } from '@svelte-put/copy';

  function handleCopy(e: CustomEvent<CopyDetail>) {
    console.log(e.detail.text);
  }
</script>

<!-- on:copy should be automatically typed -->
<div use:copy on:copy={handleCopy} />
