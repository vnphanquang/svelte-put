<script lang="ts">
	import type { StackItemProps } from '@svelte-put/async-stack';

	let { item }: StackItemProps<boolean> = $props();
</script>

<div
	class={[
		'not-md bg-fill-100 pointer-events-auto relative border border-current shadow-lg',
		item.config.timeout && 'pbe-1',
	]}
>
	<p class="border-b border-current px-4 py-2">
		<strong>An Invitation</strong>
	</p>
	<div class="pbs-2 pbe-3 space-y-2 p-4">
		<p>You are invited to join the Svelte community!</p>
		<div class="flex justify-end gap-4">
			<button class="c-btn min-w-20 px-2 py-1" onclick={() => item.resolve(true)} type="button">
				Join
			</button>
			<button
				class="c-btn c-btn--outlined min-w-20 px-2 py-1"
				onclick={() => item.resolve(false)}
				type="button"
			>
				Ignore
			</button>
		</div>
	</div>
</div>
