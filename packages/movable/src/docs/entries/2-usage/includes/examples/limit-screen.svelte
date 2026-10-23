<script lang="ts">
	import { movable } from '@svelte-put/movable';
</script>

<div class="grid place-items-center border-2 border-primary px-4 py-6 space-y-4">
  <p class="text-center">
    Box below can be moved around,
		<br />
		but only within viewport.
  </p>
	<div
		class="hl-info grid h-20 w-20 place-items-center"
		use:movable={{ limit: { parent: 'screen' } }}
	>
		...
	</div>
</div>