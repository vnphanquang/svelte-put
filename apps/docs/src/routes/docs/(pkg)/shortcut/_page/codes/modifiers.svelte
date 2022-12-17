<script>
  import { shortcut } from '@svelte-put/shortcut';
</script>

<!-- listen for one of many modifiers (or) -->
<!-- ctrl+k or meta+k -->
<window
  use:shortcut={{
    trigger: {
      key: 'k',
      modifier: ['ctrl', 'meta'],
    },
  }}
/>

<!-- listen for a combination of multiple modifiers (and) -->
<!-- ctrl+shift+k -->
<window
  use:shortcut={{
    trigger: {
      key: 'k',
      modifier: [['ctrl', 'shift']],
    },
  }}
/>

<!-- mix & match -->
<!-- ctrl+shift+k or meta+k -->
<window
  use:shortcut={{
    trigger: {
      key: 'k',
      modifier: [['ctrl', 'shift'], ['meta']],
    },
  }}
/>
