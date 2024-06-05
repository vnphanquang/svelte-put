<script lang="ts">
  import { clickoutside } from '@svelte-put/clickoutside';

  function doSomething(e: CustomEvent<MouseEvent>) {
    console.log(e.target);
  }
</script>

<div use:clickoutside onclickoutside={doSomething}>...</div>