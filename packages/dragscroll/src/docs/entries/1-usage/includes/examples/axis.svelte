<script lang="ts">
  import { dragscroll } from '@svelte-put/dragscroll'
</script>
<!-- ---cut--- -->
<div use:dragscroll={{ axis: 'both' }}>...</div>
<div use:dragscroll={{ axis: 'y' }}>...</div>
<div use:dragscroll={{ axis: 'x' }}>...</div> <!-- default -->