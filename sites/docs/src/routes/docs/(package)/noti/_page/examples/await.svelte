<script lang="ts">
  import { notiStore } from './comprehensive/notification-store';

  let promise: Promise<unknown> | null = null;
  async function pushNoti() {
    const pushed = notiStore.push('info', {
      timeout: false,
      props: { content: 'A persistent notification' },
    });

    promise = pushed.resolve();
    await promise;
    setTimeout(() => (promise = null), 2000);
  }

  function popNoti() {
    notiStore.pop();
  }
</script>

<button
  on:click={pushNoti}
  disabled={!!promise}
  class="c-btn"
  class:bg-gray-500={!!promise}
>
  Push a persistent notification
</button>
{#if promise}
  <p class="mt-2 text-blue-500">
    {#await promise}
      Notification is pushed and waiting for resolution. Either click the x button on the
      notification, or <button class="c-link" on:click={popNoti}>click here</button> to pop the notification.
    {:then}
      Resolved (resetting in 2 seconds)
    {/await}
  </p>
{/if}