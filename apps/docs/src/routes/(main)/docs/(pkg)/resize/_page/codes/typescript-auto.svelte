<script lang="ts">
  import { resize } from '@svelte-put/resize';
</script>

<!-- on:resized should be automatically typed -->
<div use:resize on:resized />
