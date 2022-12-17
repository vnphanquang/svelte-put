<script lang="ts">
  import { intersect } from '@svelte-put/intersect';
</script>

<!-- on:intersect & on:intersectonce should be automatically typed -->
<div use:intersect on:intersect on:intersectonce />
