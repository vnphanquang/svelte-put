<script lang="ts">
  import typescript from 'svelte-highlight/languages/typescript';

  import Code from '$client/components/Code/Code.svelte';
  import Installation from '$client/components/Installation/Installation.svelte';
  import ResourceLink from '$client/components/ResourceLink/ResourceLink.svelte';
  import { modalStore } from '$client/services/modal';
  import endImg from '$shared/assets/images/modals-modal-everywhere.webp';
  import { createSvelteReplUrl } from '$shared/utils/badge';

  import type { PageData } from './$types';
  import { codes } from './_page/codes';
  import FullCustomModal from './_page/codes/FullCustomModal.code.svelte';
  import InformationModal from './_page/codes/InformationModal.code.svelte';
  import PushAndPop from './_page/codes/pushAndPop.code.svelte';

  export let data: PageData;

  const SECTIONS = {
    usage: {
      title: 'Usage',
      id: 'usage',
    },
    globalModalStoreSetup: {
      title: 'Global Modal Store Setup',
      id: 'global-modal-store-setup',
    },
    modalPortalRegistration: {
      title: 'Modal Portal Registration',
      id: 'modal-portal-registration',
    },
    buildingModalComponent: {
      title: 'Building Modal Component',
      id: 'building-modal-component',
    },
    pushingAndPopping: {
      title: 'Pushing and Popping',
      id: 'pushing-and-popping',
    },
    buildingCompatibleModal: {
      title: 'Building Compatible Modal Components',
      id: 'building-compatible-modal-components',
    },
    uiStylingInteraction: {
      title: 'UI, Styling, and Interaction',
      id: 'ui-styling-and-interaction',
    },
    overridingSlots: {
      title: 'Overriding Slots',
      id: 'overriding-slots',
    },
    interactions: {
      title: 'Interactions',
      id: 'interactions',
    },
    extendingProps: {
      title: 'Extending Props',
      id: 'extending-props',
    },
    modalResolutionAndExtendingEvents: {
      title: 'Modal Resolution & Extending Events',
      id: 'modal-resolution-and-extending-events',
    },
    buildingYourOwnModal: {
      title: 'Building Your Own Modal',
      id: 'building-your-own-modal',
    },
    sideEffectsOnPop: {
      title: 'Side Effects On Pop',
      id: 'side-effects-on-pop',
    },
  };
  const resources = {
    Modal:
      'https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/src/lib/Modal.svelte',
    ModalPortal:
      'https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/src/lib/ModalPortal.svelte',
    ModalComponentBase:
      'https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/modal.modalcomponentbase.md',
    ModalComponentBaseResolved:
      'https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/modal.modalcomponentbaseresolved.md',
    ModalComponentBaseSlots:
      'https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/modal.modalcomponentbaseslots.md',
    ModalComponentBaseProps:
      'https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/modal.modalcomponentbaseprops.md',
    ModalComponentBasePropsAccessibility:
      'https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/modal.modalcomponentbaseprops.accessibility.md',
    ResolveTrigger:
      'https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/modal.resolvetrigger.md',
    ExtendedModalEvents:
      'https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/modal.extendedmodalevents.md',
    ExtendedModalProps:
      'https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/modal.extendedmodalprops.md',
  };

  function openInformationModal() {
    modalStore.push(InformationModal);
  }

  function openFullCustomModal() {
    modalStore.push({
      component: FullCustomModal,
      props: {
        content: 'Some custom content',
      },
    });
  }
</script>

<p class="c-callout-warning">
  I am experimenting with new solutions for <code>svelte-put/modal</code> that adopts a "headless"
  approach and will hopefully reduce the current complexity and allow easier integration with any UI
  preferences. Therefore, I recommend that you
  <a href="#{SECTIONS.buildingYourOwnModal.id}" class="c-link">build your own modal</a>
  instead of using the builtin <code>Modal</code> component (even though they will continue to work in
  the future).
</p>

<Installation pkg={data.package.name} />

