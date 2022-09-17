<div align="center">

# `@svelte-put/modal`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia]

Solution to async and declarative modals in Svelte.

</div>

## Table of Contents

<details open>
  <summary>Example: show / hide</summary>

- [`@svelte-put/modal`](#svelte-putmodal)
  - [Table of Contents](#table-of-contents)
  - [`svelte-put`](#svelte-put)
  - [Installation](#installation)
  - [Changelog](#changelog)
  - [Usage](#usage)
    - [1. Global Modal Store Setup](#1-global-modal-store-setup)
    - [2. ModalPortal Registration](#2-modalportal-registration)
    - [3. Extending the Base Modal Component](#3-extending-the-base-modal-component)
    - [4. Pushing and Popping](#4-pushing-and-popping)
  - [Modal Push (Open) & Pop (Close)](#modal-push-open--pop-close)
  - [Building Compatible Modal Components](#building-compatible-modal-components)

</details>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

This solution employs [svelte store][svelte.store] for handling stack-able modals in an async manner. That is you can open a modal programmatically and await for it to be "resolved".

## Installation

```bash
npm install -D @svelte-put/modal
```

```bash
yarn add -D @svelte-put/modal
```

```bash
pnpm add -D @svelte-put/modal
```

## [Changelog][github.changelog]

## Usage

This guide assumes you are using [svelte-kit], so components are imported directly from source svelte files. If you are using this in a different context, perhaps the imports as seen in [REPL] might help.

### 1. Global Modal Store Setup

Expose a global modal store singleton where it makes sense for you. This store is
used in the next steps wherever you want to open a modal.

<details open>
  <summary>Example: show / hide</summary>

```typescript
// example: src/lib/services/modal.ts
import { createModalStore } from '@svelte-put/modal';
export const appModal = createModalStore();
```

### 2. [ModalPortal](github.ModalPortal) Registration

Register the [ModalPortal](github.ModalPortal) where you want to render the modal stack, ideally as the direct descendant of the root element of your site.

<details open>
  <summary>Example: show / hide</summary>

```html
<!-- example: src/routes/+layout.svelte -->
<script lang="ts">
  import ModalPortal from '@svelte-put/modal/ModalPortal.svelte';
  import { appModal } from '$lib/services/modal';
</script>

<slot />
<ModalPortal store={appModal} />
```

</details>

### 3. Extending the Base Modal Component

`svelte-put/modal` by design does not provide any predefined modals but only a base [Modal][github.Modal] component for building your own.

The example below shows how a confirmation modal might be implemented. See [Building Compatible Modal Components](#building-compatible-modal-components) for more details about customization possibilities.

<details open>
  <summary>Example: show / hide</summary>

```html
<!-- example: src/lib/modals/ConfirmationModal.svelte -->
<script lang="ts">
  import Modal from '@svelte-put/modal/Modal.svelte';
  import { createModalEventDispatcher } from '@svelte-put/modal';
  import type { ExtendedModalProps, ExtendedModalEvents } from '@svelte-put/modal';

  // re-export the base prop types
  type $$Props = ExtendedModalProps;
  // extending the `resolve` event
  type $$Events = ExtendedModalEvents<{ confirmed: boolean }>;

  // create a custom modal
  const dispatch = createModalEventDispatcher<$$Events>();
  // `createModalEventDispatcher` is just a type-safe version of
  //  svelte's built-in `createEventDispatcher`

  function resolve(confirmed: boolean) {
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
<Modal classes={{ container: 'confirmation-modal' }} {...$$props} {dispatch}>
  <div class="modal-content">
    <h2>Confirmation Modal</h2>
    <p>Are you sure you want to proceed?</p>
    <div>
      <button type="button" on:click={confirm}>Confirm</button>
      <button type="button" on:click={cancel}>Cancel</button>
    </div>
  </div>
</Modal>
```

</details>

### 4. Pushing and Popping

The custom modal in the step (3) can be open idiomatically with the modal
store created in step (1). See [Modal Push and Pop](#modal-push-open--pop-close)
for more details about the push&pop mechanism.

<details open>
  <summary>Example: show / hide</summary>

```typescript
import { appModal } from '$lib/services/modal';
import ConfirmationModal from '$lib/modals/ConfirmationModal.svelte';

function openConfirmationModal() {
  // should get type autocompletion for pushed here
  const pushed = appModal.push(ConfirmationModal);
  const { confirmed } = await pushed.resolve();
  if (confirmed) {
    // do something
  }
}
```

</details>

## Building Compatible Modal Components

Any component that satisfies the [ModalComponentBase][github.ModalComponentBase] interface
can be used with the modal store (one created from [createModalStore][github.createModalStore] as in step (1) of [Usage](#usage)). That is, any modal that dispatches a `resolve` [CustomEvent][svelte.createEventDispatcher] with the details extending [ModalComponentBaseResolved][github.ModalComponentBaseResolved]

```html
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ResolveTrigger } from '@svelte-put/modal';

  const dispatch = createEventDispatcher<{
    resolve: {
      trigger: ResolveTrigger;
      // other payloads
    };
  }>
</script>
```

However, it is recommended to use `@svelte-put/modal`'s base [Modal][github.Modal] and its helpers for building type-safe custom modals.

### UI Customization

### Extending Props

### Extending Events


<details open>
  <summary>Example: show / hide</summary>



</details>

## Modal Push (Open) & Pop (Close)

<details open>
  <summary>Example: show / hide</summary>



</details>


<!-- github specifics -->
[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=
[github.api]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/index.md
[github.ModalPortal]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/src/lib/ModalPortal.svelte
[github.Modal]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/src/lib/Modal.svelte
[github.ModalComponentBase]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/modal.modalcomponentbase.md
[github.createModalStore]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/modal.createmodalstore.md
[github.ModalComponentBaseResolved]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/modal.modalcomponentbaseresolved.md
[repl]:

<!-- heading badge -->
[npm.badge]: https://img.shields.io/npm/v/@svelte-put/modal
[npm]: https://www.npmjs.com/package/@svelte-put/modal
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/modal?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/modal

<!-- external resources -->
[svelte-kit]: https://kit.svelte.dev/
[svelte.createEventDispatcher]: https://svelte.dev/docs#run-time-svelte-createeventdispatcher
[svelte.store]: https://svelte.dev/docs#run-time-svelte-store
