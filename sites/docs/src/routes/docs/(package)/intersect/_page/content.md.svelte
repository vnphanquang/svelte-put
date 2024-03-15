<script>
  import DemoEventIntersect from './examples/event-intersect.svelte';
  import DemoEventIntersectOnce from './examples/event-intersectonce.svelte';

	import { getSettingsContext } from '$lib/contexts/settings';
  const { packageManager } = getSettingsContext();
</script>

## Acknowledgement

This packages employs the [Svelte action](https://svelte.dev/docs/svelte-action) strategy. If you are looking for a declarative, component-oriented solution, check out [metonym's implementation](https://github.com/metonym/svelte-intersection-observer).

## Installation

<enhanced-code-block group display="tabs" bind:title={$packageManager}>

```bash
/// title=npm
npm install --save-dev @svelte-put/intersect
```

```bash
/// title=pnpm
pnpm add -D @svelte-put/intersect
```

```bash
/// title=yarn
yarn add -D @svelte-put/intersect
```

</enhanced-code-block>

## Quick Start

Below is a minimal example with default options. The event listener provided to the `intersect` [CustomEvent] will be triggered when the targeted `div` intersects the viewport.

```svelte
/// src=./examples/quick-start.svelte
/// title=quick-start.svelte
```

## Initialization Options

`intersect` can take a config object that supports all options in [IntersectionObserver]'s constructor (`root`, `rootMargin`, `threshold`), and an additional `enabled` option to dynamically enable/disable the action.

```svelte
/// src=./examples/initialization-options.svelte
/// title=initialization-options.svelte
```

## Intersection CustomEvents

### `intersect`

Listener for the `intersect` [CustomEvent] is essentially the same callback as one passed to the [IntersectionObserver]'s constructor.

:::div c-callout c-callout--info
`intersect` will attempt to detect the scrolling direction by keeping record of `boundingClientRect`. This is available in the event listener via the `event.detail.direction` property.
:::

<fieldset class="block border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <p class="text-center">Scroll down / up so that this box goes in and out of the viewbox. Observe the text indicator changes accordingly.</p>
  <DemoEventIntersect />
</fieldset>

```svelte
/// src=./examples/event-intersect.svelte
/// title=event-intersect.svelte
```

### `intersectonce`

Following the same interface as with `intersect`, `intersectonce` [CustomEvent] only fires once on the first intersection and never again. One possible use case is for fading-in animation on scroll, as seen in the below example.

<fieldset class="block border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <p class="text-center">Scroll down within this box and observe the fade-in intro effect!</p>
  <DemoEventIntersectOnce />
</fieldset>

```svelte
/// src=./examples/event-intersectonce.svelte
/// title=event-intersect-once.svelte
```

---

Happy intersecting! 👨‍💻

[IntersectionObserver]: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
