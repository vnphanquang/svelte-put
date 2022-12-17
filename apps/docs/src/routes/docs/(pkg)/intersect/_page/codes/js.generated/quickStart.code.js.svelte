<script>
  import { intersect } from '@svelte-put/intersect';
  function onIntersect(e) {
    const { observer, entries, direction } = e.detail;
    console.log('scrolling direction:', direction);
    console.log('intersecting:', entries[0]?.isIntersecting ? 'entering' : 'leaving');
  }
</script>

<div use:intersect on:intersect={onIntersect} />
