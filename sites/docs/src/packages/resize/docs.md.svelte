<script>
	import { SettingsContext } from '$lib/settings/context.svelte';

  import Example from './_page/examples/example.svelte';

  const settings = SettingsContext.get();
</script>

## Prior Arts

- [svelte-actions-resize]: very minimal, no typescript support
- [svelte-observer-resize]: very similar to this implementation, but no typescript & ssr support
- [svelte-resize-observer]: component-based-strategy, including [resize-observer-polyfill] by default

## Installation

<enhanced-code-block group display="tabs" bind:title={settings.packageManager}>

```bash title=npm
npm install --save-dev @svelte-put/resize
```

```bash title=pnpm
pnpm add -D @svelte-put/resize
```

```bash title=yarn
yarn add -D @svelte-put/resize
```

</enhanced-code-block>

<div class="c-callout c-callout--success c-callout--megaphone">

  New to Svelte 5? See [Migration Guides](#migration-guides).

</div>

## Quick Start

Use the `resized` [CustomEvent] (named so to avoid conflict with window's `resize` event) as the callback for `ResizeObserver`

```svelte title=quick-start.svelte
<script lang="ts">
  import { resize, type ResizeDetail } from '@svelte-put/resize';

  function onResized(e: CustomEvent<ResizeDetail>) {
    const {
      observer, // see https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
      entry, // see https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry
    } = e.detail;
  }
</script>

<div use:resize onresized={onResized} />
```

## Example

This example is ported from [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize#examples), where `border-radius` will scale in proportion to the size of the box.

<fieldset class="not-prose grid place-items-center border-2 border-violet-500 p-10">
  <legend>Example</legend>
  <Example />
</fieldset>

Expand the code block below to see how the example is implemented.

```svelte src=./_page/examples/example.svelte title=example.svelte collapsed
```

## Configuration

`resize` accepts a config object with the following interface.

```typescript title="ResizeConfig"
/** config behavior of `resize` */
export interface ResizeConfig {
	/**
	 * whether to activate the action. Default to `true`
	 * @default true
	 */
	enabled?: boolean;
	/**
	 * Be default, a singleton ResizeObserver is used for all actions for
	 * better performance. You can use this option to create a new ResizeObserver
	 * or provide your own.
	 * @default 'singleton'
	 */
	observer?: 'singleton' | 'new' | ResizeObserver;

	/**
	 * Options passed to {@link https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe#options | ResizeObserver.observe}
	 * @default undefined
	 */
	options?: ResizeObserverOptions;
}
```

## Browser Support & Polyfill

As of this writing, [caniuse](https://caniuse.com/resizeobserver) shows that `ResizeObserver` is supported by all major browsers, but not IE11. `@svelte-put/resize` tries to stay minimal and hence does not include a polyfill. If one is needed, consider [resize-observer-polyfill].

## Migration Guides

### V3 -> V4 (Svelte 5 in Runes mode)

When migrating to V4, you will need to change event directive `on:resized` to standard attribute `onresized`:

```svelte title="Migrate to Svelte 5"
<!-- :::diff - -->
<div use:resize on:resized></div>
<!-- ::: -->
<!-- :::diff + -->
<div use:resize onresized></div>
<!-- ::: -->
```

---

Happy resizing! 👨‍💻

[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
[svelte-actions-resize]: https://github.com/Gennnji/svelte-actions-resize
[svelte-observer-resize]: https://github.com/jnruel/svelte-observe-resize
[svelte-resize-observer]: https://github.com/andrelmlins/svelte-resize-observer
[resize-observer-polyfill]: https://www.npmjs.com/package/resize-observer-polyfill

