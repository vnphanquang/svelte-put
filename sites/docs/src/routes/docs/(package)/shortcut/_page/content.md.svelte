<script>
	import { getSettingsContext } from '$lib/contexts/settings';
  const { packageManager } = getSettingsContext();
</script>

## Installation

<enhanced-code-block group display="tabs" bind:title={$packageManager}>

```bash
/// title=npm
npm install --save-dev @svelte-put/shortcut
```

```bash
/// title=pnpm
pnpm add -D @svelte-put/shortcut
```

```bash
/// title=yarn
yarn add -D @svelte-put/shortcut
```

</enhanced-code-block>

## Quick Start

The minimal example below shows how to register a global shortcut for `Ctrl + K` (`Cmd + K` on macOS) and log the attached node and the original trigger config.

```svelte
/// title=quick-start.svelte
<script lang="ts">
  import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';

  function handleK(detail: ShortcutEventDetail) {
    console.log('attached node:', detail.node);
    console.log('original trigger config:', detail.trigger);
  }
</script>

<svelte:window
  use:shortcut={{
    trigger: {
      key: 'k',
      modifier: ['ctrl', 'meta'],
      callback: handleK,
    },
  }}
/>
```

## Trigger

The `trigger` option take either one single trigger definition...

```svelte
/// title=one-trigger.svelte
<svelte:window
  use:shortcut={{ trigger: { key: 'k', modifier: 'ctrl' } }}
/>
```

...or multiple ones in an array...

```svelte
/// title=multiple-triggers.svelte
<svelte:window
  use:shortcut={{
    trigger: [
      { key: 'c', modifier: 'ctrl' },
      { key: 'v', modifier: 'ctrl' },
    ],
  }}
/>
```

:::div c-callout c-callout--info
You can use multiple `use:shortcut` with one trigger definition in each.

```svelte
/// title=multiple-use.svelte
<svelte:window
  use:shortcut={{ trigger: { key: 'c', modifier: 'ctrl' } }}
  use:shortcut={{ trigger: { key: 'v', modifier: 'ctrl' } }}
/>
```

This approach does take up some additional memory. It should be negligible in most cases but if your application is performance-critical, it is recommend to provide all triggers in one `use:shortcut` as shown in the `multiple-triggers.svelte` example.
:::

## Modifier

Each `ShortcutTrigger` can specify either one or multiple modifiers (`ctrl`, `meta`, `alt`, `shift`) via `trigger.modifier` in both `AND` & `OR` fashions.

### Single Modifier

Set `trigger.modifier` to one of the modifier strings (`ctrl`, `meta`, `alt`, `shift`) to listen for that modifier.

```svelte
/// title=modifier-single.svelte
<svelte:window
  use:shortcut={{
    // ctrl+k
    trigger: {
      key: 'k',
      modifier: 'ctrl',
    },
  }}
/>
```

### One of Many Modifiers (OR)

Use a flat array of modifier strings to trigger when one of them is pressed.

```svelte
/// title=modifier-or.svelte
<svelte:window
  use:shortcut={{
    // ctrl+k or meta+k
    trigger: {
      key: 'k',
      modifier: ['ctrl', 'meta'],
    },
  }}
/>
```

### All of Modifiers (AND)

Wrap multiple modifier strings in a subarray to trigger only when all modifiers are pressed at the same time.

```svelte
/// title=modifier-and.svelte
<svelte:window
  use:shortcut={{
    // ctrl+shift+K
    trigger: {
      key: 'K',
      modifier: [['ctrl', 'shift']],
    },
  }}
/>
```

:::div c-callout c-callout--warning
Notice that the `key` option in the above example is set to a **capital K**. This is because `shift` is specified as a modifier; when `shift` and `k` are pressed down at the same time, [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value will be `K`. You can use [this site](https://www.toptal.com/developers/keycode) to test your key combinations.
:::

### Mix & Match

Use a combination of `OR` and `AND` to create complex modifier combinations.

```svelte
/// title=modifier-mix-match.svelte
<svelte:window
  use:shortcut={{
    // ctrl+alt+Delete or meta+Delete
    trigger: {
      key: 'Delete',
      modifier: [['ctrl', 'alt'], 'meta'],
    },
  }}
/>
```

## Handler

Handlers can be provided via either `trigger.callback`...

```svelte
/// title=handler-callback.svelte
<script lang="ts">
  import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';

  function toggleCommandPalette(detail: ShortcutEventDetail) {
    console.log('Action was placed on:', details.node);
    console.log('Trigger:', details.trigger);
    // ...
  }
</script>
<svelte:window
  use:shortcut={{
    trigger: {
      key: 'k',
      modifier: ['ctrl', 'meta'],
      callback: toggleCommandPalette,
    },
  }}
/>
```

...or `on:shortcut` [CustomEvent]:

```svelte
/// title=handler-custom-event.svelte
<script lang="ts">
  import { shortcut, type ShortcutEventDetail } from '@svelte-put/shortcut';

  function handleShortcuts(event: CustomEvent<ShortcutEventDetail>) {
    if (event.detail.trigger.id === 'toggle-command-palette') {
      // ...
    }
  }
</script>

<svelte:window
  use:shortcut={{
    trigger: {
      key: 'k',
      modifier: ['ctrl', 'meta'],
      id: 'toggle-command-palette',
    },
  }}
  on:shortcut={handleShortcuts}
/>
```

:::div c-callout c-callout--info
`trigger.id` is specified definition in the `handler-custom-event.svelte` example to conveniently help identify the trigger in the `on:shortcut` event listener.
:::

The two approaches are equivalent and depend on your aesthetic preference when multiple shortcuts are defined. `trigger.callback` is bound directly to its trigger definition, whereas `on:shortcut` is a centralized event listener for all shortcuts.

:::div c-callout c-callout--warning
You should use only one of the two presented approaches and **NOT** both to avoid duplicate event handling.
:::

## Original `KeyboardEvent`

You can access the original `KeyboardEvent` via `detail.originalEvent`. This is helpful for checking `target`.

```svelte
/// title=original-keyboard-event.svelte
<script lang="ts">
  import type { ShortcutEventDetail } from '@svelte-put/shortcut';
  import { shortcut } from '@svelte-put/shortcut';

  function onShortcut(event: CustomEvent<ShortcutEventDetail>) {
    const keyboardEvent = event.detail.originalEvent;
    // be cautious: `keyboardEvent` has already reached window here

    keyboardEvent.preventDefault(); // prevent browser default

    if ((keyboardEvent.target as HTMLElement)?.tagName === 'INPUT') {
      console.log('some input is focused, should skip');
      return;
    }
    // do things
  }
</script>

<svelte:window
  use:shortcut={{
    trigger: {
      key: 'k',
      modifier: ['ctrl', 'meta'],
    },
  }}
  on:shortcut={onShortcut}
/>
```

:::div c-callout c-callout--warning
Be aware that the event listener is placed on the same node the `shortcut` action is attached to. For example, if you use the action on `svelte:window`, and trigger a matching shortcut from an `<input>` element, calling `stopPropagation` or `preventDefault` on `originalEvent` might not result in the behavior you would expected. By the time `trigger.callback` or `on:shortcut` event handler runs, the event has already bubbled up to `window`.
:::

## API References

It is recommended to utilize your language server and intellisense for API exploration. In advanced use cases, however, you can refer to shortcut's [type definitions](https://github.com/vnphanquang/svelte-put/blob/16c71576002953fb57f6103c82d1d37b605dfe09/packages/shortcut/src/public.d.ts).

---

Happy making shortcuts! 👨‍💻

[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
