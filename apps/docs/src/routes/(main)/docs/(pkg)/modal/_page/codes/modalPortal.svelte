<script lang="ts">
  import ModalPortal from '@svelte-put/modal/ModalPortal.svelte';

  import { modalStore } from '$client/services/modal';
</script>

<slot />

<ModalPortal store={modalStore} />
