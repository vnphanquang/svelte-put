<script>
  import { flip } from 'svelte/animate';
  import { fly, fade } from 'svelte/transition';

	import { notiStack } from './notification-stack';
</script>

<!-- notification portal, typically setup at somewhere global like root layout -->
<aside class="fixed z-notification inset-y-0 right-0 md:left-1/2 p-10 pointer-events-none flex flex-col-reverse gap-4 justify-end md:justify-start">
  {#each notiStack.items as notification (notification.config.id)}
    <div
			animate:flip={{ duration: 200 }}
			in:fly={{ duration: 200, x: 20 }}
			out:fade={{ duration: 120 }} class="w-full relative"
			use:notiStack.actions.render={notification}
		></div>
  {/each}
</aside>

