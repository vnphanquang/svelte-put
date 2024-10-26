<script lang="ts">
	import { modalStack } from './modal-stack';

	let confirmed: boolean | undefined = undefined;
	async function confirm() {
		const pushed = modalStack.push('confirm');
		({ confirmed } = (await pushed.resolution) ?? {});
	}
</script>

<div class="not-prose flex items-center gap-2">
	<button class="c-btn" onclick={confirm}>Trigger Modal</button>
	{#if confirmed === true}
		<p class="text-sm font-bold text-green-500">We have an accord.</p>
	{:else if confirmed === false}
		<p class="text-sm font-bold text-red-500">We don't have an accord.</p>
	{/if}
</div>
