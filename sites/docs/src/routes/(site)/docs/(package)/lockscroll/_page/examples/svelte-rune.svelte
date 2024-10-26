<script>
	import { lockscroll } from '@svelte-put/lockscroll';

	class ScrollLock {
		locked = $state(false);

		toggle(force = !this.locked) {
			this.locked = force;
		}
	}

	const lock = new ScrollLock();
</script>

<svelte:body use:lockscroll={lock.locked} />
<div class="flex justify-center gap-4">
	<button class="c-btn" onclick={() => lock.toggle()}>Toggle lock scroll</button>
	<button class="c-btn c-btn--outlined" onclick={() => lock.toggle(true)}>Force locked</button>
	<button class="c-btn c-btn--outlined" onclick={() => lock.toggle(false)}>Force unlocked</button>
</div>
