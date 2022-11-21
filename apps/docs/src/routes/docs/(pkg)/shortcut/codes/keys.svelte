<script>
  import { shortcut } from '@svelte-put/shortcut';
</script>

<div use:shortcut={{ trigger: { key: 'k', modifier: 'ctrl' } }} />
<div
  use:shortcut={{
    trigger: [
      { key: 'k', modifier: 'ctrl' },
      { key: 'l', modifier: 'meta' },
    ],
  }}
/>
