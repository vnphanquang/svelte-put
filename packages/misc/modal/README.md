<div align="center">

# `@svelte-put/modal`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![repl.badge]][repl]

Solution to async, declarative, type-safe modals in Svelte.

</div>

This solution employs [svelte store][svelte.store] for handling stack-able modals in an async manner. That is, you can open a modal programmatically and await for it to be "resolved".
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
  - [Building Compatible Modal Components](#building-compatible-modal-components)
    - [UI, Styling, Interaction](#ui-styling-interaction)
      - [Overriding Slots](#overriding-slots)
      - [Interactions](#interactions)
    - [Extending Props](#extending-props)
    - [Modal Resolution & Extending Events](#modal-resolution--extending-events)
    - [Building Your Own Modal](#building-your-own-modal)

</details>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

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

This document assumes you are using [svelte-kit], so components are imported directly from source svelte files. If you are using this in a different context, perhaps the import method as seen in [REPL] might help.

You will notice that [typescript] is used throughout this document. [typescript] is recommended as it provides type safety and an overall better development experience, especially when awaiting for modal resolution and inferring the types of its carrying payload.

Throughout the document, you will see usage of the `$$Props` and `$$Events` special types (check out [this github thread](https://github.com/sveltejs/language-tools/issues/442)). If you are not familiar with these, check out [this article](https://www.viget.com/articles/typing-components-in-svelte/) by Andrew Lester before continuing.

### 1. Global Modal Store Setup

Expose a global modal store singleton where it makes sense for you. This store is
used in the next steps when you want to open a modal.

<details open>
  <summary>Example: show / hide</summary>

```typescript
// example: src/lib/services/modal.ts
import { createModalStore } from '@svelte-put/modal';
export const appModal = createModalStore();
```

</details>

### 2. [ModalPortal](github.ModalPortal) Registration

Register the [ModalPortal][github.ModalPortal] where you want to render the modal stack, ideally as the direct descendant of the root element of your site.

Here the `store` created in [step (1)](#1-global-modal-store-setup) is passed as prop.

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

> Notice that [createModalEventDispatcher][github.createModalEventDispatcher] used here is just a type-safe version of svelte's built-in [createEventDispatcher][svelte.createEventDispatcher]

<details open>
  <summary>Example: show / hide</summary>

```html
<!-- example: src/lib/modals/ConfirmationModal.svelte -->
<script lang="ts">
  import Modal from '@svelte-put/modal/Modal.svelte';
  import { createModalEventDispatcher } from '@svelte-put/modal';
  import type { ExtendedModalProps, ExtendedModalEvents } from '@svelte-put/modal';

  // extending the base props
  type $$Props = ExtendedModalProps<{ disabled?: boolean }>;
  // extending the `resolve` event
  type $$Events = ExtendedModalEvents<{ confirmed: boolean }>;

  // use NonNullable type utility here to exclude the `undefined` case
  export let disabled: NonNullable<$$Props['disabled']> = false;

  // create a custom event dispatcher with built-in helper
  const dispatch = createModalEventDispatcher<$$Events>();

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
<Modal classes={{ container: 'confirmation-modal' }} {...$$restProps} {dispatch}>
  <div class="modal-content">
    <h2>Confirmation Modal</h2>
    <p>Are you sure you want to proceed?</p>
    <div>
      <button type="button" on:click={confirm} {disabled}>Confirm</button>
      <button type="button" on:click={cancel} {disabled}>Cancel</button>
    </div>
  </div>
</Modal>
```

</details>

### 4. Pushing and Popping

The custom modal in the [step (3)](#3-extending-the-base-modal-component) can be open idiomatically with the modal
store created in [step (1)](#1-global-modal-store-setup). See [Modal Resolution](#modal-resolution--extending-events)
for more details about the push&pop mechanism.

<details open>
  <summary>Example: show / hide</summary>

```typescript
import type { ModalPushOutput } from '@svelte-put/modal';
import { appModal } from '$lib/services/modal';
import ConfirmationModal from '$lib/modals/ConfirmationModal.svelte';

let pushed: ModalPushOutput<ConfirmationModal>;

function open() {
  // should get type autocompletion for pushed here
  pushed = appModal.push(ConfirmationModal);
  const { confirmed, trigger } = await pushed.resolve();
  if (confirmed) {
    // do something
  }
}

function close() {
  if (pushed) {
    appModal.pop(pushed);
    // if the modal is successfully popped by this operation,
    // the `await` expression in the `open` method above will resolve
    // the `trigger` will be `pop`
  }
}
```

</details>

## Building Compatible Modal Components

Any component that satisfies the [ModalComponentBase][github.ModalComponentBase] interface
can be used with the modal store from the example in the [Usage](#usage) section. That is, any modal that dispatches a `resolve` [CustomEvent][svelte.createEventDispatcher] with the details extending [ModalComponentBaseResolved][github.ModalComponentBaseResolved] should suffice. See [Extending Events](#extending-events) for more details.

> It is recommended to use `@svelte-put/modal`'s base [Modal][github.Modal] and its helpers for building type-safe custom modals.

The following sub-sections lay out different customizable parts of the base [Modal][github.Modal].

### UI, Styling, Interaction

The base [Modal][github.Modal] expose some slots and props that work together for customization.

> It is encouraged to read through these generated api documentation pages.
>
> - [ModalComponentBaseSlots][github.ModalComponentBaseSlots]
> - [ModalComponentBaseProps][github.ModalComponentBaseProps]
>

#### Overriding Slots

The following image illustrates the slots of the base [Modal][github.Modal].

<details open>
  <summary>Slots illustration: show / hide</summary>

<div align="center">

![base slots](./static/modal-base-slots.svg)

</div>

</details>

Shown bellow is a simple example of an information modal without any call-to-action. Notice:

- The default slot is provided as the content of the modal.
- A custom class is added to the modal `container` through the `classes` props. Because svelte style is component-scoped. Notice the use of `:global` selector. See the `classes` section of [ModalComponentBaseProps][github.ModalComponentBaseProps] for details.
- There is no event extended or added compared to the example in [Usage - Step 3](#3-extending-the-base-modal-component), so a couple of differences:
    1. no `type $$Events = ExtendedModalEvents` needed,
    2. no `{dispatch}` prop passed to [Modal][github.Modal],
    3. instead, the `resolve` event is forwarded with `on:resolve`.

<details open>
  <summary>Example: show / hide</summary>

```html
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
    padding: 80px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
</style>
```

</details>

#### Interactions

[ModalComponentBaseProps][github.ModalComponentBaseProps] provides a few props for customizing interactions with modal.

| Interaction | Description | Powered by |
| --- | --- | --- |
| `backdrop` | whether to show or hide backdrop, and if clicking on it triggers `resolve` |
| `escape` | whether escape key press triggers `resolve` | [@svelte-put/shortcut] |
| `clickoutside` | whether clicking outside modal triggers `resolve`, <br /> most helpful when `backdrop` is hidden | [@svelte-put/clickoutside] |
| `movable` | whether modal can be dragged and moved around the screen | [@svelte-put/movable] |

Refer to the [props documentation][github.ModalComponentBaseProps] for details and examples.

### Extending Props

The example in [Usage - Step 3](#3-extending-the-base-modal-component) is a good starter for extending props when using the [Modal][github.Modal] base component. For more details, see [ExtendedModalProps][github.ExtendedModalProps].

### Modal Resolution & Extending Events

> For a modal to close gracefully, it dispatches a `resolve` [CustomEvent] whose details containing a `trigger` property set to [ResolveTrigger][github.ResolveTrigger], indicating where `resolve` event originated from.

This `resolve` event is captured by [ModalPortal][github.ModalPortal] and forwarded to the `pop` method of the modal store.

The example in [Usage - Step 3](#3-extending-the-base-modal-component) is a good starter for extending events when using the [Modal][github.Modal] base component. For more details, see [ExtendedModalEvents][github.ExtendedModalEvents].

### Building Your Own Modal

As discussed in the beginning of [Building Compatible Modal Components](#building-compatible-modal-components) and [Modal Resolution](#modal-resolution--extending-events):

> the `resolve` event is the only true requirement for any svelte component to work with the modal store push/pop mechanism.

By understanding this, you are not limited to use the [Modal][github.Modal] base component for building your own modals.The example below shows exactly that.

<details open>
  <summary>Example: show / hide</summary>

```html
<!-- FullCustomModal.svelte -->
<!-- notice this component is just a normal svelte component -->
<!-- without anything from @svelte-put -->
<script lang="ts">
  import type { ResolveTrigger } from '@svelte-put/modal';
  import { createEventDispatcher } from 'svelte';

  export let prop = 'Prop should work as usual';

  const dispatch = createEventDispatcher<{
    resolve: {
      trigger: ResolveTrigger;
      payload: string;
    };
  }>();

  function resolve() {
    dispatch('resolve', { trigger: 'custom', payload: 'completely custom modal' });
  }
</script>

<div class="custom-modal">
  <button type="button" on:click={resolve}>
    Resolve
  </button>
  <p>{prop}</p>
</div>

<style>
  .custom-modal {
    position: absolute;
    width: 80%;
    height: 80%;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    background-color: #fff;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
    display: grid;
    place-items: center;
  }
</style>
```

```html
<!-- some +page.svelte -->
<script lang="ts">
  import { createModalStore } from '@svelte-put/modal';
  import ModalPortal from '@svelte-put/modal/ModalPortal.svelte';
  import FullCustomModal from './FullCustomModal.svelte';

  const appModal = createModalStore();

  async function open() {
    const pushed = appModal.push(FullCustomModal);
    // should get type autocomplete for `trigger` and `payload` here
    const { trigger, payload } = await pushed.resolve();
    console.log('Modal);
  }
</script>

<ModalPortal store={appModal} />

<button on:click={open}>
  Open
</button>
```

</details>

One scenario where this is especially helpful is when you are migrating from an old system, there are already a bunch of modals, and rewriting all of them is not an option.

<p align="center">
  <a href="https://www.buymeacoffee.com/vnphanquang" target="_blank">
    <img
      src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
      height="60"
      width="217"
      alt="buy vnphanquang a coffee"
    />
  </a>
</p>

<!-- github specifics -->
[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=
[github.api]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/index.md
[github.ModalPortal]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/src/lib/ModalPortal.svelte
[github.Modal]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/src/lib/Modal.svelte
[github.createModalEventDispatcher]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/modal.createmodaleventdispatcher.md
[github.ModalComponentBase]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/modal.modalcomponentbase.md
[github.ModalComponentBaseResolved]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/modal.modalcomponentbaseresolved.md
[github.ModalComponentBaseSlots]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/modal.modalcomponentbaseslots.md
[github.ModalComponentBaseProps]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/modal.modalcomponentbaseprops.md
[github.ResolveTrigger]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/modal.resolvetrigger.md
[github.ExtendedModalEvents]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/modal.extendedmodalevents.md
[github.ExtendedModalProps]: https://github.com/vnphanquang/svelte-put/blob/main/packages/misc/modal/api/docs/modal.extendedmodalprops.md

[@svelte-put/shortcut]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/shortcut
[@svelte-put/clickoutside]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/clickoutside
[@svelte-put/movable]: https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/movable

<!-- heading badge -->
[npm.badge]: https://img.shields.io/npm/v/@svelte-put/modal
[npm]: https://www.npmjs.com/package/@svelte-put/modal
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/modal?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/modal

<!-- external resources -->
[svelte-kit]: https://kit.svelte.dev/
[svelte.createEventDispatcher]: https://svelte.dev/docs#run-time-svelte-createeventdispatcher
[svelte.store]: https://svelte.dev/docs#run-time-svelte-store
[typescript]: https://www.typescriptlang.org/
[customevent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent

<!-- repl -->
[repl]: https://svelte.dev/repl/d9c896ac62cd41d49f80ffa249d292e6
[repl.badge]: https://img.shields.io/static/v1?label=&message=Svelte+REPL&logo=svelte&logoColor=fff&color=ff3e00
