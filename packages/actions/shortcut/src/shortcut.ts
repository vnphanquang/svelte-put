import type { ShortcutEventDetails, ShortcutModifier, ShortcutParameters } from './types';

/**
 * Listen for keyboard event and trigger 'shortcut' event
 * @public
 *
 * @param node - HTMLElement to add event listener to
 * @param params - svelte action parameters
 * @returns svelte action interface
 *
 * @remarks
 *
 * You can either pass multiple callbacks to their associated triggers, or
 * pass one single handler to the `on:shortcut` event, in which case you should
 * provide an ID to each trigger to be able to distinguish what trigger was activated
 * in the event handler. Either way, only use `callback` or `on:shortcut` and not both to
 * avoid handler duplication.
 *
 * @example Typical usage
 *
 * ```svelte
 * <script lang="ts">
 *  import { shortcut, type ShortcutEventDetails } from '@svelte-put/shortcut';
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
 *  function doSomethingElse(details: ShortcutEventDetails) {
 *    console.log('Action was placed on:', details.node);
 *    console.log('Trigger:', details.trigger);
 *  }
 *
 *  function onShortcut(event: CustomEvent<ShortcutEventDetails>) {
 *    if (event.detail.trigger === 'do-something-else') {
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
 */
export function shortcut(node: HTMLElement, params: ShortcutParameters) {
  let { enabled = true, trigger, type = 'keydown' } = params;

  const handler = (event: KeyboardEvent) => {
    const normalizedTriggers = Array.isArray(trigger) ? trigger : [trigger];
    const modifiedMap: Record<ShortcutModifier, boolean> = {
      alt: event.altKey,
      ctrl: event.ctrlKey,
      shift: event.shiftKey,
      meta: event.metaKey,
    };
    for (const trigger of normalizedTriggers) {
      const mergedTrigger = {
        modifier: [],
        preventDefault: false,
        enabled: true,
        ...trigger,
      };
      const { modifier, key, callback, preventDefault, enabled: triggerEnabled } = mergedTrigger;
      if (triggerEnabled) {
        if (modifier.length) {
          const modifierDefs = (Array.isArray(modifier) ? modifier : [modifier]).map((def) =>
            typeof def === 'string' ? [def] : def,
          );
          const modified = modifierDefs.some((def) =>
            def.every((modifier) => modifiedMap[modifier]),
          );
          if (!modified) continue;
        }
        if (event.key === key) {
          if (preventDefault) event.preventDefault();
          const detail: ShortcutEventDetails = { node, trigger: mergedTrigger };
          node.dispatchEvent(new CustomEvent('shortcut', { detail }));
          callback?.(detail);
        }
      }
    }
  };

  if (enabled) node.addEventListener(type, handler);

  return {
    update: (update: ShortcutParameters) => {
      const { enabled: newEnabled = true, type: newType = 'keydown' } = update;

      if (enabled && (!newEnabled || type !== newType)) {
        node.removeEventListener(type, handler);
      } else if (!enabled && newEnabled) {
        node.addEventListener(newType, handler);
      }

      enabled = newEnabled;
      type = newType;
      trigger = update.trigger;
    },
    destroy: () => {
      node.removeEventListener(type, handler);
    },
  };
}