<section>
  <h2>Introduction</h2>

  <p>
    <code>@svelte-put/modal</code> differs from existing solution by focusing on a three things:
  </p>
  <ol>
    <li>type safety: built for typescript users,</li>
    <li>async & stack-able push-pop mechanism,</li>
    <li>extensibility: minimal logics by <code>@svelte-put/modal</code>, ui by you.</li>
  </ol>

  <p>
    This document assumes you are using
    <ResourceLink key="svelte-kit" />, so components are imported directly from source svelte files.
    If you are using this in a different context, perhaps the import method as seen in the <ResourceLink
      href={createSvelteReplUrl(data.package.replId || '')}>REPL</ResourceLink
    > might help.
  </p>
  <p>
    You will notice also that code examples are shown in
    <ResourceLink key="typescript" /> by default. Typescript is recommended as it provides type safety
    and an overall better development experience, especially by leveraging the type inference for modal
    props and resolved payload.
  </p>
  <p>
    Throughout this document, you will see usage of the <code>$$Props</code> and
    <code>$$Events</code>
    special types (check out <ResourceLink
      href="https://github.com/sveltejs/language-tools/issues/442">this github thread</ResourceLink
    >). If you are not familiar with these, read <ResourceLink
      href="https://www.viget.com/articles/typing-components-in-svelte/"
      >this great article by Andrew Lester</ResourceLink
    >
    before continuing.
  </p>
</section>

<section>
  <h2 id={SECTIONS.usage.id}>{SECTIONS.usage.title}</h2>
  <p>Follow the steps laid out below.</p>

  <section>
    <h3 id={SECTIONS.globalModalStoreSetup.id}>1. {SECTIONS.globalModalStoreSetup.title}</h3>
    <p>
      Expose a global modal store singleton where it makes sense for you. This store is used in the
      next steps for modal push/pop.
    </p>
    <Code code={codes.modalStore} title="example: src/lib/services/modal.ts" lang={typescript} />
  </section>

  <section>
    <h3 id={SECTIONS.modalPortalRegistration.id}>2. <code>ModalPortal</code> Registration</h3>
    <p>
      Register the <ResourceLink {resources} key="ModalPortal" />
      where you want to render the modal stack, typically as a direct descendant of the root element
      of your site.
    </p>
  </section>
  <Code code={codes.modalPortal} title="example: src/routes/+layout.svelte" />

  <section>
    <h3 id={SECTIONS.buildingModalComponent.id}>
      3. {SECTIONS.buildingModalComponent.title}
    </h3>
    <p>
      <code>@svelte-put/modal</code> by design does not provide any predefined modals but only a
      base <ResourceLink {resources} key="Modal" /> component with basic skeleton that can be extended
      to fit a wide variety of use cases.
    </p>
    <p>
      Alternatively, any regular svelte component can be used as modal as long as it exposes the
      correct interface, as discussed the later <ResourceLink id={SECTIONS.buildingYourOwnModal.id}
        >{SECTIONS.buildingYourOwnModal.title}</ResourceLink
      > section.
    </p>
    <p>
      The example below shows how a confirmation modal might be implemented. See <ResourceLink
        id={SECTIONS.buildingCompatibleModal.id}
        >{SECTIONS.buildingCompatibleModal.title}</ResourceLink
      >
      for more details about customization possibilities.
    </p>
    <Code code={codes.modals.confirmation} title="example: ConfirmationModal.svelte" />
  </section>

  <section>
    <h3 id={SECTIONS.pushingAndPopping.id}>
      4. {SECTIONS.pushingAndPopping.title}
    </h3>
    <p>
      The custom modal in the
      <ResourceLink id={SECTIONS.buildingModalComponent.id}>last step</ResourceLink>
      can be opened idiomatically with the modal store created in
      <ResourceLink id={SECTIONS.globalModalStoreSetup.id}>step 1</ResourceLink>
      . See <ResourceLink id={SECTIONS.modalResolutionAndExtendingEvents.id}
        >Modal Resolution</ResourceLink
      >
      for details about the push&pop mechanism.
    </p>
    <fieldset class="space-y-4 border-2 border-violet-500 p-4">
      <legend>Example</legend>
      <p>
        Try open the modal using the button below. Then, with the dev console open, try closing by:
      </p>
      <ul>
        <li>clicking one of the two action buttons,</li>
        <li>clicking the <code>x</code> button on top right,</li>
        <li>clicking the backdrop.</li>
      </ul>
      <div class="grid place-items-center">
        <PushAndPop />
      </div>
    </fieldset>
    <Code code={codes.pushAndPop} title="example: push & pop" />
  </section>
</section>

