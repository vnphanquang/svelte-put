<script lang="ts">
  import { copy } from '@svelte-put/copy';
  import type { ComponentProps } from 'svelte';
  import Highlight from 'svelte-highlight';
  import xml from 'svelte-highlight/languages/xml';
  import { fade } from 'svelte/transition';

  export let lang: ComponentProps<Highlight>['language'] = xml;
  export let code: string;

  let copyBtn: HTMLButtonElement;

  let copied = false;
  function onCopy() {
    copied = true;
  }
  function onMouseLeave() {
    copied = false;
  }
</script>

<div class="code-wrapper group relative {$$props.class}" on:mouseleave={onMouseLeave}>
  <div use:copy={{ trigger: copyBtn }} on:copy={onCopy}>
    <Highlight language={lang} {code} langtag />
  </div>
  <button
    bind:this={copyBtn}
    class="
      pointer-events-none absolute right-1 top-1
      flex items-center justify-center space-x-1
      text-border opacity-0 transition-opacity
      group-hover:pointer-events-auto group-hover:opacity-100
    "
    class:opacity-100={copied}
  >
    {#if copied}
      <span transition:fade={{ duration: 150 }} class="rounded bg-border/10 p-2 text-sm">
        Copied
      </span>
    {/if}
    <span
      class="flex rounded p-2 hover:bg-border/10 {copied ? 'bg-border/10' : ''} active:scale-95"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        height="20"
        width="20"
        class="inline-block"
      >
        <path
          d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z"
          fill="currentColor"
        />
      </svg>
    </span>
  </button>
</div>

<style lang="postcss">
  /* move global style for code here */
  :global(pre:not(#fakeId)) {
    @apply p-0;
  }
  :global(pre:not(#fakeId) code) {
    @apply p-6 font-fira;
  }
  :global(pre::after) {
    @apply transition-opacity;
  }
  :global(.code-wrapper:hover pre::after) {
    @apply opacity-0;
  }
</style>
