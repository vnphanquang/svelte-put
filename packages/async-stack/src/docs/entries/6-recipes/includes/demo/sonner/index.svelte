<script lang="ts">
	import { STATUSES, type Status, notiStack } from './noti-stack.ts';
	import Portal from './portal.svelte';

	function push(status: Status) {
		notiStack.push(status);
	}
</script>

<div class="border-primary not-md flex flex-wrap gap-3 border p-4">
	<Portal stack={notiStack} />
	{#each STATUSES as status (status)}
		<button class="c-btn c-btn--outlined capitalize" onclick={() => push(status)}>{status}</button>
	{/each}
</div>
