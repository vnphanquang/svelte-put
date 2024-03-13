<script lang="ts">
  import type { NotificationInstance } from '@svelte-put/noti';
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';

  // optional, injected automatically by @svelte-put/noti
  export let notification: NotificationInstance;

  export let content = 'Placeholder';
  export let special = false;

  const { progress } = notification;

  const dispatch = createEventDispatcher<{ resolve: string }>();
  const dismiss = () => dispatch('resolve', 'popped from within component');
</script>

<!-- eslint-disable svelte/valid-compile -->
<div
  class="relative px-4 py-2 bg-blue-200 rounded-sm not-prose shadow-lg text-black pointer-events-auto flex items-start md:items-center justify-between"
  class:bg-pink-300={special}
  in:fly|global={{ duration: 200, y: -20 }}
  on:mouseenter={progress.pause}
  on:mouseleave={progress.resume}
>
  <p>Notification (variant: {notification.variant}): {content} (id = {notification.id})</p>
  <button on:click={dismiss} class="md-max:mt-0.5">
    <svg inline-src="lucide/x" width="24" height="24" />
  </button>
  <div
    class="progress absolute inset-x-0 bottom-0 h-0.5 bg-blue-500 origin-left"
    class:bg-pink-500={special}
    class:paused={$progress.state === 'paused'}
    style={`--progress-duration: ${notification.timeout}ms;`}
  />
</div>

<style>
  .progress {
    animation: progress var(--progress-duration) linear;
  }

  .progress.paused {
    animation-play-state: paused;
  }

  @keyframes progress {
    from {
      transform: scaleX(0);
    }

    to {
      transform: scaleX(1);
    }
  }
</style>