<script lang="ts">
	import { notiStack } from '../../../../components/noti-stack';
	import Portal from '../../../../components/portal.svelte';

	let promise: Promise<unknown> | null = $state(null);
	async function push() {
		promise = new Promise(() => {});
		const pushed = notiStack.push('persistent');
		promise = pushed.resolution;
		await promise;
		setTimeout(() => (promise = null), 2000);
	}

	function pop() {
		notiStack.pop();
	}
</script>

<Portal stack={notiStack} />

<div class="border-primary border p-4">
	<button class="c-btn" onclick={push} disabled={!!promise}>
		Push a persistent notification
	</button>
	{#if promise}
		<p>
			{#await promise}
				Notification is pushed and waiting for resolution. Either click the x button on the
				notification or <button class="c-link" onclick={pop}>click here</button> to pop the notification.
			{:then}
				Notification was resolved and will reset in 2 seconds...
			{/await}
		</p>
	{/if}
</div>
