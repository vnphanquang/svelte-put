/**
 * Supported modifier keys, map to {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent | KeyboardEvent}'s
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/altKey | altkey},
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/ctrlKey | ctrlKey},
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/shiftKey | shiftKey},
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey | metaKey}.
 *
 * @public
 */
export type ShortcutModifier = 'alt' | 'ctrl' | 'meta' | 'shift';

/**
 * Possible variations for modifier definition
 *
 * @public
 *
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
 *
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
 *
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
 *
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
 *
 */
export type ShortcutModifierDefinition =
  | ShortcutModifier
  | ShortcutModifier[]
  | ShortcutModifier[][];

/**
 * A definition of a shortcut trigger
 * @public
 */
export interface ShortcutTrigger {
  /**
   * whether to enable this triggered. Default to `true`
   *
   * @remarks
   *
   * `false` means trigger is disabled,
   *  but event listener is still placed on node
   */
  enabled?: boolean;
  /** modifier key to listen to in conjunction of `key` */
  modifier?: ShortcutModifierDefinition;
  /** id to distinguish this trigger from others */
  id?: string;
  /** the {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent | KeyboardEvent}.key to listen to */
  key: string;
  /** callback for when the trigger is matched */
  callback?: (detail: ShortcutEventDetails) => void;
  /** whether to call `event.preventDefault` before firing callback. Default to `false` */
  preventDefault?: boolean;
}

/**
 * svelte action parameters to config behavior of `shortcut`
 * @public
 */
export interface ShortcutParameters {
  /**
   * whether to activate the action. Default to `true`
   *
   * @remarks
   *
   * `false` means event listener will be removed from the node, effectively
   * disable all triggers.
   *
   * To disable only certain triggers, use the `enabled` option in the trigger definition instead.
   */
  enabled?: boolean;
  /** Either a single {@link ShortcutTrigger} definition or an array of multiple ones */
  trigger: Array<ShortcutTrigger> | ShortcutTrigger;
  /** event type to place on node. Default to `keydown` */
  type?: 'keydown' | 'keyup';
}

/**
 * `detail` payload for 'shortcut' {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent | CustomEvent }
 * @public
 *
 * @example
 *
 * ```svelte
 * <script>
 *  import { shortcut, type ShortcutEventDetails } from '@svelte-put/shortcut';
 *
 *  function onShortcut(event: CustomEvent<ShortcutEventDetails>) {
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
export interface ShortcutEventDetails {
  /** the node that the action was placed on */
  node: HTMLElement;
  /** the shortcut trigger of this event */
  trigger: ShortcutTrigger;
}
