<script lang="ts">
	import { modalStack } from './modal-stack';

	let confirmed: boolean | undefined = undefined;
	async function confirm() {
		const pushed = modalStack.push('confirm');
		({ confirmed } = await pushed.resolution ?? {});
	}
</script>

<div class="flex gap-2 not-prose items-center">
	<button class="c-btn" onclick={confirm}>Trigger Modal</button>
	{#if confirmed === true}
		<p class="text-green-500 font-bold text-sm">We have an accord.</p>
	{:else if confirmed === false}
		<p class="text-red-500 font-bold text-sm">We don't have an accord.</p>
	{/if}
</div>

