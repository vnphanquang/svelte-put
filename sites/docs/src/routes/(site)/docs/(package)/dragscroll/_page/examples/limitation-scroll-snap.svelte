<script>
	import { dragscroll } from '@svelte-put/dragscroll';
</script>

<ul
	class="not-prose mx-auto flex max-w-4xl snap-x snap-mandatory overflow-x-auto border-2 border-violet-500 p-4"
	use:dragscroll={{ axis: 'x' }}
>
	{#each new Array(10) as _, i}
		<li
			class="mx-[20%] grid h-20 w-2/3 shrink-0 snap-center place-items-center odd:bg-green-200 even:bg-blue-200"
		>
			{i + 1}
		</li>
	{/each}
</ul>
