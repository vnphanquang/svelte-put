<script lang="ts">
  import { clickoutside } from '@svelte-put/clickoutside';
  import { quintOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  let enabled = true;
  let parent: Element;
  let click = 0;
  let cls = '';
  export { cls as class };

  function onClickOutside() {
    click++;
  }
  function toggleEnabled() {
    enabled = !enabled;
  }
</script>

<fieldset
  class="border-4 border-error-text bg-error-surface text-error-text p-10 {cls}"
  bind:this={parent}
>
  <legend class="font-bold text-error-text">Limit</legend>

  <div
    class="grid border-2 border-success-element bg-success-surface text-success-text p-6"
    use:clickoutside={{ enabled, limit: { parent } }}
    on:clickoutside={onClickOutside}
  >
    <p>
      <code>use:clickoutside</code> is registered for this <strong>green box</strong>. Try these:
    </p>
    <ol>
      <li>
        Click within this <strong>green</strong> zone => <strong>won't </strong> trigger
        <code>on:clickoutside</code>
      </li>
      <li>
        Click on the <strong>red</strong> zone => <strong>will</strong> trigger
        <code>on:clickoutside</code>
      </li>
      <li>
        Click outside the <strong>red</strong> limit => <strong>won't</strong> trigger
        <code>on:clickoutside</code>
      </li>
      <li>Enable/disable <code>use:clickoutside</code> with button below, then try (2) again</li>
    </ol>
  </div>
  <div class="flex items-center justify-between">
    <p class="">
      <code>on:clickoutside</code> counter:
      {#key click}
        <strong in:fly={{ y: 8, duration: 250, easing: quintOut }} class="inline-block"
          >{click}</strong
        >
      {/key}
    </p>
    <button class="bg-blue-500 px-2 py-1 text-white" on:click|stopPropagation={toggleEnabled}>
      {#if enabled}
        Disable
      {:else}
        Enable
      {/if}
    </button>
  </div>
</fieldset>