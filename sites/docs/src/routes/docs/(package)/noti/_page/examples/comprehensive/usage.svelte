<script lang="ts">
  import { notiCtrl } from './notification-controller';

  const pushInfo = () => notiCtrl.push('info', { props: { content: 'An info notification' } });
  const pushSpecial = () => notiCtrl.push('special');
</script>

<!-- notification push triggers -->
<button class="c-btn c-btn--outlined" on:click={pushInfo}>Push an info notification</button>
<button class="c-btn" on:click={pushSpecial}>Push a special notification</button>