import { on } from 'svelte/events';

/**
 * @param {import('./types.public').ShortcutModifier} def
 * @returns {number}
 */
function mapModifierToBitMask(def) {
	switch (def) {
		case 'ctrl':
			return 0b1000;
		case 'shift':
			return 0b0100;
		case 'alt':
			return 0b0010;
		case 'meta':
			return 0b0001;
	}
}

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
 *         modifier: false, // or any falsy value other than undefined to means 'expect no modifier'
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
 *   onshortcut={onShortcut}
 * />
 * ```
 * You can either:
 *
 * - pass multiple callbacks to their associated triggers, or
 *
 * - pass one single handler to the `onshortcut` event, in which case you should
 * provide an ID to each trigger to be able to distinguish what trigger was activated
 * in the event handler.
 *
 * Either way, only use `callback` or `onshortcut` and not both to
 * avoid handler duplication.
 * @param {HTMLElement} node - HTMLElement to add event listener to
 * @param {import('./types.public').ShortcutParameter} param - svelte action parameters
 * @returns {import('./types.public').ShortcutActionReturn}
 */
export function shortcut(node, param) {
	let { enabled = true, trigger, type = 'keydown' } = param;

	/**
	 * @param {KeyboardEvent} event
	 */
	function handler(event) {
		const normalizedTriggers = Array.isArray(trigger) ? trigger : [trigger];
		const modifierMask = [event.metaKey, event.altKey, event.shiftKey, event.ctrlKey].reduce(
			(acc, value, index) => {
				if (value) {
					return acc | (1 << index);
				}
				return acc;
			},
			0b0000,
		);
		for (const trigger of normalizedTriggers) {
			const mergedTrigger = {
				preventDefault: false,
				enabled: true,
				...trigger,
			};
			const { modifier, key, callback, preventDefault, enabled: triggerEnabled } = mergedTrigger;
			if (triggerEnabled) {
				if (event.key !== key) continue;

				if (modifier === null || modifier === false) {
					if (modifierMask !== 0b0000) continue;
				} else if (
					modifier !== undefined &&
					modifier?.[0]?.length > 0
				) {
					const orDefs = Array.isArray(modifier) ? modifier : [modifier];
					let modified = false;
					for (const orDef of orDefs) {
						const mask = (Array.isArray(orDef) ? orDef : [orDef]).reduce(
							(acc, def) => acc | mapModifierToBitMask(def),
							0b0000,
						);
						if (mask === modifierMask) {
							modified = true;
							break;
						}
					}
					if (!modified) continue;
				}

				if (preventDefault) event.preventDefault();
				/** @type {import('./types.public').ShortcutEventDetail} */
				const detail = {
					node,
					trigger: mergedTrigger,
					originalEvent: event,
				};
				node.dispatchEvent(new CustomEvent('shortcut', { detail }));
				callback?.(detail);
			}
		}
	}

	/** @type {undefined | (() => void)} */
	let off;
	if (enabled) {
		off = on(node, type, handler);
	}

	return {
		update: (update) => {
			const { enabled: newEnabled = true, type: newType = 'keydown' } = update;

			if (enabled && (!newEnabled || type !== newType)) {
				off?.();
			} else if (!enabled && newEnabled) {
				off = on(node, newType, handler);
			}

			enabled = newEnabled;
			type = newType;
			trigger = update.trigger;
		},
		destroy: () => {
			off?.();
		},
	};
}
