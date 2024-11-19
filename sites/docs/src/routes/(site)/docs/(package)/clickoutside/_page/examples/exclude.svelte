<script lang="ts">
	import { clickoutside } from '@svelte-put/clickoutside';

	let leftOpen = $state(true);
	// :::highlight success
	function toggleLeft(e: Event) {
		e.stopPropagation();
		leftOpen = !leftOpen;
	}
	// :::
	let rightOpen = $state(false);
	// :::highlight error
	function toggleRight() {
		rightOpen = !rightOpen;
	}
	// :::

	let containerEl: HTMLDivElement | undefined = $state(undefined);
</script>

<div class="relative w-full overflow-hidden" bind:this={containerEl}>
	<!-- :::highlight success -->
	<div
		class="bg-success-bg text-success-fg absolute inset-y-0 left-0 grid w-1/3 origin-left place-items-center transition-[opacity,transform] {leftOpen
			? 'scale-x-100 opacity-100'
			: 'scale-x-50 opacity-50'}"
		use:clickoutside={{ enabled: leftOpen, limit: { parent: containerEl } }}
		onclickoutside={toggleLeft}
	>
		<!-- ::: -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="40"
			height="40"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-move-right"><path d="M18 8L22 12L18 16" /><path d="M2 12H22" /></svg
		>
	</div>
	<div class="mx-auto flex w-1/3">
		<button
			onclick={toggleLeft}
			class="bg-success-bg-200 text-success-fg inline flex-1 cursor-pointer p-2 active:scale-95"
		>
			Toggle Left
		</button>
		<button
			onclick={toggleRight}
			class="bg-error-bg-200 text-error-fg inline flex-1 cursor-pointer p-2 active:scale-95"
		>
			Toggle Right
		</button>
	</div>
	<!-- :::highlight error -->
	<div
		class="bg-error-bg text-error-fg absolute inset-y-0 right-0 grid w-1/3 origin-right place-items-center {rightOpen
			? 'scale-x-100 opacity-100'
			: 'scale-x-50 opacity-50'}"
		use:clickoutside={{ enabled: rightOpen, limit: { parent: containerEl } }}
		onclickoutside={toggleRight}
	>
		<!-- ::: -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-move-left"><path d="M6 8L2 12L6 16" /><path d="M2 12H22" /></svg
		>
	</div>
</div>
