<script lang="ts">
  import type { ComponentEvents } from 'svelte';

  import type { createModalStore } from './modal';
  import type {
    ModalComponentBase,
    ModalComponentBaseResolved,
    ModalPushOutput,
  } from './modal.types';

  /**
   * a modal store, one created from {@link createModalStore}
   */
  export let store: ReturnType<typeof createModalStore>;

  function onResolve<
    Component extends ModalComponentBase,
    Resolved extends ModalComponentBaseResolved = ComponentEvents<Component>['resolve']['detail'],
  >(modal: ModalPushOutput<Component, Resolved>, event: CustomEvent<Resolved>) {
    store.pop(modal, event.detail);
  }
</script>

<!--
  @component

  Register this 'portal' where you want to render the modal stack, ideally as
  the direct descendant of the root element of your app.

  @public
-->

<aside class="s-modal-portal {$$props.class ?? ''}">
  {#each $store as modal, index (modal.id)}
    <svelte:component
      this={modal.component}
      {...modal.props}
      topmost={index === $store.length - 1}
      on:resolve={(event) => onResolve(modal, event)}
    />
  {/each}
</aside>

<style>
  :global(:where(.s-modal-portal)) {
    pointer-events: none;

    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  :global(:where(.s-modal-portal *)) {
    pointer-events: auto;
  }
</style>
