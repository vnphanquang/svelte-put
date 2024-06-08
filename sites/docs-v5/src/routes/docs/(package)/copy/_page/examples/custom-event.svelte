<script>
  import { copy } from '@svelte-put/copy';
</script>

<button type="button" use:copy={{ event: 'mousedown' }}>...</button>
<button type="button" use:copy={{ event: ['pointerenter', 'pointerleave'] }}>...</button>