<section>
  <h2 id={SECTIONS.buildingCompatibleModal.id}>{SECTIONS.buildingCompatibleModal.title}</h2>
  <p>
    Any component that satisfies the <ResourceLink {resources} key="ModalComponentBase" />
    interface can be used with the modal store as in the example in <ResourceLink
      id={SECTIONS.usage.id}>{SECTIONS.usage.title}</ResourceLink
    >. That is, any modal that dispatches a <code>resolve</code>
    <ResourceLink key="CustomEvent" /> with <code>details</code>
    extending <ResourceLink {resources} key="ModalComponentBaseResolved" />. See
    <ResourceLink id={SECTIONS.modalResolutionAndExtendingEvents.id}>Extending Events</ResourceLink>
    for more info.
  </p>
  <p>
    The following sections show different customizable parts of the base <ResourceLink
      {resources}
      key="Modal"
    />.
  </p>

  <section>
    <h3 id={SECTIONS.uiStylingInteraction.id}>
      {SECTIONS.uiStylingInteraction.title}
    </h3>
    <p>
      The base <ResourceLink {resources} key="Modal" /> exposes some slots and props that work together
      to provide customization.
    </p>
    <div class="c-callout-info">
      <p>It is recommended to read through these api documentation pages:</p>
      <ul class="">
        <li>
          <ResourceLink {resources} key="ModalComponentBaseSlots" />
        </li>
        <li>
          <ResourceLink {resources} key="ModalComponentBaseProps" />
        </li>
      </ul>
    </div>

    <section>
      <h4 id={SECTIONS.overridingSlots.id}>
        {SECTIONS.overridingSlots.title}
      </h4>
      <p>
        Shown below is an (simplified) diagram of the slots of the base
        <ResourceLink {resources} key="Modal" />.
      </p>
      <fieldset
        class="not-prose grid place-items-center border-2 border-gray-500 bg-gray-200 p-10 text-neutral-500"
      >
        <legend>backdrop</legend>
        <fieldset class="relative w-5/6 border-2 border-green-500 bg-green-200 p-8">
          <legend>container</legend>
          <fieldset class="absolute -right-0.5 -top-7 border-2 border-orange-500 bg-orange-200 p-1">
            <legend>x</legend>
            <fieldset class="border-2 border-yellow-500 bg-yellow-200 p-1 py-2 text-xs">
              <legend>x-content</legend>
            </fieldset>
          </fieldset>
          <fieldset class="mt-4 h-40 border-2 border-blue-500 bg-blue-200 p-4">
            <legend>default</legend>
          </fieldset>
        </fieldset>
      </fieldset>

      <p>
        The following example demonstrates an <code>InformationModal</code> without any call-to-action.
        Notice:
      </p>
      <ul>
        <li>The default slot is provided as the content of the modal</li>
        <li>
          A custom class is added to the modal <code>container</code> through the
          <code>classes</code>
          prop for additional styling. Because
          <ResourceLink key="svelte style" />
          is component-scoped, notice the usage of <code>:global</code>. See the
          <code>classes</code>
          section of <ResourceLink {resources} key="ModalComponentBaseProps" />
          for more details.
        </li>
        <li>
          There is no event extended or added compared to the example in
          <ResourceLink id={SECTIONS.buildingModalComponent.id}>Usage - Step 3</ResourceLink>, hence
          a couple of differences:
          <ol>
            <li>
              no <code>type $$Events = ExtendedModalEvents</code> needed,
            </li>
            <li>
              no <code>{'{dispatch}'}</code> prop passed to <ResourceLink
                {resources}
                key="Modal"
              />,
            </li>
            <li>
              instead, the <code>resolve</code> event is forwarded directly with
              <code>on:resolve</code>.
            </li>
          </ol>
        </li>
      </ul>

      <fieldset class="space-y-4 border-2 border-violet-500 p-4">
        <legend>Example</legend>
        <div class="grid place-items-center">
          <button class="c-btn-primary" on:click={openInformationModal}
            >Open InformationModal</button
          >
        </div>
      </fieldset>
      <Code code={codes.modals.information} title="example: InformationModal.svelte" />
    </section>

    <section>
      <h4 id={SECTIONS.interactions.id}>
        {SECTIONS.interactions.title}
      </h4>
      <p>
        <ResourceLink {resources} key="Modal" /> provides a few props for customizing interactions with
        modals.
      </p>
      <div class="c-gtable-4 prose-p:m-0">
        <p>Interaction</p>
        <p>Description</p>
        <p>Powered by</p>
        <p>Default</p>

        <p><code>backdrop</code></p>
        <p>whether to show or hide backdrop, and if clicking on it triggers <code>resolve</code></p>
        <p />
        <p><code>true</code></p>

        <p><code>escape</code></p>
        <p>whether escape key press triggers <code>resolve</code></p>
        <p>
          <ResourceLink key="@svelte-put/shortcut" />
        </p>
        <p><code>true</code></p>

        <p><code>clickoutside</code></p>
        <div>
          <p>whether clicking outside modal triggers <code>resolve</code></p>
          <p>most helpful when <code>backdrop</code> is hidden</p>
        </div>
        <p>
          <ResourceLink key="@svelte-put/clickoutside" />
        </p>
        <p><code>false</code></p>

        <p><code>movable</code></p>
        <p>whether modal can be dragged and moved around the screen</p>
        <p>
          <ResourceLink key="@svelte-put/movable" />
        </p>
        <p><code>false</code></p>
      </div>
      <p>
        Refer to the <ResourceLink {resources} key="ModalComponentBaseProps" /> api page for details
        & examples.
      </p>
    </section>
  </section>

  <section>
    <h3 id={SECTIONS.extendingProps.id}>
      {SECTIONS.extendingProps.title}
    </h3>
    <p>
      The example in <ResourceLink id={SECTIONS.buildingModalComponent.id}
        >Usage - Step 3</ResourceLink
      >
      is a good starter for extending props when using the <ResourceLink {resources} key="Modal" /> base
      component. For details, see <ResourceLink {resources} key="ExtendedModalProps" />.
    </p>
  </section>

  <section>
    <h3 id={SECTIONS.modalResolutionAndExtendingEvents.id}>
      {SECTIONS.modalResolutionAndExtendingEvents.title}
    </h3>
    <p class="c-callout-info">
      For a modal to close gracefully, it dispatches a <code>resolve</code>
      <ResourceLink key="CustomEvent" /> whose details containing a <code>trigger</code>
      property set to <ResourceLink {resources} key="ResolveTrigger" />, indicating where
      <code>resolve</code> event originated from.
    </p>
    <p>
      This <code>resolve</code> event is captured by <ResourceLink {resources} key="ModalPortal" />
      and forwarded to the <code>pop</code> method of the modal store.
    </p>
    <p>
      The example in <ResourceLink id={SECTIONS.buildingModalComponent.id}
        >Usage - Step 3</ResourceLink
      >
      is a good starter for extending events when using the <ResourceLink {resources} key="Modal" />
      base component. For more details, see <ResourceLink {resources} key="ExtendedModalEvents" />.
    </p>
  </section>

  <section>
    <h3 id={SECTIONS.buildingYourOwnModal.id}>
      {SECTIONS.buildingYourOwnModal.title}
    </h3>
    <p>
      As discussed in the beginning of
      <ResourceLink id={SECTIONS.buildingCompatibleModal.id}
        >{SECTIONS.buildingCompatibleModal.title}</ResourceLink
      >
      and <ResourceLink id={SECTIONS.modalResolutionAndExtendingEvents.id}
        >{SECTIONS.modalResolutionAndExtendingEvents.title}</ResourceLink
      >:
    </p>
    <p class="c-callout-info">
      the <code>resolve</code> event is the only true requirement for any svelte component to work
      with the modal store <code>push/pop </code> mechanism.
    </p>
    <p>
      By understanding this, you are not limited to use the <ResourceLink {resources} key="Modal" />
      base component for building your own modals. The example below shows exactly that.
    </p>
    <p>Imagine a target <code>FullCustomModal</code> with the following push interface:</p>
    <Code code={codes.modals.fullCustom.interface} lang={typescript} />

    <fieldset class="space-y-4 border-2 border-violet-500 p-4">
      <legend>Example</legend>
      <div class="grid place-items-center">
        <button class="c-btn-primary" on:click={openFullCustomModal}>Open FullCustomModal</button>
      </div>
    </fieldset>
    <Code code={codes.modals.fullCustom.source} title="FullCustomModal.svelte" />
  </section>
