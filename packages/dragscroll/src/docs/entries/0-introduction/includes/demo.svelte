<script>
	import { dragscroll } from '@svelte-put/dragscroll';

	const classesForOddRows = 'odd:bg-white odd:text-black even:bg-black even:text-white';
	const classesForEvenRows = 'odd:bg-black odd:text-white even:bg-white even:text-black';
</script>

<div
	class="mx-auto aspect-square max-h-120 max-w-full overflow-x-auto border-2 border-violet-500 p-4"
	use:dragscroll={{
		axis: 'both',
	}}
>
	{#each { length: 8 }, row}
		<div class="grid grid-cols-[repeat(8,1fr)]">
			{#each { length: 8 }, col}
				<div
					class="
						grid h-20 w-20 place-items-center select-none
						{row % 2 === 0 ? classesForEvenRows : classesForOddRows}
          "
				>
					{row * 8 + col + 1}
				</div>
			{/each}
		</div>
	{/each}
</div>
