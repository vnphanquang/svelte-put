/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import type { ClickOutsideParameters } from '@svelte-put/clickoutside';
import type { MovableParameters } from '@svelte-put/movable';
import type {
	ComponentEvents,
	ComponentProps,
	ComponentType,
	createEventDispatcher,
	SvelteComponentTyped,
} from 'svelte';
import type { Writable } from 'svelte/store';

import type Modal from './Modal.svelte';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { createModalEventDispatcher } from './modal';

/**
 * The trigger that resolves the modal
 *
 * - `backdrop`: non-static backdrop was clicked
 *
 * - `x`: `x` button was clicked
 *
 * - `escape`: `escape` key was pressed
 *
 * - `clickoutside`: click outside of modal was detected
 *
 * - `pop`: modal was resolved from by calling the `pop` method **manually** from the modal store
 *
 * - `custom`: modal was resolved by a custom dispatch. Use this in your
 * custom modal when extending the `resolve` event with additional props.
 * See {@link ExtendedModalEvents}
 *
 * @public
 */
export type ResolveTrigger = 'backdrop' | 'x' | 'escape' | 'clickoutside' | 'pop' | 'custom';

/**
 * The base interface when modal is resolved
 * @public
 */
export type ModalComponentBaseResolved<ExtendedResolved extends Record<string, any> = {}> = {
	trigger: ResolveTrigger;
} & ExtendedResolved;

/**
 * The base events for modal
 * @public
 */
export type ModalComponentBaseEvents<
	Resolved extends ModalComponentBaseResolved = ModalComponentBaseResolved,
> = {
	resolve: CustomEvent<Resolved>;
};

/**
 * The resolved type for modal
 * @public
 *
 * @example
 *
 * ```typescript
 * import CustomModal from './CustomModal.svelte';
 * import type { ModalResolved } from '@svelte-put/modal';
 *
 * type CustomModalResolved = ModalResolved<CustomModal>;
 * ```
 */
export type ModalResolved<Component extends ModalComponentBase> =
	ComponentEvents<Component>['resolve']['detail'];

/**
 * The base slots for modal
 * @public
 */
export interface ModalComponentBaseSlots {
	/** content of the modal */
	default: Record<string, never>;
	/** backdrop of the modal */
	backdrop: {
		/** the resolved class name, merged from the default and the `classes` prop */
		class: string;
		/** default click handler for backdrop (dismiss with (trigger) as `backdrop`) */
		onClick: () => void;
	};
	/** modal container */
	container: {
		/** the resolved class name, merged from the default and the `classes` prop */
		class: string;
	};
	/** `x` button */
	x: {
		/** the resolved class name, merged from the default and the `classes` prop */
		class: string;
		/** default click handler for x button (dismiss with (trigger) as `x`) */
		onClick: () => void;
		/** the forwarded `xBtn` prop, see {@link ModalComponentBaseProps} */
		xBtn: boolean;
	};
	/** content of `x` button */
	'x-content': Record<string, never>;
}

/**
 * The base events for modal
 * @public
 */
