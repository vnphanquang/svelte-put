<script lang="ts">
	// :::focus
	// :::highlight
	import { copy, type CopyDetail } from '@svelte-put/copy';
	// :::
	// :::
	import { fade } from 'svelte/transition';

	// :::focus
	// :::highlight
	let copied = $state('');
	function handleCopied(e: CustomEvent<CopyDetail>) {
		copied = e.detail.text;
	}
	// :::
	// :::
</script>

<div class="not-prose grid grid-cols-[1fr_auto_1fr] items-center gap-2">
	<!-- :::focus -->
	<!-- :::highlight -->
	<button class="c-btn" type="button" use:copy oncopied={handleCopied}>
		<!-- ::: -->
		<!-- ::: -->
		<strong>Click</strong> <span>to copy this</span>
	</button>
	<p>-></p>
	<div class="hl-success grid place-items-center self-stretch">
		{#if copied}
			<p in:fade={{ duration: 200 }}>
				{copied}
			</p>
		{/if}
	</div>
</div>
