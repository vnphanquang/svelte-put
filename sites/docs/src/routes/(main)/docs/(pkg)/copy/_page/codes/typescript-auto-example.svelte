<script lang="ts">
  import { copy, type CopyDetail } from '@svelte-put/copy';

  function handleCopied(e: CustomEvent<CopyDetail>) {
    console.log(e.detail.text);
  }
</script>

<!-- on:copied should be automatically typed -->
<div use:copy on:copied={handleCopied} />
