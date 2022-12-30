<script lang="ts">
  import { movable } from '@svelte-put/movable';
</script>

<!-- on:movablestart & on:movableend should be automatically typed -->
<div use:movable on:movablestart on:movableend />