export interface ModalComponentBaseProps {
	/**
	 * whether the modal is at topmost position (last pushed),
	 * this prop is handled by the `ModalPortal` component and
	 * you don't have to touch this
	 */
	topmost?: boolean;
	/**
	 * how the backdrop should render or behave. Defaults to `true`
	 *
	 * - `false` - no backdrop
	 *
	 * - `true` - backdrop that when clicked on will dismiss modal
	 *
	 * - `static` - backdrop that does not dismiss modal
	 */
	backdrop?: 'static' | boolean;
	/**
	 * whether to render the `x` button (for dismissing modal). Defaults to `true`
	 *
	 * if you are overriding the `x` slot, this prop is forwarded to the slot template.
	 * See {@link ModalComponentBaseSlots}
	 */
	xBtn?: boolean;
	/**
	 * whether to dismiss modal when `esc` key is pressed. Defaults to `true`
	 */
	escape?: boolean;
	/**
	 * whether to dismiss modal when clicking outside. Most useful when
	 * you want to not have a backdrop but still dismiss modal when clicking
	 * outside the modal. Defaults to `false`.
	 *
	 * Can be provided as boolean or the parameter object
	 */
	clickoutside?: boolean | ClickOutsideParameters;
	/**
	 * whether to make the modal "movable" (drag around).
	 * Can be provided as boolean or the parameter object.
	 * Defaults to `false`.
	 */
	movable?: boolean | MovableParameters;
	/**
	 * custom class names for the modal elements.
	 *
	 * - If property is provided as `string`, it'll be added to the default class name of that element.
	 *
	 * - If property is provided as `{ override: string }`, it'll override the default class name of that element.
	 *
	 * @remarks
	 *
	 * As Svelte style is component-scoped. You will need to use either a global
	 * styling system like Tailwind or the `:global()` selector (example below).
	 *
	 * When overriding slots, the classes provided here will be merged with the default
	 * class names and passed to the slot template. See {@link ModalComponentBaseSlots}
	 *
	 * @example
	 *
	 * ```html
	 * <script lang="ts">
	 *   import Modal from '@svelte-put/modal/Modal.svelte';
	 *   import type { ExtendedModalProps } from '@svelte-put/modal';
	 *
	 *   type $$Props = ExtendedModalProps;
	 * </script>
	 *
	 * <Modal
	 *   classes={{
	 *     backdrop: 'bg-gray-500 bg-opacity-50',
	 *     container: { override: 'custom-modal-container' },
	 *     x: 'a-global-class',
	 *   }}
	 *   {...$$props}
	 *   on:resolve
	 * >
	 *  <svelte:fragment slot="x" let:class={className} let:xBtn let:onClick>
	 *     {#if xBtn}
	 *       <button type="button" class={className} on:click={onClick}>
	 *         some custom svg here perhaps
	 *       </button>
	 *     {/if}
	 *   </svelte:fragment>
	 * </Modal>
	 *
	 * <style>
	 *   :global(.custom-modal-container) {
	 *     background-color: #fff;
	 *     with: 80%;
	 *   }
	 * </style>
	 * ```
	 *
	 */
	classes?: Partial<
		Record<
			Exclude<keyof ModalComponentBaseSlots, 'default' | 'x-content'>,
			string | { override: string }
		>
	>;
	/**
	 * Some accessibility attributes passed to the modal container element as discussed
	 * in {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role | MDN Accessibility - Dialog}
	 *
	 * @remarks
	 *
	 * Since the base `Modal` does not know beforehand its content (passed by slots),
	 * responsibility for accessibility is delegated to you.
	 *
	 * By default, the `role` attribute is set to `dialog` without any aria attribute
	 *
	 * @example
	 *
	 * ```html
	 * <script lang="ts">
	 *   import Modal from '@svelte-put/modal/Modal.svelte';
	 *   import type { ExtendedModalProps } from '@svelte-put/modal';
	 *
	 *   $$Props = ExtendedModalProps;
	 *   $$Events = ExtendedModalEvents<{
	 *      confirmed: boolean;
	 *   }>
	 *
	 *   // create type-safe dispatch function
	 *   const dispatch = createModalEventDispatcher<$$Events>();
	 *   function resolve() {
	 *     dispatch('resolve', {
	 *       trigger: 'custom',
	 *       confirmed: true,
	 *     });
	 *   }
	 * </script
	 *
	 * <Modal
	 *    {...$$props}
	 *    accessibility={{
	 *      role: 'dialog',
	 *      labelledBy: 'confirmation-dialog-title',
	 *      describedBy: 'confirmation-dialog-description',
	 *    }}
	 *    on:resolve
	 * >
	 *    <h2 id="confirmation-dialog-title">Submission Confirmation</h2>
	 *    <p id="confirmation-dialog-description">Are you sure you want to submit?</p>
	 *    <button type="button" on:click={() => resolve(true)}>Yes</button>
	 *    <button type="button" on:click={() => resolve(false)}>No</button>
	 * </Modal>
	 * ```
	 */
	accessibility?: {
		role: 'dialog' | 'alertdialog';
		/** id of the element for `aria-labelledby` */
		labelledBy?: string;
		/** id of the element for `aria-describedby` */
		describedBy?: string;
	};
	/**
	 * svelte event dispatcher. Should only pass this prop if extending the events.
	 * See {@link ExtendedModalEvents} for more details an dexamples
	 */
	dispatch?: ReturnType<typeof createEventDispatcher>;
}

/**
 * The base component for building modal. Modals extending this component needs to
 * meet these specified constraints
 * @public
 */
export type ModalComponentBase = SvelteComponentTyped<
	{},
	ModalComponentBaseEvents<ModalComponentBaseResolved>,
	{}
>;

/**
 * Either the Svelte modal component or an option object that specifies how
 * to push the modal onto the stack
 * @public
 */
export type ModalPushInput<Component extends ModalComponentBase> =
	| ComponentType<Component>
	| {
			/**
			 * id to track this modal
			 *
			 * @defaultValue `(crypto && crypto.randomUUID && crypto.randomUUID()) ?? `modal-indexed-$\{modals.length\}`;`
			 */
			id?: string;
			/**
			 * the component to push
			 */
			component: ComponentType<Component>;
			/**
			 * props passed to pushed component
			 */
			props?: ComponentProps<Component>;
	  };

