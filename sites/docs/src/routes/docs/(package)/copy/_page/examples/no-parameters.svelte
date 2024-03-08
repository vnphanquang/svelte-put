<script lang="ts">
  import { copy, type CopyDetail } from '@svelte-put/copy';
  import { fade } from 'svelte/transition';

  let copied = '';
  function handleCopied(e: CustomEvent<CopyDetail>) {
    copied = e.detail.text;
  }
</script>

<div class="not-prose grid grid-cols-[1fr,auto,1fr] items-center gap-2">
  <button
    class="bg-green-500 p-2 active:scale-95"
    type="button"
    use:copy
    on:copied={handleCopied}
  >
    <strong class="text-blue-500">Click</strong> <span class="text-black">to copy this</span>
  </button>
  <div>-></div>
  <div class="grid place-items-center self-stretch bg-blue-200 text-black">
    {#if copied}
      <p in:fade={{ duration: 200 }}>
        {copied}
      </p>
    {/if}
  </div>
</div>