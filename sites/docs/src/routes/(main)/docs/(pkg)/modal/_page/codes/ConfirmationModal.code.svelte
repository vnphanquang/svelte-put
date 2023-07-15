<script lang="ts">
  import { createModalEventDispatcher } from '@svelte-put/modal';
  import type { ExtendedModalProps, ExtendedModalEvents } from '@svelte-put/modal';
  import Modal from '@svelte-put/modal/Modal.svelte';

  // extending the base props
  type $$Props = ExtendedModalProps<{ disabled?: boolean }>;
  // extending the `resolve` event
  type $$Events = ExtendedModalEvents<{ confirmed: boolean }>;

  export let disabled = false;

  // create a custom event dispatcher with built-in helper
  const dispatch = createModalEventDispatcher<$$Events>();

  function resolve(confirmed: $$Props['disabled']) {
    // should get type autocompletion for dispatch here
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
<Modal classes={{ container: 'confirmation-modal bg-bg p-10' }} {...$$restProps} {dispatch}>
  <div class="modal-content">
    <p>Confirmation Modal</p>
    <p>Are you sure you want to proceed?</p>
    <div>
      <button type="button" on:click={confirm} {disabled} class="c-btn-primary">Confirm</button>
      <button type="button" on:click={cancel} {disabled} class="c-btn-primary-outline"
        >Cancel</button
      >
    </div>
  </div>
</Modal>
