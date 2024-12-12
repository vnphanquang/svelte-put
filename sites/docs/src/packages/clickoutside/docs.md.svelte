<script>
	import { SettingsContext } from '$lib/settings/context.svelte';

  import Demo from './_page/examples/demo.svelte';
  import Exclude from './_page/examples/exclude.svelte';

  const settings = SettingsContext.get();
</script>

## Installation

<enhanced-code-block group display="tabs" bind:title={settings.packageManager}>

```bash title=npm
npm install --save-dev @svelte-put/clickoutside
```

```bash title=pnpm
pnpm add -D @svelte-put/clickoutside
```

```bash title=yarn
yarn add -D @svelte-put/clickoutside
```

</enhanced-code-block>

<div class="c-callout c-callout--success c-callout--megaphone">

  New to Svelte 5? See [Migration Guides](#migration-guides).

</div>

## Quick Start

```svelte src=./_page/examples/quick-start.svelte title=quick-start.svelte
```

<h2 id="advanced-usage-and-customization">
  Advanced Usage & Customization
</h2>

### Feature Demo

<Demo />

Expand the code block below to see how the demo is implemented.

```svelte src=./_page/examples/demo.svelte title=feature-demo.svelte collapsed=true
```

### Limit the Clickoutside Zone

As seen in demo above, the `limit.parent` option can be set to limit the zone that will trigger `clickoutside` [CustomEvent]. By default, there is no limit, and the event listener is attached to `document`.

```svelte title=limit-parent.svelte
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

```svelte title=options.svelte
<div use:clickoutside={{ options: { passive: true } }}>...</div>

 <!-- options => useCapture -->
<div use:clickoutside={{ options: true }}>...</div>
```

### Excluding Other Events in the Clickoutside Zone

In the [Advanced Usage & Customization] feature demo, notice the `stopPropagation` is explicitly called in the event listener of the "Enable/Disable" button. Without this, the button would also trigger an `clickoutside` CustomEvent.

```svelte
<button onclick={(e) => e.stopPropagation()}>...</button>
```

<p class="c-callout c-callout--info">
  This makes sense since the button is technically outside of the element `clickoutside` is placed on, being within the "clickoutside zone".
</p>

Be aware to reflect customization made to the event listener as mentioned in the last two sections. For example, if the `mousedown` event is used instead of `click`, call `stopPropagation` on `mousedown` of the element that should not trigger `clickoutside`.

```svelte title=exclude-with-custom-event.svelte
<div use:clickoutside={{ event: 'mousedown' }}>...</div>

<!-- later -->
<button onmousedown={(e) => e.stopPropagation()}>...</button>
```

Below is another demo where `stopPropagation` is generally recommended. Consider two buttons, each should trigger the corresponding box on its side:

- The **green** toggle button behaves as expected. Notice the explicit `stopPropagation` call in the event listener.
- The **red** toggle button does not behave as expected. Specifically:
  - when the left **green** box is toggled on, clicking on this **red** button causes the **green** box to toggled off, because the **red** button is indeed in outside the **green** box,
  - clicking on the **red** button does not seem to consistently toggle the **red**, for the same reason as before: the box does indeed get toggled on/off, but immediately off/on again because the **red** button triggers both the toggling and the clickoutside events.

<fieldset class="border-2 border-violet-500">
  <legend>Example</legend>
  <Exclude />
</fieldset>

```svelte title=exclude-demo.svelte src=./_page/examples/exclude.svelte
```

## Migration Guides

### V3 -> V4 (Svelte 5 in Runes mode)

When migrating to V4, you will need to change event directive `on:clickoutside` to standard attribute `onclickoutside` (remove `:`).

```svelte
<!-- :::diff - -->
<div use:clickoutside on:clickoutside></div>
<!-- ::: -->
<!-- :::diff + -->
<div use:clickoutside onclickoutside></div>
<!-- ::: -->
```

Additionally, event modifier `|stopPropagation` is no longer support in Svelte, either use `onclickcapture` or explicitly call `e.stopPropagation()` in your event handler.

---

Happy clicking outside!

[Advanced Usage & Customization]: #advanced-usage-and-customization
[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEventj
[addEventListener]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

