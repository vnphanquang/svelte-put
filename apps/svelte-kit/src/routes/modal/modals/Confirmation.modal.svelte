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
<Modal classes={{ container: 'confirmation-modal' }} {...$$restProps} dispatch={dispatch}>
  <div class="modal-content">
    <h2>Confirmation Modal</h2>
    <p>Are you sure you want to proceed?</p>
    <div>
      <button type="button" on:click={confirm} {disabled}>Confirm</button>
      <button type="button" on:click={cancel} {disabled}>Cancel</button>
    </div>
  </div>
</Modal>
