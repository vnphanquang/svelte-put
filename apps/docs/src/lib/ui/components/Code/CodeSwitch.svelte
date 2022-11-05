<script lang="ts">
  import Code from './Code.svelte';
  import type { CodeProps } from './Code.svelte';

  type CodeItem = Omit<CodeProps, 'expansion' | 'expanded'> & { variant: string };

  export let codes: CodeItem[] = [];
  export let variant: string = codes[0]?.variant;
  export let expanded: CodeProps['expanded'] = true;
  export let expansion: CodeProps['expansion'] = 'enabled';
  export let title: CodeProps['title'] = '';
  export let icon: CodeProps['icon'] = 'code';
  export let lang: CodeProps['lang'] = 'svelte';

  let activeCodeIndex = 0;
  $: variant = codes[activeCodeIndex].variant;
</script>

<div class="mt-6">
  <div class="not-prose">
    <ul class="flex w-full items-center space-x-2 border-b border-border">
      {#each codes as { variant }, index}
        {@const current = index === activeCodeIndex}
        <li
          class="-mb-[1.5px] border-b-2 border-transparent px-2 data-current:border-primary"
          data-current={current}
        >
          <button class="" on:click={() => (activeCodeIndex = index)}>{variant}</button>
        </li>
      {/each}
    </ul>
  </div>

  {#each codes as code, index}
    {@const current = index === activeCodeIndex}
    {@const props = { title, icon, expansion, lang, ...code }}
    <section
      class="hidden opacity-0 data-current:block data-current:opacity-100"
      data-current={current}
    >
      <Code {...props} bind:expanded class={$$props.class} />
    </section>
  {/each}
</div>
