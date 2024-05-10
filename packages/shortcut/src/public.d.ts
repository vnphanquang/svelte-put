import { ActionReturn, Action } from 'svelte/action';

/**
 * Additional attributes extended from `svelte-put/shortcut`
 *
 * The ambient types for these extended attributes should be available automatically
 * whenever `svelte-put/shorcut` is imported.
 */
export interface ShortcutAttributes {
	'on:shortcut'?: (event: CustomEvent<ShortcutEventDetail>) => void;
}

/**
 * Supported modifier keys, map to {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent | KeyboardEvent}'s
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/altKey | altkey},
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/ctrlKey | ctrlKey},
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/shiftKey | shiftKey},
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey | metaKey}.
 *
 *
 */
export type ShortcutModifier = 'alt' | 'ctrl' | 'meta' | 'shift';

/**
 * Possible variations for modifier definition
 * @example
 *
 * Listen for a single modifier
 *
 * ```svelte
 * <script>
 *  import { shortcut } from '@svelte-put/shortcut';
 * </script>
 *
 * <window use:shortcut={{
 *   trigger: {
 *    key: 'k' ,
 *    modifier: 'ctrl',
 *   },
 * }}
 * />
 * ```
 * @example
 *
 * Listen for one of many modifiers (or)
 *
 * ```svelte
 * <script>
 *  import { shortcut } from '@svelte-put/shortcut';
 * </script>
 *
 * <window use:shortcut={{
 *   trigger: {
 *    key: 'k' ,
 *    modifier: ['ctrl', 'meta'],
 *   },
 * }}
 * />
 * ```
 * @example
 *
 * Listen for a combination of multiple modifiers (and)
 *
 * ```svelte
 * <script>
 *  import { shortcut } from '@svelte-put/shortcut';
 * </script>
 *
 * <window use:shortcut={{
 *   trigger: {
 *    key: 'k' ,
 *    modifier: [['ctrl', 'shift']],
 *   },
 * }}
 * />
 *
 * ```
 * @example
 *
 * A mix of the 3 previous examples
 *
 * ```svelte
 * <script>
 *  import { shortcut } from '@svelte-put/shortcut';
 * </script>
 *
 * <window use:shortcut={{
 *   trigger: {
 *    key: 'k' ,
 *    modifier: [
 *      ['ctrl', 'shift'], // ctrl and shift
 *                         // or
 *      ['meta'],          // meta
 *    ],
 *   },
 * }}
 * />
 * ```
 */
export type ShortcutModifierDefinition =
	| ShortcutModifier
	| ShortcutModifier[]
	| ShortcutModifier[][];

/**
 * A definition of a shortcut trigger
 *
 */
export interface ShortcutTrigger {
	/**
	 * whether to enable this triggered. Default to `true`
	 *
	 *
	 *
	 * `false` means trigger is disabled,
	 *  but event listener is still placed on node
	 */
	enabled?: boolean;
	/** modifier key to listen to in conjunction of `key` */
	modifier?: ShortcutModifierDefinition;
	/** id to distinguish this trigger from others, recommended when using `on:shortcut` */
	id?: string;
	/** the {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent | KeyboardEvent}.key to listen to */
	key: string;
	/** callback for when the trigger is matched */
	callback?: (detail: ShortcutEventDetail) => void;
	/**
	 * whether to call `event.preventDefault` before firing callback. Default to `false`
	 *
	 *
	 *
	 * This is called on the node the action is attached to, not the node that triggers the original `KeyboardEvent`.
	 * So for example, if `shortcut` is attached to `window`, by the time `preventDefault` is called, the event has already been
	 * bubbled up to `window`.
	 */
	preventDefault?: boolean;
}

/**
 * svelte action parameter to config behavior of `shortcut`
 *
 */
export interface ShortcutParameter {
	/** whether to activate the action. Default to `true` */
	enabled?: boolean;
	/** Either a single {@link ShortcutTrigger} definition or an array of multiple ones */
	trigger: Array<ShortcutTrigger> | ShortcutTrigger;
	/** event type to place on node. Default to `keydown` */
	type?: 'keydown' | 'keyup';
}

/**
 * `detail` payload for 'shortcut' {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent | CustomEvent }
 * @example
 *
 * ```html
 * <script>
 *  import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';
 *
 *  function onShortcut(event: CustomEvent<ShortcutEventDetail>) {
 *    if (event.detail.trigger.id === 'my-shortcut') {
 *      console.log('do something');
 *    }
 *  }
 * <script/>
 *
 * <window
 *  use:shortcut={{
 *    trigger: {
 *      key: 'k ,
 *      modifier: ['ctrl'],
 *      id: 'my-shortcut',
 *    },
 *  }}
 *  on:shortcut={onShortcut}
 * />
 * ```
 */
export interface ShortcutEventDetail {
	/** the node that the action was placed on */
	node: HTMLElement;
	/** the shortcut trigger of this event */
	trigger: ShortcutTrigger;
	/** the original `KeyboardEvent`. Helpful to access the event target, for example */
	originalEvent: KeyboardEvent;
}

/**  */
export type ShortcutAction = Action<HTMLElement, ShortcutParameter, ShortcutAttributes>;

/**  */
export type ShortcutActionReturn = ActionReturn<ShortcutParameter, ShortcutAttributes>;
