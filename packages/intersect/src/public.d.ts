import { ActionReturn, Action } from 'svelte/action';

/**
 * Additional attributes extended from `svelte-put/intersect`
 *
 *
 *
 * The ambient types for these extended attributes should be available automatically
 * whenever `svelte-put/intersect` is imported.
 *
 * ```html
 * <script lang="ts">
 *   import { intersect } from '@svelte-put/intersect';
 * </script>
 *
 * <!-- onintersect, onintersectonce should be typed -->
 * <div
 *   use:intersect
 *   onintersect
 *   onintersectonce
 * />
 * ```
 */
export interface IntersectAttributes {
	onintersect?: (event: CustomEvent<IntersectDetail>) => void;
	onintersectonce?: (event: CustomEvent<IntersectDetail>) => void;
}

/**
 * config behavior of `intersect`
 * parameters for `intersect` extends {@link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver | IntersectionObserverInit }
 * (second parameter passed to IntersectionObserver constructor)
 */
export interface IntersectConfig extends IntersectionObserverInit {
	/** whether to activate the action. Default to `true` */
	enabled?: boolean;
}

/** `detail` payload for `intersect` and `intersectonce` CustomEvent */
export interface IntersectDetail {
	/** the IntersectionObserver itself */
	readonly observer: IntersectionObserver;
	/** list of IntersectionObserverEntry passed from IntersectionObserver callback */
	readonly entries: IntersectionObserverEntry[];
	/** scrolling direction */
	readonly direction: 'up' | 'down';
}

/** parameter received from action input */
export type IntersectParameter = IntersectConfig | undefined;
export type IntersectAction = Action<HTMLElement, IntersectParameter, IntersectAttributes>;
export type IntersectActionReturn = ActionReturn<IntersectParameter, IntersectAttributes>;
