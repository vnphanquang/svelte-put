<script lang="ts">
	import { intersect } from '@svelte-put/intersect';
	import { fly } from 'svelte/transition';

	let ulElement: HTMLUListElement | undefined = $state();
	let intersectionMap: Record<string, boolean> = $state({
		one: false,
		two: false,
		three: false,
		four: false,
		five: false,
		six: false,
		seven: false,
		eight: false,
	});
</script>

<ul
	class="max-h-[400px] w-full space-y-20 overflow-hidden overflow-y-auto p-4"
	bind:this={ulElement}
>
	{#each Object.keys(intersectionMap) as key (key)}
		{#key intersectionMap[key]}
			<li
				class="odd:bg-success-fg even:bg-info-fg h-[300px] marker:content-none"
				class:invisible={!intersectionMap[key]}
				in:fly={{ y: 100, duration: 250 }}
				use:intersect={{ threshold: 0.4, root: ulElement }}
				onintersectonce={() => (intersectionMap[key] = true)}
			></li>
		{/key}
	{/each}
</ul>
