<script>
	import { SettingsContext } from '$lib/contexts/settings.svelte';

  import QuickStartDemo from './_page/examples/quick-start.svelte';
  import TooltipDemo from './_page/examples/tooltip/usage.svelte';

  const settings = SettingsContext.get();
</script>

## Introduction

The [Popover API], which landed in baseline in 2024, provides a better standard for creating "floating" elements such as tooltips or popups. This package essentially provides a very minimal *reactive* wrapper around the Popover API to make it easier to set up and reuse in Svelte.

We are, however, still waiting for browsers to implement the [CSS Anchor Positioning AP](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning) as a standard to tether elements together. `@svelte-put/popover` is therefore often more useful when integrated with a positioning library such as [Floating UI]. You can skip to [Recipes] for examples of such integration.

## Installation

<enhanced-code-block group display="tabs" bind:title={settings.packageManager}>

```bash title=npm
npm install --save-dev @svelte-put/popover@next
```

```bash title=pnpm
pnpm add -D @svelte-put/popover@next
```

```bash title=yarn
yarn add -D @svelte-put/popover@next
```

</enhanced-code-block>

## Quick Start

The example below shows the most minimal setup for `@svelte-put/popover`.

```svelte title="Quick Start" src="./_page/examples/quick-start.svelte"
```
<fieldset class="not-prose border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <QuickStartDemo />
</fieldset>

<div class="c-callout c-callout--info">

**A bit of terminology**

`@svelte-put/popover` uses the terms `control` and `target` to refer to the elements that trigger the popover and the popover itself, respectively.

</div>

## The Popover Object

<span class="c-num align-baseline text-sm leading-unset">1</span> Spreading `popover.[control|target].attributes` helps set up SSR-friendly attributes for the popover. These attributes correspond directly to those required for the [Popover API]. The rendered HTML looks something like this:


```html title="HTML output"
<button popovertarget="some-generated-id" popovertargetaction="show">
  Open me Popover
</button>
<div popover="auto" id="some-generated-id" inert>
  <p>Popover content</p>
</div>
```

<span class="c-num align-baseline text-sm leading-unset">2</span> On the other hand, `use:popover.[control|target].action` sets up additional event listeners for runtime enhancements as discussed in the following [Checking if Open] and [Toggling] sections.

### Checking if Open

You can now watch for the popover's closed/open state with the rune-powered `open` attribute on `Popover` instance:

```svelte
<p>Popover is {popover.open ? 'open' : 'closed'}</p> <!-- popover.open is reactive -->
```

### Toggling

For toggling the popover programmatically, a `Popover` instance exposes several methods, which map closely to their [Popover API] counterparts:

```typescript title="methods"
const popover = new Popover();

popover.show(); // Show the popover
popover.hide(); // Hide the popover
popover.toggle(); // Toggle the popover
```

## Configuration

```typescript
const popover = new Popover({ /** optional init */ });
```

The `Popover` constructor take an init object with the following interface. Notice that everything is optional.

```typescript title="PopoverInit (flatten)"
interface PopoverInit {
	/**
	 * unique id for the control & target element pair.
	 * If not provided, a random one is generated using either
	 * crypto.randomUUID if available, or Math.random otherwise.
	 */
	id?: string;
	/** whether to set `inert` on target element when it is hidden */
	inertWhenHidden?: boolean;
	/** additional events to trigger target element */
	triggers?: {
		/** show popover on mouse hover. Disabled by default */
		hover?: TriggerConfig | boolean;
		/** show popover when control element has focus. Disabled by default */
		focus?: TriggerConfig | boolean;
	},
  plugins?:  PopoverPlugin[] | PopoverPlugin; // discussed more in ##Plugin section
}

interface TriggerConfig {
	/** Whether to enable this trigger */
	enabled: boolean;
	/**
	 * Milliseconds until popover is auto-dismissed after trigger becomes invalid.
	 * Defaults to `1000`.
	 * Set to `0` to disable auto-dismiss
	 */
	timeoutMs: number;
	/**
	 * Milliseconds to delay showing popover after trigger becomes valid.
	 * Defaults to `0` (no delay).
	 */
	delayMs: number;
}
```

## Plugin

`@svelte-put/popover` can be extended with one or more plugins, passed to the init object as discussed in [Configuration]. A plugin has the following interface:

```typescript title="PopoverPlugin"
/**
 * Plugin to extend Popover functionality.
 * @param {PopoverConfig} config - Popover "resolved" configuration
 */
type PopoverPlugin = (config: PopoverConfig) => ({
	name?: string;
	control?: {
		attributes?: HTMLButtonAttributes;
		actions?: Action<HTMLButtonElement, Popover>[];
	};
	target?: {
		attributes?: HTMLAttributes<HTMLElement>;
		actions?: Action<HTMLElement, Popover>[];
	};
});
```

Defined `attributes` and `actions` will be added to the respective element. See [Recipes] for more examples.

## Recipes

### Building Tooltips with Floating-UI

The example below shows one possible implementation of reusable inline text with tooltip, built in integration with [Floating UI]

<enhanced-code-block group display="files">

```svelte title="mypage.svelte" src="./_page/examples/tooltip/usage.svelte"
```

```svelte title="HintedText.svelte" src="./_page/examples/tooltip/HintedText.svelte"
```

```javascript title="compute.js" src="./_page/examples/tooltip/compute.js"
```

```javascript title="tooltip.css" src="./_page/examples/tooltip/tooltip.css"
```

</enhanced-code-block>

<fieldset class="border-2 border-violet-500 pt-4 pb-6 px-10">
  <legend>Example</legend>
  <TooltipDemo />
</fieldset>

---

Happy popovering!

[Popover API]: https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
[Floating UI]: https://floating-ui.com/
[Quick Start]: #quick-start
[Recipes]: #recipes
[Checking if Open]: #checking-if-open
[Toggling]: #toggling
[Configuration]: #configuration

