<script>
  import { clickoutside } from '@svelte-put/clickoutside';
  function doSomething(e) {
    console.log(e.target);
  }
</script>

<div use:clickoutside on:clickoutside={doSomething} />
