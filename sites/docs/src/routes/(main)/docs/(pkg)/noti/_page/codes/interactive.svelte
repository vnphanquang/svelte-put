<script>
  import InteractiveNotification from './InteractiveNotification.svelte';
  import { notiStore } from './notification-store';

  let state = 'idle';
  async function pushNoti() {
    const pushed = notiStore.push('custom', {
      timeout: false,
      component: InteractiveNotification,
      props: {
        message: 'You are invited to join the Svelte community!',
      },
    });

    state = 'pending';
    const agreed = await pushed.resolve();
    state = agreed ? 'accepted' : 'denied';
  }
</script>

<p class="text-blue-500">
  {#if state === 'idle'}
    Waiting for notification to be pushed
  {:else if state === 'pending'}
    Waiting for user action to resolve notification
  {:else}
    Invitation was <strong
      class:text-red-500={state == 'denied'}
      class:text-green-500={state === 'accepted'}
    >
      {state}
    </strong>
  {/if}
</p>
<button class="c-btn-primary" on:click={pushNoti} disabled={state === 'pending'}
  >Trigger Interactive Notification</button
>
