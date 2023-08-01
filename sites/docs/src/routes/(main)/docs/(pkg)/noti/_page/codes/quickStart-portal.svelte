<script>
  import { portal } from '@svelte-put/noti';

  import { notiStore } from './notification-store';
</script>

<!-- notification portal, typically setup at somewhere global like root layout -->
<aside
  class="fixed z-notification inset-0 p-10 pointer-events-none flex flex-col-reverse gap-4 justify-end"
  use:portal={notiStore}
/>
