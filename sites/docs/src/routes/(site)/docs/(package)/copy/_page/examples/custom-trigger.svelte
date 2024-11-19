<script lang="ts">
	import { copy, type CopyDetail } from '@svelte-put/copy';
	import { fade } from 'svelte/transition';

	let trigger: HTMLButtonElement | undefined = $state(undefined);
	let copied = $state('');
	function handleCopied(e: CustomEvent<CopyDetail>) {
		copied = e.detail.text;
	}
</script>

<div class="not-prose grid grid-cols-[0.5fr_auto_0.5fr_auto_1fr] items-center gap-4">
	<!-- :::focus -->
	<!-- :::highlight -->
	<button class="c-btn" type="button" bind:this={trigger}>Click</button>
	<div>to</div>
	<div
		class="grid place-items-center border border-yellow-500 p-2"
		use:copy={{ trigger }}
		oncopied={handleCopied}
	>
		<p>copy this</p>
	</div>
	<!-- ::: -->
	<!-- ::: -->
	<div>-></div>
	<div class="bg-success-bg text-success-fg grid place-items-center self-stretch">
		{#if copied}
			<p in:fade={{ duration: 200 }}>
				{copied}
			</p>
		{/if}
	</div>
</div>
