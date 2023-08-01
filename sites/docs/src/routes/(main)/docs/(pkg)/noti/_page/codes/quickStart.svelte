<script lang="ts">
  import { portal, store } from '@svelte-put/noti';

  import Notification from './Notification.svelte';

  // setup somewhere global, reuse across app
  const notiStore = store()
    .variant('info', Notification)
    .variant('special', {
      component: Notification,
      props: {
        special: true,
        content: 'A very special notification',
      },
    })
    .build();

  const pushInfo = () => notiStore.push('info', { props: { content: 'An info notification' } });
  const pushSpecial = () => notiStore.push('special');
</script>

<!-- notification portal, typically setup at somewhere global like root layout -->
<aside
  class="fixed z-notification inset-0 p-10 pointer-events-none flex flex-col-reverse gap-4 justify-end"
  use:portal={notiStore}
/>

<!-- notification push triggers -->
<button class="c-btn-primary" on:click={pushInfo}>Push an info notification</button>
<button class="c-btn-primary-outline" on:click={pushSpecial}>Push a special notification</button>
