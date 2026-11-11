<script>
	import { copy } from '@svelte-put/copy';
</script>
<!-- ---cut--- -->
<button use:copy={{ event: 'mousedown' }} type="button">...</button>
<button use:copy={{ event: ['pointerenter', 'pointerleave'] }} type="button">...</button>