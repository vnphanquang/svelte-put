<script lang="ts">
	import { dragscroll, type DragScrollParameters } from '@svelte-put/dragscroll';

	let axis: DragScrollParameters['axis'] = 'both';
</script>

<div class="not-prose mx-auto grid max-w-4xl place-items-center">
	<div class="flex items-center space-x-4">
		<p>Select the scroll axis</p>
		<label class="flex cursor-pointer items-center gap-2">
			<input class="c-input" type="radio" name="axis" value="x" id="x" bind:group={axis} />
			x
		</label>
		<label class="flex cursor-pointer items-center gap-2">
			<input class="c-input" type="radio" name="axis" value="y" id="y" bind:group={axis} />
			y
		</label>
		<label class="flex cursor-pointer items-center gap-2">
			<input class="c-input" type="radio" name="axis" value="both" id="both" bind:group={axis} />
			both
		</label>
	</div>
	<div
		class="mt-4 max-h-[300px] max-w-[300px] overflow-x-auto border-2 border-violet-500 md:max-h-[400px] md:max-w-[400px]"
		use:dragscroll={{ axis }}
	>
		{#each new Array(10) as _, row}
			<div class="grid grid-cols-[repeat(10,1fr)]">
				{#each new Array(10) as _, col}
					<div
						class="
							grid
              h-20 w-20 select-none place-items-center
              {row % 2 === 0
							? 'odd:bg-black odd:text-white even:bg-white even:text-black'
							: 'odd:bg-white odd:text-black even:bg-black even:text-white'}
            "
					>
						{row * 10 + col + 1}
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>
