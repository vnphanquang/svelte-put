<script>
	import '$lib/app.css';
	import { notiCtrl } from './noti';
  import { flip } from 'svelte/animate';
  import { fly, fade } from 'svelte/transition';
</script>

<slot />

<aside class="grid grid-cols-1 gap-10 relative">
  {#each notiCtrl.notifications as notification (notification.config.id)}
    <div
			animate:flip={{ duration: 200 }}
			in:fly={{ duration: 200 }}
			out:fade={{ duration: 120 }} class="w-full relative"
			use:notiCtrl.actions.render={notification}
		></div>
  {/each}
</aside>
