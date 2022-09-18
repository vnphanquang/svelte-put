<script lang="ts">
  import { afterUpdate, type ComponentEvents } from 'svelte';

  import type { createModalStore } from './modal';
  import type { PushedModal, ModalComponentBase, ModalComponentBaseResolved } from './modal.types';

  /**
   * a modal store, one created from {@link createModalStore}
   */
  export let store: ReturnType<typeof createModalStore>;

  let isOpenModal = false;

  function onResolve<
    Component extends ModalComponentBase,
    Resolved extends ModalComponentBaseResolved = ComponentEvents<Component>['resolve']['detail'],
  >(modal: PushedModal<Component>, event: CustomEvent<Resolved>) {
    store.pop(modal.id, event.detail);
  }

  afterUpdate(() => {
    isOpenModal = Boolean($store.length);
  });
</script>

<!--
  @component

  Register this 'portal' where you want to render the modal stack, ideally as
  the direct descendant of the root element of your app.

  @public
-->

{#if isOpenModal}
  <aside class="s-modal-portal {$$props.class}">
    {#each $store as modal, index (modal.id)}
      <svelte:component
        this={modal.component}
        {...modal.props}
        topmost={index === $store.length - 1}
        on:resolve={(event) => onResolve(modal, event)}
      />
    {/each}
  </aside>
{/if}

<style>
  :where(.s-modal-portal) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
