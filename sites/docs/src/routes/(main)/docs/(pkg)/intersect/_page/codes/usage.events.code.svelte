<script lang="ts">
  import { intersect, type IntersectDetail } from '@svelte-put/intersect';

  let detail: IntersectDetail;
  function onIntersect(e: CustomEvent<IntersectDetail>) {
    detail = e.detail;
  }
</script>

<div
  class="mx-auto flex h-80 w-4/5 flex-col items-center justify-between bg-blue-200"
  use:intersect={{ threshold: 0.5, rootMargin: '-100px 0px 0px' }}
  on:intersect={onIntersect}
>
  {#each new Array(2) as _}
    <p>
      {#if detail}
        <span>Scrolling {detail.direction}</span> &
        <span>{detail.entries[0]?.isIntersecting ? 'entering' : 'leaving'}</span>
      {/if}
    </p>
  {/each}
</div>
