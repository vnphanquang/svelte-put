<script lang="ts">
  import type { ShortcutEventDetail } from '@svelte-put/shortcut';
  import { shortcut } from '@svelte-put/shortcut';

  function onShortcut(event: CustomEvent<ShortcutEventDetail>) {
    const keyboardEvent = event.detail.originalEvent;
    keyboardEvent.preventDefault();
    if ((keyboardEvent.target as HTMLElement)?.tagName === 'INPUT') {
      console.log('input focused, shortcut ignored');
      return;
    }
  }
</script>

<svelte:window
  use:shortcut={{
    trigger: {
      key: 'k',
      modifier: ['ctrl', 'meta'],
    },
  }}
  on:shortcut={onShortcut}
/>
