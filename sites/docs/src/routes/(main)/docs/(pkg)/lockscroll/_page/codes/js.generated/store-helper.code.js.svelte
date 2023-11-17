<script>
  import { lockscroll, createLockScrollStore } from '@svelte-put/lockscroll';

  let locked = createLockScrollStore();
</script>

<svelte:body use:lockscroll={locked} />
<div class="flex gap-4">
  <button class="c-btn-primary" on:click={() => locked.toggle()}>Toggle lock scroll</button>
  <button class="c-btn-primary-outline" on:click={() => locked.toggle(true)}>Force locked</button>
  <button class="c-btn-primary-outline" on:click={() => locked.toggle(false)}>Force unlocked</button
  >
</div>
