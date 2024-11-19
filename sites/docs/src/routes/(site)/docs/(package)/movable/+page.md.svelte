<script>
	import { SettingsContext } from '$lib/settings/context.svelte';

  import DemoQuickStart from './_page/examples/quick-start.svelte';
  import DemoLimitScreen from './_page/examples/limit-screen.svelte';
  import DemoLimitAncestor from './_page/examples/limit-ancestor.svelte';
  import DemoLimitDelta from './_page/examples/limit-delta.svelte';
  import DemoLimitSingleAxis from './_page/examples/limit-single-axis.svelte';
  import DemoHandle from './_page/examples/handle.svelte';
  import DemoIgnore from './_page/examples/ignore.svelte';

  const settings = SettingsContext.get();
</script>

## Installation

<enhanced-code-block group display="tabs" bind:title={settings.packageManager}>

```bash title=npm
npm install --save-dev @svelte-put/movable
```

```bash title=pnpm
pnpm add -D @svelte-put/movable
```

```bash title=yarn
yarn add -D @svelte-put/movable
```

</enhanced-code-block>

<div class="c-callout c-callout--success c-callout--megaphone">

  New to Svelte 5? See [Migration Guides](#migration-guides).

</div>

<h2 id="quick-start">Quick Start</h2>

In the following minimal example, try dragging the <span class="bg-info-bg text-info-fg px-2">blue</span> box around.

<fieldset class="not-prose grid place-items-center space-y-4 border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <p class="text-center">Box below can be moved around</p>
  <DemoQuickStart />
</fieldset>

```svelte src=./_page/examples/quick-start.svelte title=quick-start.svelte
```

## Events

```svelte
<div use:movable onmovablestart onmovableend />
```

`movable` provides two [CustomEvents][CustomEvent], `movablestart` and `movableend`, with `event.detail` as `MovableEventDetail`.

```typescript title=MovableEventDetail
export interface MovableEventDetail {
	/** the node that the action was placed on */
	node: HTMLElement;
	/** last known position, as in styles.position */
	position: {
		/** styles.position.left */
		left: number;
		/** styles.position.right */
		top: number;
	};
}
```

## Setting Limit

By default, as seen in [Quick Start], node that uses `movable` can be moved freely. The `limit` option can be set to limit the "movable" zone.

### Limit within Screen

```svelte
<div use:movable={{ limit: { parent: 'screen' } }} />
```

Limit to the viewport by setting `limit.parent` to `'screen'`.

<fieldset class="not-prose grid place-items-center space-y-4 border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <p class="text-center">Box below can be moved around, but only within viewport</p>
  <DemoLimitScreen />
</fieldset>

```svelte src=./_page/examples/limit-screen.svelte title=limit-screen.svelte
```

### Limit within an `HTMLElement` Ancestor

```svelte
<div use:movable={{ limit: { parent: ancestorNode } }} />
```

Limit to an ancestor by referencing `limit.parent` to that ancestor.

<DemoLimitAncestor />

```svelte src=./_page/examples/limit-ancestor.svelte title=limit-ancestor.svelte
```

<div class="c-callout c-callout--warning">

`movable` cannot take into account scrollbars. So, for example, if your `limit.parent` is a scroll container with visible vertical scrollbar, moving the "movable" node to the scrollbar region will cause overflow in the horizontal direction, triggering the horizontal scrollbar to appear.

</div>

### Limit within Delta

```svelte title=limit-delta-syntax.svelte
<div use:movable={{ limit: { delta: '50%' } }} />
<div use:movable={{ limit: { delta: '250px' } }} />
<div use:movable={{ limit: { delta: { x: '20%', y: '100px' } } }} />
```

Set `limit.delta` to limit `movable` to a certain travel distance. It takes a `number` with unit of `%` or `px` in one or both axes, and can be set insolation or in combination with `limit.parent`.

<fieldset class="grid place-items-center border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <p class="text-center">
    Box below can be moved around, but only within a delta of <code>±100%</code> (of its own size).
  </p>
  <div class="p-20 border border-dashed border-error-bg">
    <DemoLimitDelta />
  </div>
</fieldset>

```svelte src=./_page/examples/limit-delta.svelte title=limit-delta.svelte
```

### Limit to Single Axis

```svelte title=limit-single-axis-syntax.svelte
<div use:movable={{ limit: { delta: { x: 0 } } }} />
<div use:movable={{ limit: { delta: { y: 0 } } }} />
```

Setting `limit.delta.x` or `limit.delta.y` to `0` effectively disables movement in that axis.

<fieldset class="grid place-items-center border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <p class="text-center">
    Box below can be moved around only in the x axis, combined with a delta limit of <code
      >±100%</code
    > (of its width).
  </p>
  <div class="px-20 my-20 border border-dashed border-error-bg">
    <DemoLimitSingleAxis />
  </div>
</fieldset>

```svelte src=./_page/examples/limit-single-axis.svelte title=limit-single-axis.svelte
```

## Custom Handle

<div class="c-callout c-callout--info">

Handle is an HTMLElement on which `movable` will listen for pointer events to initiate and map movement to the target node.

</div>

```svelte
<div use:movable={{ handle: someNode }} />
```

By default, the target node itself is the handle. To use a custom handle, set `handle` to the desired HTMLElement.

<fieldset class="not-prose grid place-items-center space-y-4 border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <p class="text-center">Move <span class="bg-info-bg text-info-fg px-2">blue</span> box by dragging the <span class="bg-warning-bg text-warning-fg px-2">yellow</span> box</p>
  <DemoHandle />
</fieldset>

```svelte src=./_page/examples/handle.svelte title=handle.svelte
```

<h2 id="ignore-children">Ignore Children Nodes from Triggering <code>movable</code> on Click</h2>

<div class="c-callout c-callout--warning">

Prefer `handle` in favor of `ignore` when possible for better predictability.

</div>

The `ignore` option takes one or more CSS selector strings and will prevent matching children of `handle` from triggering `movable`.

<fieldset class="not-prose grid place-items-center space-y-4 border-2 border-violet-500 p-4">
  <legend>Example</legend>
  <p class="text-center"><code>mousedown</code> on <span class="bg-error-bg text-error-fg px-2">red</span> box will not trigger movable</p>
  <DemoIgnore />
</fieldset>

```svelte src=./_page/examples/ignore.svelte title=ignore.svelte
```

## Disabling Cursor Handling

```svelte
<div use:movable={{ cursor: false }} />
```

By default, `movable` adds `cursor: grab` to `handle`, and `cursor: grabbing` on `mousedown` to both `handle` and `window.body`. This can be disabled by setting the `cursor` option to `false`.

<div class="c-callout c-callout--warning">

Automatic cursor handling is done on action initialization and update. It won't work for [ignored children][Ignore Children] that are dynamically added to DOM at runtime. In such cases, disable `cursor` or add cursor styles manually to the ignored children.

</div>

## Migration Guides

### V3 -> V4 (Svelte 5 in Runes mode)

When migrating from v3 to v4, you just need to update event attribute syntax to remove colon `:`:

```svelte
<!-- :::diff - -->
<div use:movable on:movablestart on:movableend></div>
<!-- ::: -->
<!-- :::diff + -->
<div use:movable onmovablestart onmovableend></div>
<!-- ::: -->
```

---

Happy moving node! 👨‍💻

[Quick Start]: #quick-start
[Ignore Children]: #ignore-children
[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent

