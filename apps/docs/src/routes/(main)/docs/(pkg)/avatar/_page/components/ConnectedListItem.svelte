<script lang="ts">
  export let number: number | undefined = undefined;
  export let line = true;
</script>

<li class="group flex items-start space-x-4">
  <div class="flex flex-col items-center self-stretch">
    <p class="grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-bold text-white">
      {number}
    </p>
    {#if line}
      <div class="min-h-[1rem] w-0.5 flex-1 bg-primary/50 group-last:hidden" />
    {/if}
  </div>
  <div>
    <slot />
  </div>
</li>
