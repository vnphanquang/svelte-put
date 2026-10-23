<script lang="ts">
	import { movable } from '@svelte-put/movable';

	let parent: HTMLElement;
</script>

<div class="not-prose grid place-items-center space-y-4 border-2 border-primary py-10 px-4" bind:this={parent}>
  <p class="text-center">
		<code>mousedown</code> on <span class="hl-error px-2">red</span> box will not trigger movable.
	</p>
	<div class="hl-info h-40 w-40 p-2 grid place-items-center" use:movable={{ limit: { parent }, ignore: '.to-ignore' }}>
		<p class="to-ignore hl-error cursor-auto p-2 text-sm">To ignore</p>
	</div>
</div>