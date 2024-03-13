<script>
  import { notiStore } from '../comprehensive/notification-store';

	// :::highlight
  import InteractiveNotification from './InteractiveNotification.svelte';
	// :::

  let state = 'idle';
  async function pushNoti() {
    const pushed = notiStore.push('custom', {
      timeout: false,
			// :::highlight
      component: InteractiveNotification,
			// :::
      props: {
        message: 'You are invited to join the Svelte community!',
      },
    });

    state = 'pending';
		// :::highlight
    const agreed = await pushed.resolve();
		// :::
    state = agreed ? 'accepted' : 'denied';
  }
</script>

<p>
  {#if state === 'idle'}
    Waiting for notification to be pushed
  {:else if state === 'pending'}
    Waiting for user action to resolve notification
  {:else}
    Invitation was <span
			class="px-2"
      class:text-error-text={state == 'denied'}
      class:bg-error-surface={state == 'denied'}
      class:text-success-text={state === 'accepted'}
      class:bg-success-surface={state == 'accepted'}
    >
      {state}
    </span>
  {/if}
</p>
<button
	class="c-btn"
	on:click={pushNoti}
	disabled={state === 'pending'}
>
	Trigger Interactive Notification
</button>