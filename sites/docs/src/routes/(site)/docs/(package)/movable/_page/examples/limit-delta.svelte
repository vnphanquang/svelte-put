<script>
	import { movable } from '@svelte-put/movable';
</script>

<div
	class="grid h-20 w-20 place-items-center bg-blue-200 dark:text-black"
	use:movable={{ limit: { delta: '100%' } }}
>
	...
</div>
