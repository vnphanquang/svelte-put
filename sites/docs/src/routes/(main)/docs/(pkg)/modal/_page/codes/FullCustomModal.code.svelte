<!-- without anything from @svelte-put (except for some types) -->
<script lang="ts">
  import type { ResolveTrigger } from '@svelte-put/modal';
  import { createEventDispatcher } from 'svelte';

  export let content = 'Prop should work as usual';

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

<!-- notice this component is just a normal svelte component -->

<div class="custom-modal">
  <button type="button" class="c-btn-primary-outline" on:click={resolve}> Resolve </button>
  <p>{content}</p>
</div>

<style>
  .custom-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;

    display: grid;
    place-items: center;

    width: 80%;
    height: 80%;

    background-color: #fff;
    box-shadow: 0 0 0.5rem rgb(0 0 0 / 25%);
  }
</style>
