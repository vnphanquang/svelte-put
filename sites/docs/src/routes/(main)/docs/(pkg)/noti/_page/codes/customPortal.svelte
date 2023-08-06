<script lang="ts">
  import { store } from '@svelte-put/noti';
  import NotificationWrapper from '@svelte-put/noti/Notification.svelte';
  import { flip } from 'svelte/animate';
  import { fly, fade } from 'svelte/transition';

  import Notification from './Notification.svelte';

  // define somewhere global, reuse across app
  const notiStore = store()
    .variant('info', Notification)
    .variant('special', {
      id: 'counter',
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
  class="fixed z-notification inset-y-0 right-0 md:left-1/2 p-10 pointer-events-none flex flex-col-reverse gap-4 justify-end md:justify-start"
>
  {#each $notiStore.notifications as notification (notification.id)}
    <div animate:flip={{ duration: 200 }} in:fly={{ duration: 200 }} out:fade={{ duration: 120 }}>
      <NotificationWrapper {notification} />
    </div>
  {/each}
</aside>

<!-- notification push triggers -->
<button class="c-btn-primary" on:click={pushInfo}>Push an info notification</button>
<button class="c-btn-primary-outline" on:click={pushSpecial}>Push a special notification</button>
