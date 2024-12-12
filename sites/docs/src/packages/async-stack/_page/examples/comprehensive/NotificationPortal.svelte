<script>
	import { flip } from 'svelte/animate';
	import { fly, fade } from 'svelte/transition';

	import { notiStack } from './notification-stack';
</script>

<!-- notification portal, typically setup at somewhere global like root layout -->
<aside
	class="z-notification pointer-events-none fixed inset-y-0 right-0 flex flex-col-reverse justify-end gap-4 p-10 md:left-1/2 md:justify-start"
>
	{#each notiStack.items as notification (notification.config.id)}
		<div
			animate:flip={{ duration: 200 }}
			in:fly={{ duration: 200, x: 20 }}
			out:fade={{ duration: 120 }}
			class="relative w-full"
			use:notiStack.actions.render={notification}
		></div>
	{/each}
</aside>
