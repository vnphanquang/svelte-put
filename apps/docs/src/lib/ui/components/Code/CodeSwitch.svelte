<script lang="ts">
  import type { ComponentProps } from 'svelte';

  import Code from './Code.svelte';

  interface CodeItem extends ComponentProps<Code> {
    variant: string;
  }

  export let codes: CodeItem[] = [];
  export let variant: string = codes[0]?.variant;

  let activeCodeIndex = 0;
  $: variant = codes[activeCodeIndex].variant;
</script>

<div class="">
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

  {#each codes as { code, lang }, index}
    {@const current = index === activeCodeIndex}
    <section
      class="hidden opacity-0 data-current:block data-current:opacity-100"
      data-current={current}
    >
      <Code {lang} {code} />
    </section>
  {/each}
</div>
