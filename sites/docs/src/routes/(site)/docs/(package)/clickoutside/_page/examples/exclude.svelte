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
		class="bg-success-bg-100 absolute inset-y-0 left-0 grid w-1/3 origin-left place-items-center transition-[opacity_transform] {leftOpen
			? 'scale-x-100 opacity-100'
			: 'scale-x-50 opacity-50'}"
		use:clickoutside={{ enabled: leftOpen, limit: { parent: containerEl } }}
		onclickoutside={toggleLeft}
	>
		<!-- ::: -->
		<div class="i i-[arrow-right] h-8 w-8"></div>
	</div>
	<div class="mx-auto flex w-1/3">
		<button
			onclick={toggleLeft}
			class="hl-success inline flex-1 cursor-pointer p-2 active:scale-95"
		>
			Toggle Left
		</button>
		<button onclick={toggleRight} class="hl-error inline flex-1 cursor-pointer p-2 active:scale-95">
			Toggle Right
		</button>
	</div>
	<!-- :::highlight error -->
	<div
		class="bg-error-bg-100 absolute inset-y-0 right-0 grid w-1/3 origin-right place-items-center {rightOpen
			? 'scale-x-100 opacity-100'
			: 'scale-x-50 opacity-50'}"
		use:clickoutside={{ enabled: rightOpen, limit: { parent: containerEl } }}
		onclickoutside={toggleRight}
	>
		<!-- ::: -->
		<div class="i i-[arrow-left] h-8 w-8"></div>
	</div>
</div>
