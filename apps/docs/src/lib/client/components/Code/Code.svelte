<script lang="ts" context="module">
  export interface CodeProps {
    lang?: ComponentProps<Highlight>['language'] | 'svelte';
    code: string | Record<string, string>;
    title?: string;
    expanded?: boolean;
    expansion?: 'disabled' | 'enabled';
    icon?: 'none' | 'code' | 'warning' | 'error';
    class?: string;
    variant?: string;
  }
</script>

<script lang="ts">
  import { copy } from '@svelte-put/copy';
  import { clsx } from 'clsx';
  import type { ComponentProps } from 'svelte';
  import Highlight from 'svelte-highlight/Highlight.svelte';
  import HighlightSvelte from 'svelte-highlight/HighlightSvelte.svelte';
  import { fade, slide } from 'svelte/transition';

  import IconCode from '$client/components/icons/material/Code.svelte';
  import IconCopy from '$client/components/icons/material/Copy.svelte';
  import IconDone from '$client/components/icons/material/Done.svelte';
  import IconError from '$client/components/icons/material/Error.svelte';
  import IconExpandLess from '$client/components/icons/material/ExpandLess.svelte';
  import IconWarning from '$client/components/icons/material/Warning.svelte';

  type $$Props = CodeProps;
  export let lang: $$Props['lang'];
  export let code: $$Props['code'];
  export let title: $$Props['title'] = '';
  export let expanded: $$Props['expanded'] = true;
  export let expansion: $$Props['expansion'] = 'enabled';
  export let icon: $$Props['icon'] = 'code';
  export let variant = typeof code === 'object' ? Object.keys(code)[0] : '';
  let cls = '';
  export { cls as class };

  $: currentCode = typeof code === 'object' ? code[variant] : code;
  $: rLang = lang || 'svelte';

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
  class="group relative my-6 max-w-full overflow-hidden rounded-md text-code-fg shadow-md hover:shadow-lg {cls}"
  on:mouseleave={onMouseLeave}
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="not-prose flex cursor-pointer items-center bg-code-header py-2 pl-6 pr-2"
    on:click={toggleExpansion}
  >
    <p class="flex flex-1 items-center space-x-2 font-fira text-sm">
      <span class="w-6" title="indicator">
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
    <button
      class="flex items-center justify-center space-x-1"
      title="copy code"
      on:click|stopPropagation
      use:copy={{ text: currentCode }}
      on:copied={onCopy}
    >
      {#if copied}
        <span transition:fade|local={{ duration: 150 }} class="rounded p-2 text-sm"> Copied </span>
      {/if}
      {#key copied}
        <span
          class="flex rounded p-2 hover:bg-border active:scale-95"
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
      <div class="mx-2 self-stretch border-l border-border" />
      <button
        title="collapse code block"
        on:click|stopPropagation={toggleExpansion}
        class="flex rounded p-2 hover:bg-border active:scale-95"
        aria-label="Toggle expansion"
      >
        <span class={clsx('h-5', expanded ? 'inline-grid place-items-center' : 'animate-bounce')}>
          <IconExpandLess
            class="inline-block transition-transform {!expanded ? 'rotate-180' : ''}"
            height="20"
            width="20"
          />
        </span>
      </button>
    {/if}
  </div>
  {#if expanded}
    <div transition:slide|local={{ duration: 150 }}>
      {#if typeof code === 'object'}
        <div class="not-prose">
          <ul class="flex w-full items-center border-t border-border bg-code-header pr-2 text-sm">
            {#each Object.keys(code) as key}
              {@const current = key === variant}
              <li
                data-current={current}
                class="-mb-px border-b border-transparent hover:text-primary data-current:border-b-primary"
              >
                <button class="px-4 py-3" on:click={() => (variant = key)}>{key}</button>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
      <div class="max-h-[600px] overflow-auto border-t border-border">
        {#if rLang === 'svelte'}
          <HighlightSvelte code={currentCode} />
        {:else}
          <Highlight language={rLang} code={currentCode} />
        {/if}
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  :global(pre:not(#fake-id)) {
    margin: 0;
    padding: 0;
    border-radius: 0;
  }

  :global(pre:not(#fake-id)::after) {
    padding: theme(spacing.4);
  }

  :global(pre:not(#fake-id) code) {
    padding: theme(spacing.6);
    font-family: theme(fontFamily.fira);
  }
</style>
