<script lang="ts">
	let pending = $state(false);
	async function push() {
		pending = true;
		const pushed = notiStack.push('persistent');
		await pushed.resolution; // [!code info]
		pending = false;
	}
</script>

<button onclick={push} type="button">
	Push a persistent notification
</button>