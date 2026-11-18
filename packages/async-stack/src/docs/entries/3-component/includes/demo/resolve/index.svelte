<script lang="ts">
	import { notiStack } from '../../../../../components/noti-stack';
	import Portal from '../../../../../components/portal.svelte';

	import Invitation from './invitation.svelte';

	let promise: Promise<boolean | undefined> | null = $state(null);
	async function push() {
		const pushed = notiStack.push('custom', {
			component: Invitation,
		});
		promise = pushed.resolution;
	}
</script>

<Portal stack={notiStack} />

<div class="border-primary flex flex-wrap items-baseline gap-4 border p-4">
	<button class="c-btn" onclick={push}>Push interactive notification</button>
	<p>
		{#if !promise}
			Waiting for notification to be pushed
		{:else}
			{#await promise}
				Waiting for user action to resolve notification
			{:then accepted}
				{#if accepted}
					Invitation was <span class="hl-success px-2">accepted</span>
				{:else}
					Invitation was <span class="hl-error px-2">ignored</span>
				{/if}
			{/await}
		{/if}
	</p>
</div>
