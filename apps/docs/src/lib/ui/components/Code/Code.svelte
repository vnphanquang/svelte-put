<script lang="ts">
  import { copy } from '@svelte-put/copy';
  import type { ComponentProps } from 'svelte';
  import Highlight from 'svelte-highlight/Highlight.svelte';
  import HighlightSvelte from 'svelte-highlight/HighlightSvelte.svelte';
  import { fade, slide } from 'svelte/transition';

  import IconCode from '$lib/ui/components/icons/material/Code.svelte';
  import IconCopy from '$lib/ui/components/icons/material/Copy.svelte';
  import IconDone from '$lib/ui/components/icons/material/Done.svelte';
  import IconError from '$lib/ui/components/icons/material/Error.svelte';
  import IconExpandLess from '$lib/ui/components/icons/material/ExpandLess.svelte';
  import IconWarning from '$lib/ui/components/icons/material/Warning.svelte';

  export let lang: ComponentProps<Highlight>['language'] | 'svelte' = 'svelte';
  export let code: string;
  export let title = '';
  export let expanded = true;
  export let expansion: 'disabled' | 'enabled' = 'enabled';
  export let icon: 'none' | 'code' | 'warning' | 'error' = 'code';

  let copyBtn: HTMLButtonElement;

  let copied = false;
  function onCopy() {
    copied = true;
  }
  function onMouseLeave() {
    copied = false;
  }

  function toggleExpansion() {
    if (expansion === 'disabled') return;
    expanded = !expanded;
  }
</script>

<div
  class="code-wrapper group relative my-6 overflow-hidden rounded-md text-code-fg shadow hover:shadow-md {$$props.class}"
  on:mouseleave={onMouseLeave}
>
  <div class="not-prose flex items-center bg-code-bg py-2 pl-6 pr-4">
    <p class="flex flex-1 items-center gap-x-2 font-fira text-sm">
      <span class="w-6" alt="indicator">
        {#if icon === 'code'}
          <IconCode />
        {:else if icon === 'warning'}
          <IconWarning class="text-yellow-500" />
        {:else if icon === 'error'}
          <IconError class="text-red-500" />
        {/if}
      </span>
      <span>
        {title}
      </span>
    </p>
    <button bind:this={copyBtn} class="flex items-center justify-center space-x-1" alt="copy code">
      {#if copied}
        <span transition:fade|local={{ duration: 150 }} class="rounded p-2 text-sm"> Copied </span>
      {/if}
      {#key copied}
        <span
          class="flex rounded p-2 hover:bg-border/10 active:scale-95"
          in:fade|local={{ duration: 150 }}
        >
          {#if copied}
            <IconDone class="inline-block" />
          {:else}
            <IconCopy class="inline-block" />
          {/if}
        </span>
      {/key}
    </button>
    {#if expansion !== 'disabled'}
      <button
        alt="collapse code block"
        on:click={toggleExpansion}
        class="flex rounded p-2 hover:bg-border/10 active:scale-95"
      >
        <IconExpandLess
          class="inline-block transition-transform {!expanded ? 'rotate-180' : ''}"
          title=""
        />
      </button>
    {/if}
  </div>
  {#if expanded}
    <div
      use:copy={{ trigger: copyBtn }}
      on:copy={onCopy}
      transition:slide|local={{ duration: 150 }}
    >
      {#if lang === 'svelte'}
        <HighlightSvelte {code} langtag />
      {:else}
        <Highlight language={lang} {code} langtag />
      {/if}
    </div>
  {/if}
</div>

<style lang="postcss">
  :global(pre:not(#fakeId)) {
    @apply m-0 rounded-none border-t border-border p-0;
  }
  :global(pre:not(#fakeId)::after) {
    @apply p-4;
  }
  :global(pre:not(#fakeId) code) {
    @apply p-6 font-fira;
  }
</style>
