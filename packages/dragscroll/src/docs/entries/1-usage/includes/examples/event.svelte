<script lang="ts">
  import { dragscroll } from '@svelte-put/dragscroll'
</script>
<!-- ---cut--- -->
<div use:dragscroll={{ event: 'pointer' }}>...</div>
<div use:dragscroll={{ event: 'mouse' }}>...</div> <!-- default -->