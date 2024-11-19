<script>
	import { movable } from '@svelte-put/movable';
</script>

<div
	class="bg-info-bg text-info-fg grid h-20 w-20 place-items-center"
	use:movable={{ limit: { delta: '100%' } }}
>
	...
</div>
