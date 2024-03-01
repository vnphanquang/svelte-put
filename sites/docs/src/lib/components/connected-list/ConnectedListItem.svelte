<script lang="ts">
  export let line = true;
  let cls = '';
  export { cls as class };
</script>

<li class="group flex items-baseline space-x-4 {cls}">
  <div class="flex flex-col items-center self-stretch mt-0">
    <p class="grid h-7 w-7 place-items-center rounded-full bg-[rgb(214,93,3)] text-xs font-bold text-white">
    </p>
    {#if line}
      <div class="min-h-[1rem] w-0.5 flex-1 bg-[rgba(214,93,3,0.5)] group-last:hidden" />
    {/if}
  </div>
  <div class="mb-4">
    <slot />
  </div>
</li>

<style>
	p::after {
		content: counter(connected-list);
		counter-increment: connected-list;
	}
</style>