/**
 * The return of the `push` method of modal store
 * @public
 */
export interface ModalPushOutput<
	Component extends ModalComponentBase,
	Resolved extends ModalComponentBaseResolved = ModalResolved<Component>,
> {
	/**
	 * id of the pushed modal, pass to `pop` to dismiss modal
	 *
	 * @example
	 *
	 * ```typescript
	 * import { createModalStore } from '@svelte-put/modal';
	 * const store = createModalStore();
	 * const pushed = store.push({ component: SomeComponent, props: { someProp: 'value' } });
	 * store.pop(pushed);
	 * ```
	 */
	id: string;
	/** component to render in modal layout */
	component: ComponentType<Component>;
	/** props passed to modal component */
	props: ComponentProps<Component>;
	/**
	 * wait for the modal to resolve, and return the promise wrapping the resolved value
	 *
	 * @example
	 *
	 * ```typescript
	 * import { createModalStore } from '@svelte-put/modal';
	 * const store = createModalStore();
	 * const pushed = store.push({ component: ConfirmationModal });
	 * // assuming ConfirmationModal resolves with { confirmed: boolean }
	 * const { confirmed } = await pushed.resolve();
	 * ```
	 */
	resolve: () => Promise<Resolved>;
	/**
	 * whether the modal has been resolved
	 */
	resolved: boolean;
}

/**
 * Utility type for building custom props type from the base Modal component
 * @public
 *
 * @example
 *
 * ```html
 * <script lang="ts">
 *   import Modal from '@svelte-put/modal/Modal.svelte';
 *   import type { ExtendedModalProps } from '@svelte-put/modal';
 *
 *   $$Props = ExtendedModalProps<{ anotherProp: string }>;
 *
 *   export let anotherProp: string;
 * </script>
 *
 * <Modal {...$$restProps} on:resolve>
 *   <p>{anotherProp}</p>
 * </Modal>
 * ```
 */
export type ExtendedModalProps<ExtendedProps extends Record<string, any> = {}> =
	ComponentProps<Modal> & ExtendedProps;

/**
 * Utility type for building custom events type from the base Modal component.
 * Use in conjunction with {@link createModalEventDispatcher}
 * @public
 *
 * @remarks
 *
 * When extending events, we need to create a new `dispatch` function.
 * Remember to pass this new `dispatch` as prop to the `Modal` component.
 *
 * When dispatching your extended `resolve` event, you will also need to pass
 * the `trigger` prop to the event detail. Any {@link ResolveTrigger} is valid,
 * but in this context `custom` is recommended (see example below).
 *
 * For simple no-action modal, just forward the resolve event.
 *
 * ```html
 * <script lang="ts">
 *   import Modal from '@svelte-put/modal/Modal.svelte';
 *   import type { ExtendedModalProps } from '@svelte-put/modal';
 *
 *   $$Props = ExtendedModalProps;
 * </script
 *
 * <Modal {...$$props} on:resolve />
 * ```
 *
 * @example
 *
 * Custom the base `resolve` event.
 *
 * ```html
 * <script lang="ts">
 *   import Modal from '@svelte-put/modal/Modal.svelte';
 *   import { createModalEventDispatcher } from '@svelte-put/modal;
 *   import type { ExtendedModalEvents, ExtendedModalProps } from '@svelte-put/modal';
 *
 *   $$Props = ExtendedModalProps;
 *   $$Events = ExtendedModalEvents<{
 *      confirmed: boolean;
 *   }>
 *
 *   // create type-safe dispatch function
 *   const dispatch = createModalEventDispatcher<$$Events>();
 *
 *   function resolve() {
 *     dispatch('resolve', {
 *       trigger: 'custom',
 *       confirmed: true,
 *     });
 *   }
 * </script>
 *
 * <Modal {...$$props} {dispatch}>
 *   <button type="button" on:click={() => resolve(true)}>Confirm</button>
 *   <button type="button" on:click={() => resolve(false)}>Cancel</button>
 * </Modal>
 * ```
 *
 * @example
 *
 * Add other events.
 *
 * ```html
 * <script lang="ts">
 *   import Modal from '@svelte-put/modal/Modal.svelte';
 *   import { createModalEventDispatcher } from '@svelte-put/modal;
 *   import type { ExtendedModalEvents, ExtendedModalProps } from '@svelte-put/modal';
 *
 *   $$Props = ExtendedModalProps;
 *   $$Events = ExtendedModalEvents<{}, {
 *     anotherEvent: string;
 *   }>
 *
 *   // create type-safe dispatch function
 *   const dispatch = createModalEventDispatcher<$$Events>();
 *
 *   function handleClick() {
 *     dispatch('anotherEvent', 'detail');
 *   }
 * </script>
 *
 * <Modal {...$$props} {dispatch}>
 *   <button type="button" on:click={handleClick}>Another Event</button>
 * </Modal>
 * ```
 */
