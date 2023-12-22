<script lang="ts">
  import type { ShortcutEventDetail } from '@svelte-put/shortcut';
  import { shortcut } from '@svelte-put/shortcut';

  function onShortcut(event: CustomEvent<ShortcutEventDetail>) {
    const keyboardEvent = event.detail.originalEvent;
    // be cautious: `keyboardEvent` has already reached window here

    keyboardEvent.preventDefault(); // prevent browser default

    if ((keyboardEvent.target as HTMLElement)?.tagName === 'INPUT') {
      console.log('some input is focused, should skip');
      return;
    }
    // do things
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
