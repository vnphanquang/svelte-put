declare module '@svelte-put/shortcut' {
  import type { ActionReturn } from 'svelte/action';
  /**
   * Deprecated, use `ShortcutParameter` instead
   */
  export type ShortcutParameters = ShortcutParameter;
  /**
   * Deprecated, use `ShortcutEventDetail` instead
   */
  export type ShortcutEventDetails = ShortcutEventDetail;
  /**
   * Listen for keyboard event and trigger `shortcut` {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent | CustomEvent }
   * @example Typical usage
   *
   * ```svelte
   * <script lang="ts">
   *  import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';
   *
   *  let commandPalette = false;
   *
   *  function onOpenCommandPalette() {
   *    commandPalette = true;
   *  }
   *  function onCloseCommandPalette() {
   *    commandPalette = false;
   *  }
   *
   *  function doSomethingElse(details: ShortcutEventDetail) {
   *    console.log('Action was placed on:', details.node);
   *    console.log('Trigger:', details.trigger);
   *  }
   *
   *  function onShortcut(event: CustomEvent<ShortcutEventDetail>) {
   *    if (event.detail.trigger.id === 'do-something-else') {
   *      console.log('Same as doSomethingElse()');
   *      // be careful here doSomethingElse would have been called too
   *   }
   * }
   * </script>
   *
   * <svelte:window
   *   use:shortcut={{
   *     trigger: [
   *       {
   *         key: 'k',
   *
   *         // trigger if either ctrl or meta is pressed
   *         modifier: ['ctrl', 'meta'],
   *
   *         callback: onOpenCommandPalette,
   *         preventDefault: true,
   *       },
   *       {
   *         key: 'Escape',
   *
   *         // preferably avoid arrow functions here for better performance
   *         // with arrow functions the action has to be updated more frequently
   *         callback: onCloseCommandPalette,
   *
   *         enabled: commandPalette,
   *         preventDefault: true,
   *       },
   *      {
   *         key: 'k',
   *
   *         // trigger if both ctrl & shift are pressed
   *         modifier: [['ctrl', 'shift']],
   *         id: 'do-something-else',
   *         callback: doSomethingElse,
   *      },
   *     ],
   *   }}
   *   on:shortcut={onShortcut}
   * />
   * ```
   *
   * @remarks
   *
   * As with any svelte action, `shortcut` should be use with element and not component.
   *
   * ```html
   * <-- correct usage-->
   *  <div use:intersect />
   *
   * <-- incorrect usage-->
   * <Component use:intersect/>
   * ```
   *
   * You can either:
   *
   * - pass multiple callbacks to their associated triggers, or
   *
   * - pass one single handler to the `on:shortcut` event, in which case you should
   * provide an ID to each trigger to be able to distinguish what trigger was activated
   * in the event handler.
   *
   * Either way, only use `callback` or `on:shortcut` and not both to
   * avoid handler duplication.
   *
   * @param node - HTMLElement to add event listener to
   * @param param - svelte action parameters
   * */
  export function shortcut(node: HTMLElement, param: ShortcutParameter): ShortcutActionReturn;
  /**
   * Additional attributes extended from `svelte-put/shortcut`
   *  @remarks
   * The ambient types for these extended attributes should be available automatically
   * whenever `svelte-put/shorcut` is imported.
   */
  interface ShortcutAttributes {
    'on:shortcut'?: (event: CustomEvent<ShortcutEventDetail>) => void;
  }

  /**
   * Supported modifier keys, map to {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent | KeyboardEvent}'s
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/altKey | altkey},
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/ctrlKey | ctrlKey},
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/shiftKey | shiftKey},
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey | metaKey}.
   *
   * */
  type ShortcutModifier = 'alt' | 'ctrl' | 'meta' | 'shift';

  /**
   * Possible variations for modifier definition
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
  type ShortcutModifierDefinition = ShortcutModifier | ShortcutModifier[] | ShortcutModifier[][];

  /**
   * A definition of a shortcut trigger
   * */
  interface ShortcutTrigger {
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
    callback?: (detail: ShortcutEventDetail) => void;
    /** whether to call `event.preventDefault` before firing callback. Default to `false` */
    preventDefault?: boolean;
  }

  /**
   * svelte action parameter to config behavior of `shortcut`
   * */
  interface ShortcutParameter {
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
  interface ShortcutEventDetail {
    /** the node that the action was placed on */
    node: HTMLElement;
    /** the shortcut trigger of this event */
    trigger: ShortcutTrigger;
  }

  type ShortcutActionReturn = ActionReturn<ShortcutParameter, ShortcutAttributes>;
}

//# sourceMappingURL=index.d.ts.map
