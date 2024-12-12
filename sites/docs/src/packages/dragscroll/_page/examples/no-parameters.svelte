<script>
	// :::focus
	// :::highlight
	import { dragscroll } from '@svelte-put/dragscroll';
	// :::
	// :::

	const classesForOddRows = 'odd:bg-white odd:text-black even:bg-black even:text-white';
	const classesForEvenRows = 'odd:bg-black odd:text-white even:bg-white even:text-black';
</script>

<!-- :::focus -->
<!-- :::highlight -->
<div class="mx-auto max-w-4xl overflow-x-auto border-2 border-violet-500 p-4" use:dragscroll>
	<!-- ::: -->
	<!-- ::: -->
	{#each new Array(10) as _, row}
		<div class="grid grid-cols-[repeat(10,1fr)]">
			{#each new Array(10) as _, col}
				<div
					class="
						grid h-10 w-32 select-none place-items-center
						{row % 2 === 0 ? classesForEvenRows : classesForOddRows}
          "
				>
					{row * 10 + col + 1}
				</div>
			{/each}
		</div>
	{/each}
</div>
