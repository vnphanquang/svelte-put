<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { line = true, class: cls, children, ...rest }: HTMLAttributes<HTMLLIElement> & { line?: boolean } = $props();
</script>

<li class="group flex items-baseline space-x-4 {cls}" {...rest}>
  <div class="flex flex-col items-center self-stretch mt-0">
    <p class="grid h-7 w-7 place-items-center rounded-full bg-[rgb(214,93,3)] text-xs font-bold text-white">
    </p>
    {#if line}
      <div class="min-h-[1rem] w-0.5 flex-1 bg-[rgba(214,93,3,0.5)] group-last:hidden"></div>
    {/if}
  </div>
  <div class="mb-4">
		{#if children}
			{@render children()}
		{/if}
  </div>
</li>

<style>
	p::after {
		content: counter(connected-list);
		counter-increment: connected-list;
	}
</style>

