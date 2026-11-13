<script lang="ts">
  import { lockscroll, type LockScrollDetail } from '@svelte-put/lockscroll';

	let locked = $state(false)
  function onToggleLockScroll(e: CustomEvent<LockScrollDetail>) {
    console.log('New scroll lock state:', e.detail.locked);
  }
</script>

<!-- event should be automatically typed if used in Typescript -->
<svelte:body use:lockscroll={locked} onlockscrolltoggle={onToggleLockScroll} />