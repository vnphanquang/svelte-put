/**
 * Supported modifier keys, map to event's altKey, ctrlKey, shiftKey, metaKey.
 * @public
 */
export type ShortcutModifier = 'alt' | 'ctrl' | 'meta' | 'shift';

/**
 * Possible variations for modifier definition
 * @public
 *
 * @example Single key
 *
 * A single key as modifier is checked.
 *
 * ```svelte
 * <script>
 *  import { shortcut } from '@svelte-put/shortcut';
 * </script>
 *
 * <window use:shortcut={{
 *   trigger: {
 *    key: 'k ,
 *    modifier: ['ctrl'],
 *   },
 * }}
 * />
 * ```
 *
 * @example Multiple possible keys (or)
 *
 * Multiple keys are checked, if any key is pressed, the trigger is activated.
 *
 * ```svelte
 * <script>
 *  import { shortcut } from '@svelte-put/shortcut';
 * </script>
 *
 * <window use:shortcut={{
 *   trigger: {
 *    key: 'k ,
 *    modifier: ['ctrl', 'meta'],
 *   },
 * }}
 * />
 * ```
 *
 * @example Key combinations (and)
 *
 * A combination of keys are checked, if all are pressed, the trigger is activated.
 *
 * ```svelte
 * <script>
 *  import { shortcut } from '@svelte-put/shortcut';
 * </script>
 *
 * <window use:shortcut={{
 *   trigger: {
 *    key: 'k ,
 *    modifier: [['ctrl', 'shift']],
 *   },
 * }}
 * />
 * ```
 *
 * @example Mix & Match
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
 *    key: 'k ,
 *    modifier: [
 *      ['ctrl', 'shift'], // ctrl & shift
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
   * whether to enable this triggered
   *
   * @remarks
   *
   * `false` means trigger is disabled,
   *  but event listener is still placed on node
   */
  enabled?: boolean;
  modifier?: ShortcutModifier | ShortcutModifier[] | ShortcutModifier[][];
  id?: string;
  key: string;
  callback?: (detail: ShortcutEventDetails) => void;
  preventDefault?: boolean;
}

/**
 * svelte action parameters to config behavior of `shortcut`
 * @public
 */
export interface ShortcutParameters {
  /**
   * whether to activate the action
   *
   * @remarks
   *
   * `false` means event listener will be removed from the node, effectively
   * disable all triggers.
   *
   * To disable only certain triggers, use the `enabled` option in the trigger definition instead.
   */
  enabled?: boolean;
  /** Either a single ShortcutTrigger definition or multiple ones */
  trigger: Array<ShortcutTrigger> | ShortcutTrigger;
  /** event type to place on node */
  type?: 'keydown' | 'keyup';
}

/**
 * `detail` payload for 'shortcut' CustomEvent
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
