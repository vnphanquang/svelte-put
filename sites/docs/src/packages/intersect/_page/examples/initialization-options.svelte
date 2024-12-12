<script>
	import { intersect } from '@svelte-put/intersect';
	let root;
</script>

<main bind:this={root}>
	<section
		use:intersect={{
			enabled: true,
			root,
			rootMargin: '100px 0px 50px 0px',
			threshold: [0.2, 0.5, 1],
		}}
	></section>
</main>
