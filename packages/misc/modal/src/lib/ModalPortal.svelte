<script lang="ts">
  import { afterUpdate, type ComponentEvents } from 'svelte';

  import type { createModalStore } from './modal';
  import type { PushedModal, ModalComponentBase, ModalComponentBaseResolved } from './modal.types';

  export let store: ReturnType<typeof createModalStore>;

  let isOpenModal = false;

  function onResolve<Component extends ModalComponentBase, Resolved extends ModalComponentBaseResolved = ComponentEvents<Component>['resolve']['detail']>(modal: PushedModal<Component>, event: CustomEvent<Resolved>) {
    store.pop(modal.id, event.detail);
  }

  afterUpdate(() => {
    isOpenModal = Boolean($store.length);
  });
</script>

{#if isOpenModal}
  <aside class="s-modal-portal {$$props.class}">
    <ul>
      {#each $store as modal, index (modal.id)}
        <li>
          <svelte:component
            this={modal.component}
            {...modal.props}
            topmost={index === $store.length - 1}
            on:resolve={(event) => onResolve(modal, event)}
          />
        </li>
      {/each}
    </ul>
  </aside>
{/if}

<style>
  .s-modal-portal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
