<script lang="ts">
	import { notiStack } from './noti-stack.svelte';
</script>

<div>
	{#each notiStack.items as item (item.config.id)}
		<!-- [!code info] -->
		<item.render.component {...item.render.props()} />
	{/each}
</div>