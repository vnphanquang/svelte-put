<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';

  export let message: string;

  const dispatch = createEventDispatcher<{
    resolve: boolean;
  }>();

  const join = () => dispatch('resolve', true);
  const del = () => dispatch('resolve', false);
</script>

<div
  class="px-4 py-2 bg-green-200 rounded-sm shadow-lg text-dark pointer-events-auto"
  in:fly|global={{ duration: 200, y: -20 }}
>
  <p class="text-xl font-bold">Invitation</p>
  <p class="text-lg">{message}</p>
  <div>
    <button class="c-btn-primary" on:click={join}> Join </button>
    <button class="c-btn-primary-outline" on:click={del}> Delete </button>
  </div>
</div>
