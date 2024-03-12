<script>
  import Example from './examples/example.svelte';
</script>

## Prior Art

- [svelte-actions-resize]: very minimal, no typescript support
- [svelte-observer-resize]: very similar to this implementation, but no typescript & ssr support
- [svelte-resize-observer]: component-based-strategy, including [resize-observer-polyfill] by default

## Installation

<enhanced-code-block group display="tabs">

```bash
/// title=npm
npm install --save-dev @svelte-put/resize
```

```bash
/// title=pnpm
pnpm add -D @svelte-put/resize
```

```bash
/// title=yarn
yarn add -D @svelte-put/resize
```

</enhanced-code-block>

## Quick Start

Use the `resized` [CustomEvent] (named so to avoid conflict with window's `resize` event) as the callback for `ResizeObserver`

```svelte
/// title=quick-start.svelte
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

```svelte
/// src=./examples/example.svelte
/// title=example.svelte
```

## Browser Support & Polyfill

As of this writing, [caniuse](https://caniuse.com/resizeobserver) shows that `ResizeObserver` is supported by all major browsers, but not IE11. `@svelte-put/resize` tries to stay minimal and hence does not include a polyfill. If one is needed, consider [resize-observer-polyfill].

---

Happy resizing! 👨‍💻

[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
[svelte-actions-resize]: https://github.com/Gennnji/svelte-actions-resize
[svelte-observer-resize]: https://github.com/jnruel/svelte-observe-resize
[svelte-resize-observer]: https://github.com/andrelmlins/svelte-resize-observer
[resize-observer-polyfill]: https://www.npmjs.com/package/resize-observer-polyfill
