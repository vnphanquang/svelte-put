<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { toc } from '../action';
  import type { TocEventDetails, TocEventItemDetails, TocParameters } from '../action';

  /** The {@link TocParameters} to pass to the `toc` action */
  export let parameters: Partial<TocParameters> = {};
  /** Custom class names passed to `ul` */
  export let ulClass = '';
  /** Custom class names passed to `li` */
  export let liClass = '';

  const dispatch = createEventDispatcher<{
    toc: TocEventDetails;
  }>();

  let items: TocEventItemDetails[];
  let stimulateHashNavigation = parameters?.stimulateHashNavigation ?? true;

  function onToc(e: CustomEvent<TocEventDetails>) {
    items = e.detail.items;

    if (stimulateHashNavigation) {
      const hash = location.hash?.substring(1);
      let matched: HTMLElement | undefined;
      for (const item of items) {
        if (item.id === hash) {
          matched = item.anchor ?? item.element;
        }
      }
      if (matched) {
        matched.click();
      }
    }

    dispatch('toc', e.detail);
  }
</script>

<!--
  @component
  Svelte `<Toc>` component that internally use `toc` action and display
  a basic table of contents with ul
  @public
-->

<svelte:body use:toc={{ ...parameters, stimulateHashNavigation: false }} on:toc={onToc} />

{#if items}
  <slot {items}>
    <ul class="toc-ul {ulClass}">
      {#each items as item}
        <li class="toc-li toc-li--{item.element.tagName.toLowerCase()} {liClass}">
          <slot name="anchor" {item}>
            <a href="#{item.id}">{item.text}</a>
          </slot>
        </li>
      {/each}
    </ul>
  </slot>
{/if}

<style>
  .toc-li.toc-li--h1 {
    font-weight: bold;
  }
  .toc-li.toc-li--h2 {
    margin-left: 1rem;
  }
  .toc-li.toc-li--h3 {
    margin-left: 2.5rem;
  }
  .toc-li.toc-li--h4 {
    margin-left: 4rem;
  }
  .toc-li.toc-li--h5 {
    margin-left: 6rem;
  }
  .toc-li.toc-li--h6 {
    margin-left: 7rem;
  }
</style>
