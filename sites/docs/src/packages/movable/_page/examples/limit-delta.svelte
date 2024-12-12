<script>
	import { movable } from '@svelte-put/movable';
</script>

<div class="hl-info grid h-20 w-20 place-items-center" use:movable={{ limit: { delta: '100%' } }}>
	...
</div>
