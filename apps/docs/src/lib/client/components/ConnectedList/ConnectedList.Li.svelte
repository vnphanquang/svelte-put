<script lang="ts">
  import { getIndexContext } from './ConnectedList.context';

  export let line = true;
  let cls = '';
  export { cls as class };

  const store = getIndexContext();
  const index = $store + 1;
  $store++;
</script>

<li class="group flex items-start space-x-4 {cls}">
  <div class="flex flex-col items-center self-stretch">
    <p class="grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-bold text-white">
      {index}
    </p>
    {#if line}
      <div class="min-h-[1rem] w-0.5 flex-1 bg-primary/50 group-last:hidden" />
    {/if}
  </div>
  <div>
    <slot />
  </div>
</li>
