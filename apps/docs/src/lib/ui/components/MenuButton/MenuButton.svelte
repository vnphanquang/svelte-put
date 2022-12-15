<script lang="ts">
  import clsx from 'clsx';

  import Svg from '$lib/ui/components/icons/Svg.svelte';

  export let align: 'left' | 'right' = 'left';
  let cls = '';
  export { cls as class };

  $: commonPathClasses = `transition-transform origin-left`;
</script>

<button
  class={clsx(
    'c-btn-icon group flex items-center space-x-2 text-xs hover:text-primary',
    align === 'right' && 'flex-row-reverse space-x-reverse',
    cls,
  )}
  on:click|stopPropagation
>
  <Svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    title="Menu"
    height="24"
    width="24"
    class={clsx('inline', align === 'right' && '-scale-x-100')}
  >
    <path
      class="{commonPathClasses} group-hover:scale-x-75"
      d="M21,7H3C2.4,7,2,6.6,2,6s0.4-1,1-1h18c0.6,0,1,0.4,1,1S21.6,7,21,7z"
    />
    <path
      class="{commonPathClasses} group-hover:scale-x-125"
      d="M17,11H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h14c0.6,0,1,0.4,1,1S17.6,11,17,11z"
    />
    <path
      class="{commonPathClasses} group-hover:scale-x-75"
      d="M21,15H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h18c0.6,0,1,0.4,1,1S21.6,15,21,15z"
    />
    <path
      class="{commonPathClasses} group-hover:scale-x-125"
      d="M17,19H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h14c0.6,0,1,0.4,1,1S17.6,19,17,19z"
    />
  </Svg>
  {#if $$slots.default}
    <span><slot /></span>
  {/if}
</button>
