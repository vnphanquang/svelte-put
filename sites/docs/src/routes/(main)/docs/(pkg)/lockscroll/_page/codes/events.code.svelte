<script lang="ts">
  import { lockscroll, type LockScrollDetail } from '@svelte-put/lockscroll';

  let locked = false;
  function toggleLockScroll() {
    locked = !locked;
  }

  function onToggleLockScroll(e: CustomEvent<LockScrollDetail>) {
    console.log('New scroll lock state:', e.detail.locked);
  }
</script>

<!-- event should be automatically typed if used in Typescript -->
<svelte:body use:lockscroll={locked} on:lockscroll:toggle={onToggleLockScroll} />
<button class="c-btn-primary" on:click={toggleLockScroll}>Toggle lock scroll</button>
