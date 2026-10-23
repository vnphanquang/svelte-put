<script>
	import { movable } from '@svelte-put/movable';
</script>


<div class="grid place-items-center border-2 border-primary px-4 py-6 space-y-4">
  <p class="text-center">
    Box below can be moved around around,
		<br />
		but only within a delta of <code>±100%</code > (of its own size).
  </p>
  <div class="p-20 border border-dashed border-red-500">
		<div
			class="hl-info grid h-20 w-20 place-items-center"
			use:movable={{ limit: { delta: '100%' } }}
		>
			...
		</div>
  </div>
</div>