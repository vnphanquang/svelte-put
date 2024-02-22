/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEventDispatcher, type ComponentProps, type ComponentType } from 'svelte';
import { writable } from 'svelte/store';

import type {
	ModalPushInput,
	ModalComponentBase,
	ModalPushOutput,
	ModalComponentBaseResolved,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	ExtendedModalEvents,
	ModalResolveCallback,
	ModalComponentBaseEvents,
	ModalResolved,
	ModalStoreOnPop,
	ModalStorePop,
	ModalStorePush,
	ModalStore,
} from './modal.types';

/**
 * Create a svelte store for handling modal
 * @public
 *
 * @example
 *
 * ```typescript
 * import { createModalStore } from '@svelte-put/modal';
 * const store = createModalStore();
 * ```
 *
 * @returns extended svelte {@link ModalStore}
 */
export function createModalStore(): ModalStore {
	const { subscribe, set } = writable<
		ModalPushOutput<ModalComponentBase, ModalComponentBaseResolved>[]
	>([]);
	let modals: ModalPushOutput<ModalComponentBase, ModalComponentBaseResolved>[] = [];
	const resolveMap: Record<string, undefined | ModalResolveCallback> = {};
	const resolveCallbacks: Record<string, undefined | ModalResolveCallback[]> = {};

	const push: ModalStorePush = function <Component extends ModalComponentBase>(
		input: ModalPushInput<Component>,
	): ModalPushOutput<Component> {
		let _resolve: ModalResolveCallback<Component> | undefined;
		let resolved = false;
		const promise = new Promise<ModalResolved<Component>>((resolve) => {
			_resolve = (value) => {
				resolved = true;
				resolve(value);
			};
		});

		let id: string =
			(crypto && crypto.randomUUID && crypto.randomUUID()) ?? `modal-indexed-${modals.length}`;
		let props: ComponentProps<Component>;
		let component: ComponentType<Component>;
		if (typeof input === 'function') {
			component = input;
			props = {} as ComponentProps<Component>;
		} else {
			id = input.id ?? id;
			props = input.props ?? ({} as ComponentProps<Component>);
			component = input.component;
		}

		const pushed: ModalPushOutput<Component> = {
			id,
			props,
			component,
			resolve: () => promise,
			resolved,
		};

		modals.push(pushed);
		resolveMap[pushed.id] = _resolve as unknown as ModalResolveCallback;

		set([...modals]);

		return pushed;
	};

	const pop: ModalStorePop = function <
		Pushed extends ModalPushOutput<Component, Resolved>,
		Component extends ModalComponentBase,
		Resolved extends ModalResolved<Component>,
	>(pushed?: Pushed, resolved?: Resolved) {
		let popped: Pushed | undefined;
		if (pushed?.id) {
			modals = modals.filter((modal) => {
				if (modal.id === pushed.id) {
					popped = modal as Pushed;
					return false;
				}
				return true;
			});
			set(modals);
		} else {
			popped = modals.pop() as Pushed;
			set([...modals]);
		}
		if (popped) {
			const rResolved = {
				trigger: 'pop',
				...(resolved ?? {}),
			} as Resolved;
			resolveMap[popped.id]?.(rResolved);
			resolveMap[popped.id] = undefined;
			resolveCallbacks[popped.id]?.forEach((callback) => callback(rResolved));
			resolveCallbacks[popped.id] = undefined;
		}
		return popped;
	};

	const onPop: ModalStoreOnPop = function (modalId, callback) {
		if (!resolveCallbacks[modalId]) {
			resolveCallbacks[modalId] = [callback];
		} else if (!resolveCallbacks[modalId]?.includes(callback)) {
			resolveCallbacks[modalId]?.push(callback);
		}
		return () => {
			if (resolveCallbacks[modalId]) {
				resolveCallbacks[modalId] = resolveCallbacks[modalId]?.filter((cb) => cb !== callback);
			}
		};
	};

	return {
		subscribe,
		push,
		pop,
		onPop,
	};
}

/**
 * @public
 *
 * Helper that wraps svelte `createEventDispatcher` for creating typesafe
 * event dispatcher from the `$$Events` type. See {@link ExtendedModalEvents}
 *
 * @returns svelte event dispatcher
 */
export function createModalEventDispatcher<
	Events extends ModalComponentBaseEvents<ModalComponentBaseResolved<ExtendedResolved>> &
		Record<string, CustomEvent<any>>,
	ExtendedResolved extends Record<string, any> = Omit<Events['resolve']['detail'], 'trigger'>,
>() {
	return createEventDispatcher<{
		[key in keyof Events]: Events[key]['detail'];
	}>();
}