export type ExtendedModalEvents<
	ExtendedResolved extends Record<string, any> = {},
	ExtendedEvents extends Record<string, CustomEvent<any>> = {},
> = {
	resolve: CustomEvent<ModalComponentBaseResolved & Partial<ExtendedResolved>>;
} & ExtendedEvents;

/**
 * callback as one passed to ModalStore `onPop`
 * @public
 */
export type ModalResolveCallback<Component extends ModalComponentBase = ModalComponentBase> = (
	resolved: ModalResolved<Component>,
) => void;

/**
 * @public
 * Push a new modal to the stack
 *
 * @param input - {@link ModalPushInput}
 * @returns the {@link ModalPushOutput}
 */
export type ModalStorePush = <Component extends ModalComponentBase>(
	input: ModalPushInput<Component>,
) => ModalPushOutput<Component>;

/**
 * @public
 * Pop the modal with given id.
 * If `id` is not provided, pop the topmost modal
 *
 * @remarks
 *
 * When calling this manually (rather than being called from the `ModalPortal` component),
 * the trigger is expected to be `pop`;
 *
 * @param pushed - the returned {@link ModalPushOutput} output from `push`
 * @param resolved - custom resolved value, if any
 * @returns the popped {@link ModalPushOutput} or `undefined` in the
 * case no modal was found that matches the specified input
 */
export type ModalStorePop = <
	Pushed extends ModalPushOutput<Component, Resolved>,
	Component extends ModalComponentBase,
	Resolved extends ModalResolved<Component>,
>(
	pushed?: Pushed,
	resolved?: Resolved,
) => Pushed | undefined;

/**
 * @public
 * callback for when a modal is popped. Can be called multiple times
 * to registered multiple callbacks
 *
 * @remarks
 *
 * This should be called before the modal is pushed.
 *
 * If the same callback is registered multiple times, it will only be called once
 * (be aware that inline arrow function will be a different function each time)
 *
 * After the modal is popped, the callback list will be cleared. Meaning
 * next time the same modal is pushed, callback must be registered again.
 *
 * See example for typescript support.
 *
 * @example
 *
 * ```typescript
 *  import CustomModal from './CustomModal.svelte';
 *  import { createModalStore } from '@svelte-put/modal';
 *  import type { ModalResolveCallback, ModalResolved } from '@svelte-put/modal';
 *
 *  const store = createModalStore();
 *  const pushed = store.push(CustomModal);
 *
 *  let unsubscribe = store.onPop<CustomModal>(pushed.id, (resolved) => {});
 *  unsubscribe(); // to unregister the callback
 *
 *  // or
 *
 *  function onPop(resolved: ModalResolved<CustomModal>) {};
 *  unsubscribe = store.onPop<CustomModal>(pushed.id, onPop);
 *  unsubscribe(); // to unregister the callback
 *
 *  // or
 *
 *  const sideEffect: ModalResolveCallback<CustomModal> = (resolved) => {};
 *  unsubscribe = store.onPop(pushed.id, sideEffect);
 *  unsubscribe(); // to unregister the callback
 * ```
 *
 * @param modalId - the id returned from push operation
 * @param callback - {@link ModalResolveCallback}
 * @returns the unsubscribe function, when call will remove the callback
 */
export type ModalStoreOnPop = <Component extends ModalComponentBase = ModalComponentBase>(
	modalId: string,
	callback: ModalResolveCallback<Component>,
) => () => void;

/**
 * @public
 */
export type ModalStoreValue = ModalPushOutput<ModalComponentBase, ModalComponentBaseResolved>[];

/**
 * @public
 */
export type ModalStoreSubscribe = Writable<ModalStoreValue>['subscribe'];

/**
 * @public
 */
export interface ModalStore {
	subscribe: ModalStoreSubscribe;
	/** see {@link ModalStorePush} */
	push: ModalStorePush;
	/** see {@link ModalStorePop} */
	pop: ModalStorePop;
	/** see {@link ModalStoreOnPop} */
	onPop: ModalStoreOnPop;
}
