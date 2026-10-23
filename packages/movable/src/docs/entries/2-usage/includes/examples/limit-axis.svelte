<script>
	import { movable } from '@svelte-put/movable';
</script>


<div class="grid place-items-center border-2 border-primary px-4 py-6 space-y-4">
  <p class="text-center">
    Box below can be moved around only in the x axis,
		<br />
		combined with a delta limit of <code>±100%</code > (of its width).
  </p>
  <div class="px-20 border border-dashed border-red-500">
		<div
			class="hl-info grid h-20 w-20 place-items-center"
			use:movable={{ limit: { delta: { x: '100%', y: 0 } } }}
		>
			...
		</div>
  </div>
</div>