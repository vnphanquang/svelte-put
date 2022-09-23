<script lang="ts">
  import { createModalEventDispatcher } from '@svelte-put/modal';
  import type { ExtendedModalProps, ExtendedModalEvents } from '@svelte-put/modal';
  import Modal from '@svelte-put/modal/Modal.svelte';

  type $$Props = ExtendedModalProps<{ disabled?: boolean }>;
  type $$Events = ExtendedModalEvents<{ confirmed: boolean }, {
    anotherEvent: CustomEvent<{ payload: string }>;
  }>;

  export let disabled: NonNullable<$$Props['disabled']> = false;

  const dispatch = createModalEventDispatcher<$$Events>();

  function resolve(confirmed: boolean) {
    dispatch('resolve', {
      trigger: 'custom',
      confirmed,
    });
  }
  function confirm() {
    resolve(true);
  }
  function cancel() {
    resolve(false);
  }
</script>

<!-- props is forwarded to the base Modal component -->
<!-- and the custom dispatch is also passed down -->
<Modal
  classes={{ container: 'confirmation-modal' }}
  {...$$restProps}
  dispatch={dispatch}
  accessibility={{
    role: 'dialog',
    labelledBy: 'confirmation-dialog-title',
    describedBy: 'confirmation-dialog-description',
  }}
>
  <div class="modal-content">
    <h2 id="confirmation-dialog-title">Confirmation Modal</h2>
    <p id="confirmation-dialog-description">Are you sure you want to proceed?</p>
    <div>
      <button type="button" on:click={confirm} {disabled}>Confirm</button>
      <button type="button" on:click={cancel} {disabled}>Cancel</button>
    </div>
  </div>
</Modal>

<style>
  :global(.confirmation-modal) {
    background-color: #fff;
    border-radius: 0.25rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
  }

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .modal-content {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  button {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    background-color: #fff;
    cursor: pointer;
  }

  button:hover {
    background-color: tomato;
  }
</style>
