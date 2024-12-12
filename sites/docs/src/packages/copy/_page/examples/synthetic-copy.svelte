<script lang="ts">
	import { copy } from '@svelte-put/copy';
	import { fade } from 'svelte/transition';

	let copied = $state('');
	function onSyntheticCopy(e: ClipboardEvent) {
		const clipboardData = e.clipboardData;
		copied = clipboardData?.getData('text/plain') ?? '';
		// clipboardData.setData will have no effect here
	}
</script>

<div class="not-prose grid grid-cols-[1fr_auto_1fr] items-center gap-2">
	<!-- :::focus -->
	<!-- :::highlight -->
	<button class="c-btn" type="button" use:copy={{ synthetic: true }} oncopy={onSyntheticCopy}>
		<!-- ::: -->
		<!-- ::: -->
		<strong>Click</strong> <span>synthetic copy</span>
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
