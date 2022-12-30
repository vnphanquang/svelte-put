<script lang="ts">
  import { copy, type CopyDetail } from '@svelte-put/copy';
  import { fade } from 'svelte/transition';

  let trigger: HTMLButtonElement;
  let copied = '';
  function handleCopy(e: CustomEvent<CopyDetail>) {
    copied = e.detail.text;
  }
</script>

<div class="not-prose grid grid-cols-[0.5fr,auto,0.5fr,auto,1fr] items-center gap-4">
  <button class="bg-green-500 p-2 text-white active:scale-95" type="button" bind:this={trigger}>
    Click
  </button>
  <div>to</div>
  <div
    class="grid place-items-center border border-yellow-500 p-2"
    use:copy={{ trigger }}
    on:copy={handleCopy}
  >
    <p>copy this</p>
  </div>
  <div>-></div>
  <div class="grid place-items-center self-stretch bg-blue-200 text-black">
    {#if copied}
      <p in:fade={{ duration: 200 }}>
        {copied}
      </p>
    {/if}
  </div>
</div>
