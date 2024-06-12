<script lang="ts">
	import { notiCtrl } from './comprehensive/notification-controller';

	// :::focus
	// :::highlight
	let promise: Promise<unknown> | null = null;
	// :::
	// :::
	async function pushNoti() {
		// :::focus
		// :::highlight
		const pushed = notiCtrl.push('info', {
			// :::
			// :::
			timeout: 0,
			props: { content: 'persistent' },
		});

		// :::focus
		// :::highlight
		promise = pushed.resolution;
		await promise;
		// :::
		// :::
		setTimeout(() => (promise = null), 2000);
	}

	function popNoti() {
		// :::focus
		// :::highlight
		notiCtrl.pop();
		// :::
		// :::
	}
</script>

<button onclick={pushNoti} disabled={!!promise} class="c-btn" class:bg-gray-500={!!promise}>
	Push a persistent notification
</button>
{#if promise}
	<p class="mt-2 text-blue-500">
		<!-- :::focus -->
		<!-- :::highlight -->
		{#await promise}
			Notification is pushed and waiting for resolution. Either click the x button on the
			notification, or <button class="c-link" onclick={popNoti}>click here</button> to pop the notification.
		{:then}
			Resolved (resetting in 2 seconds)
		{/await}
		<!-- ::: -->
		<!-- ::: -->
	</p>
{/if}
