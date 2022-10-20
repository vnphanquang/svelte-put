<script lang="ts">
  import { createModalStore, type ModalPushOutput } from '@svelte-put/modal';
  import ModalPortal from '@svelte-put/modal/ModalPortal.svelte';

  import ConfirmationModal from './modals/Confirmation.modal.svelte';
  import FullCustomModal from './modals/FullCustom.modal.svelte';
  import SimpleNoActionModal from './modals/SimpleNoAction.modal.svelte';

  const appModal = createModalStore();

  let confirmationModal: ModalPushOutput<ConfirmationModal> | null;
  async function openConfirmationModal() {
    confirmationModal = appModal.push({
      component: ConfirmationModal,
      props: {
        movable: true,
        backdrop: false,
      },
    });
    const { confirmed, trigger } = await confirmationModal.resolve();
    confirmationModal = null;
    console.log('ConfirmationModal resolves - confirmed:', confirmed);
    console.log('ConfirmationModal resolves - trigger:', trigger);
  }
  function closeConfirmationModal() {
    if (confirmationModal) {
      appModal.pop(confirmationModal);
      confirmationModal = null;
    }
  }

  async function openSimpleNoActionModal() {
    const pushed = appModal.push({
      component: SimpleNoActionModal,
      props: {
        backdrop: 'static',
      },
    });
    const { trigger } = await pushed.resolve();
    console.log('SimpleNoActionModal resolves - trigger:', trigger);
  }

  async function openFullCustomModal() {
    const pushed = appModal.push(FullCustomModal);
    const { trigger } = await pushed.resolve();
    console.log('FullCustomModal resolves - trigger:', trigger);
  }
</script>

<title>modal | @svelte-put</title>

<main>
  <a href="https://github.com/vnphanquang/svelte-put/tree/main/packages/misc/modal">
    See github for documentation
  </a>
  <article>
    <h2>Simple No Action Modal</h2>
    <ul>
      <li>Can't be dragged around</li>
      <li>Has `static` backdrop (can't be clicked)</li>
    </ul>
    <button type="button" on:click={openSimpleNoActionModal}> Open </button>
    <p>See component `SimpleNoAction.modal.svelte`</p>
  </article>
  <article>
    <h2>Confirmation Modal</h2>
    <ul>
      <li>Can be dragged around the screen</li>
      <li>Has no backdrop</li>
      <li>Can be closed manually (close button below)</li>
    </ul>
    <div>
      <button type="button" on:click={openConfirmationModal} disabled={!!confirmationModal}>
        Open
      </button>
      <button type="button" on:click={closeConfirmationModal} disabled={!confirmationModal}>
        Close
      </button>
    </div>
    <p>See component `ConfirmationModal.modal.svelte`</p>
  </article>
  <article>
    <h2>Completely Custom Modal</h2>
    <ul>
      <li>Does not need to use the base `Modal` from `@svelte-put/modal`</li>
    </ul>
    <button type="button" on:click={openFullCustomModal}> Open </button>
    <p>See component `FullCustom.modal.svelte`</p>
  </article>
</main>

<ModalPortal store={appModal} />

<style>
  main {
    flex: 1;
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  article {
    width: 500px;
    border: #ccc solid 2px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  button {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    background-color: #fff;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.5;
    background-color: gray;
    cursor: not-allowed;
  }
</style>
