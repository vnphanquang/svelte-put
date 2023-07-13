<script lang="ts">
  import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';

  function handleK(detail: ShortcutEventDetail) {
    console.log('attached node:', detail.node);
    console.log('original trigger config:', detail.trigger);
  }
</script>

<svelte:window
  use:shortcut={{
    trigger: {
      key: 'k',
      modifier: ['ctrl', 'meta'],
      callback: handleK,
    },
  }}
/>
