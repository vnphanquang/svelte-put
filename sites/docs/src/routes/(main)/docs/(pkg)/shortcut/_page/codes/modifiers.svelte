<script>
  import { shortcut } from '@svelte-put/shortcut';
</script>

<svelte:window
  use:shortcut={{
    // listen for one of many modifiers (or)
    // ctrl+k or meta+k
    trigger: {
      key: 'k',
      modifier: ['ctrl', 'meta'],
    },
  }}
  use:shortcut={{
    // listen for a combination of multiple modifiers (and)
    // ctrl+shift+k
    trigger: {
      key: 'k',
      modifier: [['ctrl', 'shift']],
    },
  }}
  use:shortcut={{
    // mix & match
    // ctrl+shift+k or meta+k
    trigger: {
      key: 'k',
      modifier: [['ctrl', 'shift'], ['meta']],
    },
  }}
/>
