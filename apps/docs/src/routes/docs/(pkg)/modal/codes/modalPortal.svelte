<script lang="ts">
  import ModalPortal from '@svelte-put/modal/ModalPortal.svelte';

  import { appStore } from '$lib/services/modal';
</script>

<slot />

<ModalPortal store={appStore} />
