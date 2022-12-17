<script lang="ts">
  import ModalPortal from '@svelte-put/modal/ModalPortal.svelte';

  import { appStore } from '$client/services/modal';
</script>

<slot />

<ModalPortal store={appStore} />
