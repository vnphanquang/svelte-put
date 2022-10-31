<script lang="ts">
  import { copy } from '@svelte-put/copy';
  import type { ComponentProps } from 'svelte';
  import Highlight from 'svelte-highlight/Highlight.svelte';
  import HighlightSvelte from 'svelte-highlight/HighlightSvelte.svelte';
  import { fade } from 'svelte/transition';

  export let lang: ComponentProps<Highlight>['language'] | 'svelte' = 'svelte';
  export let code: string;
  export let title = '';

  let copyBtn: HTMLButtonElement;

  let copied = false;
  function onCopy() {
    copied = true;
  }
  function onMouseLeave() {
    copied = false;
  }
</script>

<div
  class="code-wrapper group relative my-6 overflow-hidden rounded-md text-[#e5e7eb] shadow hover:shadow-md {$$props.class}"
  on:mouseleave={onMouseLeave}
>
  <div class="not-prose flex items-center bg-[#32302f]/90 py-2 pl-6 pr-4">
    <p class="flex-1 font-fira text-sm">
      {title}
    </p>
    <button bind:this={copyBtn} class="flex items-center justify-center space-x-1">
      {#if copied}
        <span transition:fade={{ duration: 150 }} class="rounded bg-border/10 p-2 text-sm">
          Copied
        </span>
      {/if}
      <span
        class="flex rounded p-2 hover:bg-border/10 {copied ? 'bg-border/10' : ''} active:scale-95"
      >
        {#if copied}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            height="20"
            width="20"
            class="inline-block"
            in:fade={{ duration: 150 }}
          >
            <path
              d="M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z"
              fill="currentColor"
            />
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            height="20"
            width="20"
            class="inline-block"
            in:fade={{ duration: 150 }}
          >
            <path
              d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z"
              fill="currentColor"
            />
          </svg>
        {/if}
      </span>
    </button>
  </div>
  <div use:copy={{ trigger: copyBtn }} on:copy={onCopy}>
    {#if lang === 'svelte'}
      <HighlightSvelte {code} langtag />
    {:else}
      <Highlight language={lang} {code} langtag />
    {/if}
  </div>
</div>

<style lang="postcss">
  /* move global style for code here */
  :global(pre:not(#fakeId)) {
    @apply m-0 rounded-none border-t border-border p-0;
    &::after {
      @apply p-4;
    }
  }
  :global(pre:not(#fakeId) code) {
    @apply p-6 font-fira;
  }
</style>
