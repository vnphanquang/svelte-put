<script>
	import { notiStack } from '../comprehensive/notification-stack';

	// :::highlight
	import InteractiveNotification from './InteractiveNotification.svelte';
	// :::

	let state = $state('idle');
	async function pushNoti() {
		const pushed = notiStack.push('custom', {
			timeout: 0,
			// :::highlight
			component: InteractiveNotification,
			// :::
			props: {
				message: 'You are invited to join the Svelte community!',
			},
		});

		state = 'pending';
		// :::highlight
		const agreed = await pushed.resolution;
		// :::
		state = agreed ? 'accepted' : 'denied';
	}
</script>

<p>
	{#if state === 'idle'}
		Waiting for notification to be pushed
	{:else if state === 'pending'}
		Waiting for user action to resolve notification
	{:else}
		Invitation was <span
			class="px-2"
			class:hl-error={state == 'denied'}
			class:hl-success={state === 'accepted'}
		>
			{state}
		</span>
	{/if}
</p>
<button class="c-btn" onclick={pushNoti} disabled={state === 'pending'}>
	Trigger Interactive Notification
</button>
