<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';

  export let message: string;

  const dispatch = createEventDispatcher<{
    resolve: boolean;
  }>();

	// :::highlight
  const join = () => dispatch('resolve', true);
  const del = () => dispatch('resolve', false);
	// :::
</script>

<div
  class="px-4 py-2 bg-bg-100 rounded-sm shadow-lg pointer-events-auto"
  in:fly|global={{ duration: 200, y: -20 }}
>
  <p class="text-xl font-bold">Invitation</p>
  <p class="text-lg">{message}</p>
  <div class="flex gap-6">
    <button class="c-btn w-40" on:click={join}> Join </button>
    <button class="c-btn c-btn--outlined w-40" on:click={del}> Delete </button>
  </div>
</div>