<script>
	import { getSettingsContext } from '$lib/contexts/settings';
  import Demo from './examples/demo.svelte';
  import Exclude from './examples/exclude.svelte';

  const { packageManager } = getSettingsContext();
</script>

## Installation

<enhanced-code-block group display="tabs" bind:title={$packageManager}>

```bash
/// title=npm
npm install --save-dev @svelte-put/clickoutside
```

```bash
/// title=pnpm
pnpm add -D @svelte-put/clickoutside
```

```bash
/// title=yarn
yarn add -D @svelte-put/clickoutside
```

</enhanced-code-block>

## Quick Start

```svelte
/// src=./examples/quick-start.svelte
/// title=quick-start.svelte
```

<h2 id="advanced-usage-and-customization">
  Advanced Usage & Customization
</h2>

### Feature Demo

<Demo />

```svelte
/// src=./examples/demo.svelte
/// title=feature-demo.svelte
```

### Limit the Clickoutside Zone

As seen in demo above, the `limit.parent` option can be set to limit the zone that will trigger `clickoutside` [CustomEvent]. By default, there is no limit, and the event listener is attached to `document`.

```svelte
/// title=limit-parent.svelte
<script lang="ts">
  let parentNode: HTMLElement;
</script>

<div bind:this={parentNode}>
  <div use:clickoutside={{ limit: { parent: parentNode } }}>...</div>
</div>
```

### Event Type Customization

By default, `clickoutside` is based on the `click` event. You can customize this with the `event` option.

```svelte
<div use:clickoutside={{ event: 'mousedown' }}>...</div>
```

### `AddEventListenerOptions`

Additional options can be passed to [addEventListener] should it be necessary.

```svelte
/// title=options.svelte
<div use:clickoutside={{ options: { passive: true } }}>...</div>

 <!-- options => useCapture -->
<div use:clickoutside={{ options: true }}>...</div>
```

### Excluding Other Events in the Clickoutside Zone

In the [Advanced Usage & Customization] section, notice the `stopPropagation` modifier was added to the `click` event. Without this, the button would also trigger an `clickoutside` CustomEvent.

```svelte
<button on:click|stopPropagation>...</button>
```

:::div c-callout c-callout--info
This makes sense since the button is technically outside of the element `clickoutside` is placed on, being within the "clickoutside zone".
:::

Be aware to reflect customization made to the event listener as mentioned in the last two sections. For example, if the `mousedown` event is used instead of `click`, add `stopPropagation` to `mousedown` on the element that should not trigger `clickoutside`.

```svelte
/// title=exclude-with-custom-event.svelte
<div use:clickoutside={{ event: 'mousedown' }}>...</div>

<!-- later -->
<button on:mousedown|stopPropagation>...</button>
```

Below is another demo where `stopPropagation` is generally recommended. Consider two buttons, each should trigger the corresponding box on its side:

- The **green** toggle button behaves as expected. Notice the added `|stopPropagation` on this button.
- The **red** toggle button does not behave as expected. Specifically:
  - when the left **green** box is toggled on, clicking on this **red** button causes the **green** box to toggled off, because the **red** button is indeed in outside the **green** box,
  - clicking on the **red** button does not seem to toggle the **red** box on, for the same reason as before: the box does indeed get toggled on, but immediately off again because the **red** button triggers both the toggling and the clickoutside events.

<fieldset class="border-2 border-violet-500">
  <legend>Example</legend>
  <Exclude />
</fieldset>

```svelte
/// title=exclude-demo.svelte
/// src=./examples/exclude.svelte
```

Happy clicking outside! 👨‍💻

[Advanced Usage & Customization]: #advanced-usage-and-customization
[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEventj
[addEventListener]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
