<script lang="ts">
  import { clickoutside } from '@svelte-put/clickoutside';
  import { quintOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  let enabled = true;
  let parent: HTMLElement;
  let click = 0;

  function onClickOutside() {
    click++;
  }
  function toggleEnabled() {
    enabled = !enabled;
  }
</script>

<fieldset class="border-4 border-blue-500 bg-violet-200 p-10 {$$props.class}" bind:this={parent}>
  <legend>Limit</legend>

  <div
    class="grid border-2 border-gray-500 bg-gray-200 p-6"
    use:clickoutside={{ enabled, limit: { parent } }}
    on:clickoutside={onClickOutside}
  >
    <p>
      <code>use:clickoutside</code> is registered for this <strong>gray box</strong>. Try these:
    </p>
    <ol>
      <li>
        Click within this <strong>gray</strong> zone => <strong>won't </strong> trigger
        <code>on:clickoutside</code>
      </li>
      <li>
        Click on the <strong>violet</strong> zone => <strong>will</strong> trigger
        <code>on:clickoutside</code>
      </li>
      <li>
        Click outside the <strong>blue</strong> limit => <strong>won't</strong> trigger
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
