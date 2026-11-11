<script lang="ts">
	import { intersect, type IntersectDetail } from '@svelte-put/intersect';

	function handleIntersectionOnce(e: CustomEvent<IntersectDetail>): void {}
</script>
<!-- ---cut--- -->
<section use:intersect onintersectonce={handleIntersectionOnce}>...</section>