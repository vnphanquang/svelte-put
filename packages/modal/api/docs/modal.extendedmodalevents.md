<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@svelte-put/modal](./modal.md) &gt; [ExtendedModalEvents](./modal.extendedmodalevents.md)

## ExtendedModalEvents type

Utility type for building custom events type from the base Modal component. Use in conjunction with [createModalEventDispatcher()](./modal.createmodaleventdispatcher.md)

**Signature:**

```typescript
export type ExtendedModalEvents<
	ExtendedResolved extends Record<string, any> = {},
	ExtendedEvents extends Record<string, CustomEvent<any>> = {},
> = {
	resolve: CustomEvent<ModalComponentBaseResolved & Partial<ExtendedResolved>>;
} & ExtendedEvents;
```

**References:** [ModalComponentBaseResolved](./modal.modalcomponentbaseresolved.md)

## Remarks

When extending events, we need to create a new `dispatch` function. Remember to pass this new `dispatch` as prop to the `Modal` component.

When dispatching your extended `resolve` event, you will also need to pass the `trigger` prop to the event detail. Any [ResolveTrigger](./modal.resolvetrigger.md) is valid, but in this context `custom` is recommended (see example below).

For simple no-action modal, just forward the resolve event.

```html
<script lang="ts">
  import Modal from '@svelte-put/modal/Modal.svelte';
  import type { ExtendedModalProps } from '@svelte-put/modal';

  $$Props = ExtendedModalProps;
</script

<Modal {...$$props} on:resolve />
```

## Example 1

Custom the base `resolve` event.

```html
<script lang="ts">
	import Modal from '@svelte-put/modal/Modal.svelte';
	import { createModalEventDispatcher } from '@svelte-put/modal;
	import type { ExtendedModalEvents, ExtendedModalProps } from '@svelte-put/modal';

	$$Props = ExtendedModalProps;
	$$Events = ExtendedModalEvents<{
	   confirmed: boolean;
	}>

	// create type-safe dispatch function
	const dispatch = createModalEventDispatcher<$$Events>();

	function resolve() {
	  dispatch('resolve', {
	    trigger: 'custom',
	    confirmed: true,
	  });
	}
</script>

<Modal {...$$props} {dispatch}>
	<button type="button" on:click="{()" ="">resolve(true)}>Confirm</button>
	<button type="button" on:click="{()" ="">resolve(false)}>Cancel</button>
</Modal>
```

## Example 2

Add other events.

```html
<script lang="ts">
	import Modal from '@svelte-put/modal/Modal.svelte';
	import { createModalEventDispatcher } from '@svelte-put/modal;
	import type { ExtendedModalEvents, ExtendedModalProps } from '@svelte-put/modal';

	$$Props = ExtendedModalProps;
	$$Events = ExtendedModalEvents<{}, {
	  anotherEvent: string;
	}>

	// create type-safe dispatch function
	const dispatch = createModalEventDispatcher<$$Events>();

	function handleClick() {
	  dispatch('anotherEvent', 'detail');
	}
</script>

<Modal {...$$props} {dispatch}>
	<button type="button" on:click="{handleClick}">Another Event</button>
</Modal>
```