</section>

<section>
  <h2 id={SECTIONS.sideEffectsOnPop.id}>{SECTIONS.sideEffectsOnPop.title}</h2>
  <p>Callback can be registered to run when a modal is popped from the store.</p>
  <Code code={codes.sideEffects.onPop} lang={typescript} title="ModalStore.onPop" />
</section>

<section>
  <h2>Accessibility</h2>
  <p>
    This package does not use <ResourceLink
      href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog">dialog</ResourceLink
    >
    because it cannot assume what browsers to support. However, as seen in <ResourceLink
      id={SECTIONS.buildingYourOwnModal.id}>{SECTIONS.buildingYourOwnModal.title}</ResourceLink
    >, you can build a modal component that uses <code>dialog</code> inherently.
  </p>
  <p>
    Using the base <ResourceLink {resources} key="Modal" /> component, the
    <ResourceLink {resources} key="ModalComponentBasePropsAccessibility"
      >accessibility prop</ResourceLink
    > can be provided to set <code>role</code> and <code>aria</code> attributes, similar to what is
    described
    <ResourceLink
      href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role"
      >here in MDN "dialog role"</ResourceLink
    >.
  </p>
</section>

<img
  src={endImg}
  alt="mouse click faster"
  width="300"
  height="163"
  loading="lazy"
  decoding="async"
/>

<p>Happy modal-ing! 👨‍💻</p>
