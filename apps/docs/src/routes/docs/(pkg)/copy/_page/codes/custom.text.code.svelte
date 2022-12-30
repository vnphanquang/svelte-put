<script lang="ts">
  import { copy, type TextResolverInput } from '@svelte-put/copy';
  import { fade } from 'svelte/transition';

  let copied = '';
  function handleCopy(input: TextResolverInput<'pointerdown'>) {
    const { node } = input;
    copied = `Custom - ${node.innerText}`;
    return copied;
  }
</script>

<div class="not-prose grid grid-cols-[1fr,auto,1fr] items-center gap-2">
  <button
    class="bg-green-500 p-2 text-white active:scale-95"
    type="button"
    use:copy={{ event: 'pointerdown', text: handleCopy }}
  >
    Click
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
