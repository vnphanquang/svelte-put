<script lang="ts">
  import { shortcut, type ShortcutEventDetails } from '@svelte-put/shortcut';

  function handleK(detail: ShortcutEventDetails) {
    console.log('attached node:', detail.node);
    console.log('original trigger config:', detail.trigger);
  }
</script>

<div
  use:shortcut={{
    trigger: {
      key: 'k',
      modifier: ['ctrl', 'meta'],
      callback: handleK,
    },
  }}
/>
