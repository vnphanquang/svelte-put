<script lang="ts">
  import { clickoutside } from '@svelte-put/clickoutside';

  function handleClickOutside(e: CustomEvent<MouseEvent>) {
    console.log(e.detail.target);
  }
</script>

<!-- on:clickoutside should be automatically typed -->
<div use:clickoutside on:clickoutside={handleClickOutside} />
