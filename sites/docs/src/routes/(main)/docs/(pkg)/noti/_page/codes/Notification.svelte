<!-- Notification.svelte -->
<script lang="ts">
  import type { NotificationInstance } from '@svelte-put/noti';
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';

  // optional, injected automatically by @svelte-put/noti
  export let notification: NotificationInstance;

  export let content = 'Placeholder';
  export let special = false;

  const dispatch = createEventDispatcher<{ resolve: string }>();

  const dismiss = () => dispatch('resolve', 'popped from within component');
</script>

<div
  class="px-4 py-2 bg-blue-200 rounded-sm not-prose shadow-lg text-dark pointer-events-auto flex items-center justify-between"
  class:bg-pink-300={special}
  in:fly|global={{ duration: 200, y: -20 }}
>
  <p>Notification (variant: {notification.variant}): {content} (id = {notification.id})</p>
  <button on:click={dismiss}>
    <svg inline-src="google/close" width="20" height="20" />
  </button>
</div>
