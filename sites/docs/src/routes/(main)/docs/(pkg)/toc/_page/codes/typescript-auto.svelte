<script lang="ts">
  import { toc } from '@svelte-put/toc';
</script>

<!-- on:tocinit & on:tocchange should be automatically typed -->
<div use:toc on:tocinit on:tocchange />
