<!-- Notification.svelte -->
<script lang="ts">
  import type { NotificationInstanceConfig } from '@svelte-put/noti';
  import { fly } from 'svelte/transition';

  export let config: NotificationInstanceConfig;

  export let content = 'Placeholder';
  export let special = false;
</script>

<div
  class="px-4 py-2 bg-blue-200 rounded-sm not-prose shadow-lg text-dark pointer-events-auto"
  class:bg-pink-300={special}
  in:fly|global={{ duration: 200, y: -20 }}
>
  <p>Notification (variant: {config.variant}): {content} (id = {config.id})</p>
</div>
