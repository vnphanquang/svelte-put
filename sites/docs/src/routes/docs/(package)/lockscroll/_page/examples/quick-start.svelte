<script>
  import { lockscroll } from '@svelte-put/lockscroll';

  let locked = false;
  function toggleLockScroll() {
    locked = !locked;
  }
</script>

<svelte:body use:lockscroll={locked} />
<button class="c-btn mx-auto" on:click={toggleLockScroll}>Toggle lock scroll on body</button>