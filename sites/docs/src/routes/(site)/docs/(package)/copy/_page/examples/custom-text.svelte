<script lang="ts">
	import { copy, type TextResolverInput } from '@svelte-put/copy';
	import { fade } from 'svelte/transition';

	let copied = $state('');
	// :::focus
	// :::highlight
	function copyText(input: TextResolverInput<'pointerdown'>) {
		const { node } = input;
		copied = `Custom - ${node.innerText}`;
		return copied;
	}
	// :::
	// :::
</script>

<div class="not-prose grid grid-cols-[1fr_auto_1fr] items-center gap-2">
	<!-- :::focus -->
	<!-- :::highlight -->
	<button class="c-btn" type="button" use:copy={{ event: 'pointerdown', text: copyText }}>
		Click
	</button>
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
