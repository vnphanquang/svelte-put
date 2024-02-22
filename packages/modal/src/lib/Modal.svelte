<script lang="ts">
	import { clickoutside as clickoutsideAction } from '@svelte-put/clickoutside';
	import type { ClickOutsideParameters } from '@svelte-put/clickoutside';
	import { movable as movableAction } from '@svelte-put/movable';
	import type { MovableParameters } from '@svelte-put/movable';
	import { shortcut } from '@svelte-put/shortcut';
	import { fade } from 'svelte/transition';

	import { createModalEventDispatcher } from './modal';
	import type {
		ModalComponentBaseEvents,
		ModalComponentBaseProps,
		ModalComponentBaseSlots,
	} from './modal.types';

	type $$Slots = ModalComponentBaseSlots;
	type $$Props = ModalComponentBaseProps;
	type $$Events = ModalComponentBaseEvents;

	export let topmost: NonNullable<$$Props['topmost']> = false;
	export let backdrop: NonNullable<$$Props['backdrop']> = true;
	export let xBtn: NonNullable<$$Props['xBtn']> = true;
	export let escape: NonNullable<$$Props['escape']> = true;
	export let clickoutside: NonNullable<$$Props['clickoutside']> = false;
	export let movable: NonNullable<$$Props['movable']> = false;
	export let classes: NonNullable<$$Props['classes']> = {};
	export let accessibility: NonNullable<$$Props['accessibility']> = { role: 'dialog' };
	export let dispatch = createModalEventDispatcher();

	// resolving classes prop
	type Classes = Required<NonNullable<ModalComponentBaseProps['classes']>>;
	const DEFAULT_CLASSES: Record<keyof Classes, string> = {
		backdrop: 's-modal-backdrop',
		container: 's-modal-container',
		x: 's-modal-x',
	};
	function resolveClasses(): typeof DEFAULT_CLASSES {
		const rClasses = { ...DEFAULT_CLASSES };
		for (const [key, value] of Object.entries(classes ?? {})) {
			if (typeof value === 'string') {
				rClasses[key as keyof Classes] = `${rClasses[key as keyof Classes]} ${value}`;
			} else {
				rClasses[key as keyof Classes] = value.override;
			}
		}
		return rClasses;
	}
	$: rClasses = resolveClasses();

	// resolving clickoutside prop
	const DEFAULT_CLICKOUTSIDE: ClickOutsideParameters = { enabled: false };
	function resolveClickoutside(): ClickOutsideParameters {
		return typeof clickoutside === 'boolean'
			? { ...DEFAULT_CLICKOUTSIDE, enabled: clickoutside }
			: clickoutside;
	}
	$: rClickoutside = resolveClickoutside();

	// resolving movable prop
	const DEFAULT_MOVABLE: MovableParameters = { enabled: false };
	function resolveMovable(): MovableParameters {
		return typeof movable === 'boolean' ? { ...DEFAULT_MOVABLE, enabled: movable } : movable;
	}
	$: rMovable = resolveMovable();

	function onClickX() {
		dispatch('resolve', { trigger: 'x' });
	}

	function onClickBackdrop() {
		if (backdrop && backdrop !== 'static') {
			dispatch('resolve', { trigger: 'backdrop' });
		}
	}

	function onClickOutside() {
		dispatch('resolve', { trigger: 'clickoutside' });
	}

	function onPressEscape() {
		dispatch('resolve', { trigger: 'escape' });
	}
</script>

<!--
  @component
  Modal component for use as is or as a base for building other modals.

  @public
-->

<svelte:window
	use:shortcut={{
		trigger: [
			{
				key: 'Escape',
				enabled: escape && topmost,
				callback: onPressEscape,
			},
		],
	}}
/>

<slot name="backdrop" class={rClasses.backdrop} onClick={onClickBackdrop}>
	{#if backdrop}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- eslint-disable-next-line svelte/valid-compile -->
		<div class={rClasses.backdrop} on:click={onClickBackdrop} transition:fade={{ duration: 75 }} />
	{/if}
</slot>

<slot name="container" class={rClasses.container}>
	<div
		class={rClasses.container}
		transition:fade={{ duration: 100 }}
		use:clickoutsideAction={rClickoutside}
		on:clickoutside={onClickOutside}
		use:movableAction={rMovable}
		{...accessibility}
	>
		<slot name="x" class={rClasses.x} onClick={onClickX} {xBtn}>
			{#if xBtn}
				<button class={rClasses.x} on:click={onClickX}>
					<slot name="x-content">
						<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 48 48">
							<path
								d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"
							/>
						</svg>
					</slot>
				</button>
			{/if}
		</slot>
		<slot />
	</div>
</slot>

<style>
	:global(:where(.s-modal-backdrop)) {
		position: absolute;
		z-index: 0;
		inset: 0;
		background-color: rgb(17 24 39 / 25%);
	}

	:global(:where(.s-modal-container)) {
		position: absolute;
		z-index: 1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	:global(button:where(.s-modal-x)) {
		position: absolute;
		top: 0;
		right: 0;

		padding: 0.5rem;

		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
		transition-property: transform;
	}

	:global(:where(.s-modal-x) svg) {
		stroke: currentcolor;
	}

	:global(:where(.s-modal-x):hover) {
		transform: scale(1.05);
	}

	:global(:where(.s-modal-x):active) {
		transform: scale(0.95);
	}
</style>
