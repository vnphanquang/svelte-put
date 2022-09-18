<script lang="ts">
  import { createModalStore } from '@svelte-put/modal';
  import ModalPortal from '@svelte-put/modal/ModalPortal.svelte';

  const appModal = createModalStore();

  function openConfirmationModal() {
    //
  }
</script>

<title>modal | @svelte-put</title>

<main class="flex flex-1 flex-col p-10">
  <button type="button" on:click={openConfirmationModal}>
    Open Confirmation Modal
  </button>
</main>

<ModalPortal store={appModal} />
