<script>
  import { lockscroll, createLockScrollStore } from '@svelte-put/lockscroll';

	// can be created in js/ts files or within a Svelte context
  let locked = createLockScrollStore();
</script>

<svelte:body use:lockscroll={locked} />
<div class="flex gap-4 justify-center">
  <button class="c-btn" on:click={() => locked.toggle()}>Toggle lock scroll</button>
  <button class="c-btn c-btn--outlined" on:click={() => locked.toggle(true)}>Force locked</button>
  <button class="c-btn c-btn--outlined" on:click={() => locked.toggle(false)}>Force unlocked</button
  >
</div>
