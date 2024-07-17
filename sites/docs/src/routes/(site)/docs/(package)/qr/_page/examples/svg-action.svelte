<script>
  import { qr } from '@svelte-put/qr/svg';
</script>

<svg
  use:qr={{
    data: 'https://svelte-put.vnphanquang.com/docs/qr',
    logo: 'https://svelte-put.vnphanquang.com/images/svelte-put-logo.svg',
    shape: 'circle',
  }}
/>