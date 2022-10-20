<script lang="ts">
  import type { ResolveTrigger } from '@svelte-put/modal';
  import { createEventDispatcher } from 'svelte';

  export let prop = 'Prop should work as usual';

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
  <button type="button" on:click={resolve}> Resolve </button>
  <p>{prop}</p>
</div>

<style>
  .custom-modal {
    position: absolute;
    width: 80%;
    height: 80%;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    background-color: #fff;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
    display: grid;
    place-items: center;
  }

  button {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    background-color: #fff;
    cursor: pointer;
  }

  button:hover {
    background-color: tomato;
  }
</style>
