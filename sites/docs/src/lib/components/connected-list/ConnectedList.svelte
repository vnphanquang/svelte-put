<script lang="ts">
	let cls = '';
	export { cls as class };
</script>

<ul class="prose-p:m-0 prose-ul:m-4 prose-li:m-0 {cls}">
	<slot />
</ul>

<style>
	ul {
		counter-reset: connected-list;
	}
</style>
