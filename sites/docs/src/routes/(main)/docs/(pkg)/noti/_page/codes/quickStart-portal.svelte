<script>
  import { portal } from '@svelte-put/noti';

  import { notiStore } from './notification-store';
</script>

<!-- notification portal, typically setup at somewhere global like root layout -->
<aside
  class="fixed z-notification inset-y-0 right-0 md:left-1/2 p-10 pointer-events-none flex flex-col-reverse gap-4 justify-end md:justify-start"
  use:portal={notiStore}
/>
