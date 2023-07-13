<script lang="ts">
  import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';

  let commandPalette = false;
  function onOpenCommandPalette() {
    commandPalette = true;
  }
  function onCloseCommandPalette() {
    commandPalette = false;
  }

  function doSomethingElse(details: ShortcutEventDetail) {
    console.log('Action was placed on:', details.node);
    console.log('Trigger:', details.trigger);
  }

  function onShortcut(event: CustomEvent<ShortcutEventDetail>) {
    if (event.detail.trigger.id === 'do-something-else') {
      console.log('Same as doSomethingElse()');
      // be careful here doSomethingElse would have been called too
    }
  }
</script>

<svelte:window
  use:shortcut={{
    trigger: [
      {
        key: 'k',
        // trigger if either ctrl or meta is pressed
        modifier: ['ctrl', 'meta'],

        callback: onOpenCommandPalette,
        preventDefault: true,
      },
      {
        key: 'Escape',
        // preferably avoid arrow functions here for better performance,
        // with arrow functions the action has to be updated more frequently
        callback: onCloseCommandPalette,
        enabled: commandPalette,
        preventDefault: true,
      },
      {
        key: 'k',
        // trigger if both ctrl & shift are pressed
        modifier: [['ctrl', 'shift']],
        id: 'do-something-else',
        callback: doSomethingElse,
      },
    ],
  }}
  on:shortcut={onShortcut}
/>
