<script lang="ts">
  import type { ExtendedModalProps } from '@svelte-put/modal';
  import Modal from '@svelte-put/modal/Modal.svelte';

  // just reexporting props here
  type $$Props = ExtendedModalProps;
</script>

<Modal classes={{ container: 'custom-modal-container' }} {...$$props} on:resolve>
  <h2>An Information Modal Without Any Actions</h2>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo commodi maxime nemo quibusdam
    quas, ab adipisci eum distinctio cum dolorum dolores sit dolorem unde officia odio. Quibusdam,
    earum? Eaque, dolor.
  </p>
</Modal>

<style>
  :global(.custom-modal-container) {
    background: lightblue;
    padding: 80px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
</style>
