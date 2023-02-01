<script>
  import { shortcut } from '@svelte-put/shortcut';
</script>

<svelte:window
  use:shortcut={{ trigger: { key: 'k', modifier: 'ctrl' } }}
  use:shortcut={{
    trigger: [
      { key: 'k', modifier: 'ctrl' },
      { key: 'l', modifier: 'meta' },
    ],
  }}
/>
