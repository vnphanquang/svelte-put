<script>
  import { appStore } from '$lib/services/modal';

  import ConfirmationModal from './ConfirmationModal.code.svelte';
  let pushed;
  async function open() {
    // should get type autocompletion for pushed here
    pushed = appStore.push(ConfirmationModal);
    const { confirmed, trigger } = await pushed.resolve();
    if (confirmed) {
      // do something
    }
    console.log('Modal resolves to', confirmed);
    console.log('Modal was popped by', trigger);
  }
  // actions inside modal will also call pop internally
  function close() {
    if (pushed) {
      appStore.pop(pushed);
      // if the modal is successfully popped by this operation,
      // the `await` expression in the `open` method above will resolve
      // the `trigger` will be `pop`
    }
  }
</script>

<button on:click={open} class="c-btn-primary">Open ConfirmationModal</button>
