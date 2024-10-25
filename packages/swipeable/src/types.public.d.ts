import { ActionReturn, Action } from 'svelte/action';

export type SwipeSingleDirection = 'up' | 'down' | 'left' | 'right';
export type SwipeMultiDirection = 'x' | 'y' | 'all';
export type SwipeDirection = SwipeSingleDirection | SwipeMultiDirection;

export type SwipeThresholdUnit = 'px' | 'rem' | '%';
export type SwipeThreshold = `${number}${SwipeThresholdUnit}`;

export type SwipeFollowThrough = {
	/** duration for the follow through animation */
	duration?: number;
	/** easing function for the follow through animation */
	easing?: (t: number) => number;
}

/**
 * svelte action parameters to config behavior of `swipeable`
 */
export interface SwipeableConfig {
	/**
	 * one or more directions to swipe.
	 * Default to `['left', 'right']`
	 */
	direction?: SwipeDirection | SwipeDirection[];
	/**
	 * travel distance to trigger CustomEvent.
	 * Take a string with unit (px, rem, %).
	 * Note: percentage is relative to the element size.
	 * Default to `30%`
	 */
	threshold?: SwipeThreshold;
	/**
	 * CSS custom property to track swipe travel distance in px.
	 * Default to `--swipe`, i.e `--swipe-distance-x` and `--swipe-distance-y`.
	 * Set to `null` to disable tracking.
	 */
	customPropertyPrefix?: string | null;
	/**
	 * whether to move to 100% displacement if swipe passes threshold.
	 * When enabled, `onswipeend` will be fired upon follow-through completion.
	 * Can take a {@link SwipeFollowThrough} config object for more fine-grained control.
	 * Default to `true`
	 */
	followThrough?: SwipeFollowThrough | boolean;
	/**
	 * allow flicking, i.e fast swipe with high velocity.
	 * Note: flick action will ignore `threshold`
	 * Default to a function that returns true if swipe takes less than 170ms with speed over 1px/ms
	 * ie: `(ms, px) => ms < 170 && Math.abs(px / ms) > 1`
	 */
	allowFlick?: boolean | ((ms: number, px: number) => boolean);
	/**
	 * whether to enable the action.
	 * Default to `true`
	 */
	enabled?: boolean;
}

export interface SwipeStartEventDetail {
	/** direction of this swipe action */
	direction: SwipeSingleDirection;
	/** travel distance of this swipe action in px */
	distance: number;
}
export interface SwipeEndEventDetail extends SwipeStartEventDetail {
	/** whether the swipe action passes the threshold, or is a flick */
	passThreshold: boolean;
}

export interface SwipeableAttributes {
	onswipestart?: (event: CustomEvent<SwipeStartEventDetail>) => void;
	onswipeend?: (event: CustomEvent<SwipeEndEventDetail>) => void;
}

export type SwipeableParameter = SwipeableConfig['direction'] | SwipeableConfig | undefined;
export type SwipeableAction = Action<Element, SwipeableParameter, SwipeableAttributes>;
export type SwipeableActionReturn = ActionReturn<SwipeableParameter, SwipeableAttributes>;

