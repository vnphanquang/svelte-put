<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import type { ResolveTrigger } from '$lib';

  const dispatch = createEventDispatcher<{
    resolve: {
      trigger: ResolveTrigger;
      payload: string;
    };
  }>();

  function resolve() {
    dispatch('resolve', { trigger: 'custom', payload: 'completely custom modal' });
  }
</script>

<div class="custom-modal">
  <button type="button" on:click={resolve}>
    Resolve
  </button>
</div>

<style>
  .custom-modal {
    position: absolute;
    width: 80%;
    height: 80%;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
  }
</style>
