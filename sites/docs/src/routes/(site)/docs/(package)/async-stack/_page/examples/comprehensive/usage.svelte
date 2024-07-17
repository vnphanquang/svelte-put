<script lang="ts">
  import { notiStack } from './notification-stack';

  const pushInfo = () => notiStack.push('info', { props: { content: 'An info notification' } });
  const pushSpecial = () => notiStack.push('special');
</script>

<!-- notification push triggers -->
<button class="c-btn c-btn--outlined" onclick={pushInfo}>Push an info notification</button>
<button class="c-btn" onclick={pushSpecial}>Push a special notification</button>

