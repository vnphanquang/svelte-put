<script lang="ts">
  import { copy } from '@svelte-put/copy';
  import { fade } from 'svelte/transition';

  let copied = $state('');
  function onSyntheticCopy(e: ClipboardEvent) {
    const clipboardData = e.clipboardData;
    copied = clipboardData?.getData('text/plain') ?? '';
    // clipboardData.setData will have no effect here
  }
</script>

<div class="not-prose grid grid-cols-[1fr,auto,1fr] items-center gap-2">
  <button
    class="bg-green-500 p-2 active:scale-95"
    type="button"
    use:copy={{ synthetic: true }}
    oncopy={onSyntheticCopy}
  >
    <strong class="text-blue-500">Click</strong> <span class="text-black">synthetic copy</span>
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