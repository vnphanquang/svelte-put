<script lang="ts">
	import { copy } from '@svelte-put/copy';
	import { fade } from 'svelte/transition';

	let copied = $state('');
	function onSyntheticCopy(e: ClipboardEvent) {
		const clipboardData = e.clipboardData;
		copied = clipboardData?.getData('text/plain') ?? '';
	}
</script>

<div class="not-md grid grid-cols-[1fr_auto_1fr] items-center gap-2">
	<button class="c-btn" type="button" use:copy={{ synthetic: true }} oncopy={onSyntheticCopy}>
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
