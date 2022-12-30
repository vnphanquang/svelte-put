<script>
  import { copy } from '@svelte-put/copy';
  import { fade } from 'svelte/transition';
  let copied = '';
  function handleCopied(e) {
    copied = e.detail.text;
  }
</script>

<div class="not-prose grid grid-cols-[1fr,auto,1fr] items-center gap-2">
  <button
    class="bg-green-500 p-2 text-white active:scale-95"
    type="button"
    use:copy
    on:copied={handleCopied}
  >
    Click <span class="text-blue-500">to copy this</span>
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
