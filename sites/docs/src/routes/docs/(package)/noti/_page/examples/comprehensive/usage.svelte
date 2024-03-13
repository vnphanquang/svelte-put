<script lang="ts">
  import { notiStore } from './notification-store';

  const pushInfo = () => notiStore.push('info', { props: { content: 'An info notification' } });
  const pushSpecial = () => notiStore.push('special');
</script>

<!-- notification push triggers -->
<button class="c-btn c-btn--outlined" on:click={pushInfo}>Push an info notification</button>
<button class="c-btn" on:click={pushSpecial}>Push a special notification</button>