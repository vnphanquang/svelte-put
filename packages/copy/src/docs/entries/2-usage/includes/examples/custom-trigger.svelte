<script lang="ts">
  import { copy } from '@svelte-put/copy';
	let trigger: HTMLElement;
</script>
<!-- ---cut--- -->
<button use:copy={{ trigger }} type="button">Click</button>
<p bind:this={trigger}>copy this</p>