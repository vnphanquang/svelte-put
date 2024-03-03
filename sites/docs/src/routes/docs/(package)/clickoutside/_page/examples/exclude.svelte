<script>
	import { clickoutside } from '@svelte-put/clickoutside';

  let leftOpen = true;
  function toggleLeft() {
    leftOpen = !leftOpen;
  }
  let rightOpen = false;
  function toggleRight() {
    rightOpen = !rightOpen;
  }

	let containerEl;
</script>

<div class="relative w-full overflow-hidden" bind:this={containerEl}>
	<div
		class="absolute inset-y-0 left-0 w-1/3 bg-success-surface text-success-text origin-left scale-x-50 opacity-50 grid place-items-center transition-[opacity,transform]"
		class:opacity-100={leftOpen}
		class:scale-x-100={leftOpen}
		use:clickoutside={{ enabled: rightOpen, limit: { parent: containerEl } }}
		on:clickoutside={toggleLeft}
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
	</div>
	<div class="flex w-1/3 mx-auto">
		<button on:click|stopPropagation={toggleLeft} class="inline bg-success-surface-200 text-success-text p-2 active:scale-95 flex-1">
			Toggle Left
		</button>
		<button on:click={toggleRight} class="inline bg-error-surface-200 text-error-text p-2 active:scale-95 flex-1">
			Toggle Right
		</button>
	</div>
	<div
		class="absolute inset-y-0 right-0 w-1/3 bg-error-surface text-error-text origin-right scale-x-50 opacity-50 grid place-items-center"
		use:clickoutside={{ enabled: leftOpen, limit: { parent: containerEl } }}
		on:clickoutside={toggleRight}
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-left"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>
	</div>
</div>