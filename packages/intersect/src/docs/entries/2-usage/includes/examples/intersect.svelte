<script lang="ts">
	import { intersect, type IntersectDetail } from '@svelte-put/intersect';

	function handleIntersection(e: CustomEvent<IntersectDetail>) {
		const { observer, entries, direction } = e.detail;
		console.log('the observer itself', observer);
		console.log('scrolling direction:', direction);
		console.log('intersecting:', entries[0]?.isIntersecting ? 'entering' : 'leaving');
	}
</script>

<section use:intersect onintersect={handleIntersection}>...</section>