<script>
	import { SettingsContext } from '$lib/contexts/settings.svelte';

  import DemoNoParameters from './_page/examples/no-parameters.svelte';
  import DemoOptionAxis from './_page/examples/option-axis.svelte';
  import DemoLimitationScrollSnap from './_page/examples/limitation-scroll-snap.svelte';

  const settings = SettingsContext.get();
</script>

## Installation

<enhanced-code-block group display="tabs" bind:title={settings.packageManager}>

```bash title=npm
npm install --save-dev @svelte-put/dragscroll
```

```bash title=pnpm
pnpm add -D @svelte-put/dragscroll
```

```bash title=yarn
yarn add -D @svelte-put/dragscroll
```

</enhanced-code-block>

## Quick Start

<div class="c-callout c-callout--info">

Typically, `use:dragscroll` should be placed on the scroll container.

</div>

Below is a minimal demo of `dragscroll` with default options. Try scrolling horizontally by pressing and dragging your mouse within the chessboard-patterned box.

<DemoNoParameters />

```svelte src=./_page/examples/no-parameters.svelte title=default-options.svelte
```

## Specifying the Scroll Axis

`dragscroll` supports both axes. you can specifying one or both scrolling axes using the `axis` option. By default, `axis` is set to `x`.

<DemoOptionAxis />

```svelte src=./_page/examples/option-axis.svelte title=option-axis.svelte
```

## `mouse` vs `pointer`

By default, `dragscroll` assumes [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent), i.e `pointerup`, `pointerdown`, `pointermove`, `pointerleave`. You can switch to [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) equivalents by setting the `event` option to `mouse`.

```svelte title=option-event.svelte
<div use:dragscroll={{ event: 'pointer' }}>...</div>
<div use:dragscroll={{ event: 'mouse' }}>...</div>
```

## Disable Cursor Handling

By default, `dragscroll`adds `cursor: grab` to the node the action is placed on, and similarly, `cursor: grabbing` on `mousedown`. This can be disabled by setting the `cursor` option to `false` (default is `true`).

```svelte title=option-cursor.svelte
<div use:dragscroll={{ cursor: false }}>...</div>
```

## Limitation

There is a known issue when `dragscroll` is used with [scroll-snap-align](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align), where the scroll container tends to be unresponsive to `dragscroll` and requires a great `mousemove` length to snap to the next box.

In the example below, try using the **scrollbar** to confirm `scroll-snap-align` has been set up. Then, try dragging with mouse and notice that it only works when the mouse is dragged over almost the entire width of the container.

<DemoLimitationScrollSnap />

If you find a solution or workaround to the above, please consider [open a PR](https://github.com/vnphanquang/svelte-put/pulls) or [discussion thread](https://github.com/vnphanquang/svelte-put/discussions). Thank you!

Happy dragging! 👨‍💻
