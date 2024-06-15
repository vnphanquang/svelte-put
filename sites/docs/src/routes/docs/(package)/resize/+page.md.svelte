<script>
	import { SettingsContext } from '$lib/contexts/settings.svelte';

  import Example from './_page/examples/example.svelte';

  const settings = SettingsContext.get();
</script>

## Prior Art

- [svelte-actions-resize]: very minimal, no typescript support
- [svelte-observer-resize]: very similar to this implementation, but no typescript & ssr support
- [svelte-resize-observer]: component-based-strategy, including [resize-observer-polyfill] by default

## Installation

<enhanced-code-block group display="tabs" bind:title={settings.packageManager}>

```bash title=npm
npm install --save-dev @svelte-put/resize@4.0.0-next.1
```

```bash title=pnpm
pnpm add -D @svelte-put/resize@4.0.0-next.1
```

```bash title=yarn
yarn add -D @svelte-put/resize@4.0.0-next.1
```

</enhanced-code-block>

<div class="c-callout c-callout--success c-callout--megaphone">

  New to Svelte 5? See [Migration Guides](#migration-guides).

</div>

## Quick Start

Use the `resized` [CustomEvent] (named so to avoid conflict with window's `resize` event) as the callback for `ResizeObserver`

```svelte title=quick-start.svelte
<script>
  import { resize } from '@svelte-put/resize';
</script>

<div use:resize on:resized />
```

## Example

This example is ported from [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize#examples), where `border-radius` will scale in proportion to the size of the box.

<fieldset class="not-prose grid place-items-center border-2 border-violet-500 p-10">
  <legend>Example</legend>
  <Example />
</fieldset>

```svelte src=./_page/examples/example.svelte title=example.svelte
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
