<script>
	import { SettingsContext } from '$lib/settings/context.svelte';
  import Demo from './_page/examples/demo.svelte';

  const settings = SettingsContext.get();
</script>

## Installation

<enhanced-code-block group display="tabs" bind:title={settings.packageManager}>

```bash title=npm
npm install --save-dev @svelte-put/swipeable
```

```bash title=pnpm
pnpm add -D @svelte-put/swipeable
```

```bash title=yarn
yarn add -D @svelte-put/swipeable
```

</enhanced-code-block>

## Quick Start

```svelte title="Quick Start"
<script lang="ts">
	import { swipeable, type SwipeEndEventDetail } from '@svelte-put/swipeable';

	function swipeend(e: CustomEvent<SwipeEndEventDetail>) {
		const { passThreshold, direction } = e.detail;
		if (passThreshold) {
      // do something based on the swipe direction
    }
	}
</script>

<!-- listen for swipe left and swipe right -->
<div use:swipeable style:left="var(--swipe-distance-x)">...</div>
```

## Demo

The following example demonstrates a practical use case for `swipeable` to implement swipe-to-delete or swipe-to-archive, often seen in notification center or email apps.

<fieldset class="border-2 border-violet-500 p-4">
<legend>Example</legend>
<div class="not-prose contents">
<Demo />
</div>
</fieldset>

```svelte src=./_page/examples/demo.svelte title=demo.svelte
```

## Events

`swipeable` fires `swipestart` when a swipe action in one of the allowed directions is detected (pointermove), and `swipeend` when the swipe action is completed (pointerup).

```typescript title="SwipeableAttributes.d.ts"
interface SwipeStartEventDetail {
	/** direction of this swipe action */
	direction: SwipeSingleDirection;
	/** travel distance of this swipe action in px */
	distance: number;
}
interface SwipeEndEventDetail extends SwipeStartEventDetail {
	/** whether the swipe action passes the threshold, or is a flick */
	passThreshold: boolean;
}

interface SwipeableAttributes {
	onswipestart?: (event: CustomEvent<SwipeStartEventDetail>) => void;
	onswipeend?: (event: CustomEvent<SwipeEndEventDetail>) => void;
}
```

<div class="c-callout c-callout--info">

**Multiple `swipestart` events**

A `swipestart` event might be fired again if user changes the swipe direction during the swipe action. In [Demo], try swiping to left and then change to right midway. Observe that the background color and icon are updated accordingly.

</div>

## Configuration

`swipeable` takes an optional parameter with the following interface. Details of each property are explained in next sections.

```typescript title="SwipeableParameter.d.ts"
type SwipeableParameter = SwipeableConfig['direction'] | SwipeableConfig | undefined;

interface SwipeableConfig {
	direction?: SwipeDirection | SwipeDirection[];
	threshold?: SwipeThreshold;
	customPropertyPrefix?: string | null;
	followThrough?: SwipeFollowThrough | boolean;
	allowFlick?: boolean | ((ms: number, px: number) => boolean);
	enabled?: boolean;
}
```

### Direction

`SwipeableConfig` accepts an optional `direction` property that takes one or an array of directions for `swipeable` to register at runtime. Supported values are:

```typescript title="SwipeDirection.d.ts"
type SwipeSingleDirection = 'up' | 'down' | 'left' | 'right';
type SwipeMultiDirection = 'x' | 'y' | 'all';
type SwipeDirection = SwipeSingleDirection | SwipeMultiDirection;
```

The default is `['left', 'right']`. Although it is possible to allow `swpieable` to listen to all directions, it is recommended to constraint to either horizontal or vertical directions to avoid janky behavior.

### Threshold

`SwipeableConfig`accepts an optional `threshold` property that sets up the distance to trigger the `swipeend` event. The value is a string that takes a number followed by a unit (`px`, `rem`, `%`).

```typescript title="SwipeThreshold.d.ts"
type SwipeThresholdUnit = 'px' | 'rem' | '%';
type SwipeThreshold = `${number}${SwipeThresholdUnit}`;
```

The default is `30%`. Note that percentage is relative to the element size in the travel direction (i.e height for vertical swipe, and width for horizontal swipe).

### CSS Custom Property

`SwipeableConfig` accepts an optional `customPropertyPrefix` property that sets up the CSS custom property to track the swipe travel distance. Typically you would use this property to shift the element's position following the swipe movement for visual feedback (so that user knows that their swipe is being registered).

```svelte
<div use:swipeable style:left="var(--swipe-distance-x)"></div>
```

<div class="c-callout c-callout--info">

`swipeable` tracks displacement via a custom property instead of setting the element's `style` directly to avoid interfering with user-defined styles, allowing more flexibility.

</div>


The default is `--swipe`, i.e `--swipe-distance-x` for horizontal swipe, and `--swipe-distance-y` for vertical swipe. Set to `null` to disable tracking.

### Follow Through

`SwipeableConfig` accepts an optional `followThrough` property that instructs `swipeable` how to behave when swipe reaches the threshold, either:

- `true` (default): "follow through" in the swipe direction, then fire `swipeend` event (as seen in [Demo]). That is, upon `pointerup`, the [CSS Custom Property] will be tweened to element's width / height, or
- `false`: stop swipe action immediately and fire `swipeend` event.

`followThrough` takes either a boolean or a config object with the following interface.

```typescript title="SwipeFollowThrough.d.ts"
type SwipeFollowThrough = boolean | {
	/** duration for the follow through animation */
	duration?: number;
	/** easing function for the follow through animation */
	easing?: (t: number) => number;
}
```

### Flick

It is typical to expect a quick swipe with high velocity — a so-called "flick" — to bypass the threshold and be recognized as a complete swipe action (try this in [Demo]). This can be configured via the `SwipeableConfig.allowFlick`.

```typescript title="SwipeableConfig.allowFlick"
interface SwipeableConfig {
  // ... truncated ...
  allowFlick?: boolean | ((ms: number, px: number) => boolean);
}
```

For complex configuration, you can provide a function that takes the duration in milliseconds and the distance in pixels, and returns a boolean to indicate whether the swipe should be considered a flick. The default is:

```typescript title="default flick check"
// is flick if the duration is less than 170ms and the velocity is greater than 1px/ms
const DEFAULT_FLICK_CHECK = (ms, px) => ms < 170 && Math.abs(px / ms) > 1;
```

---

Happy swiping!

[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
[Demo]: #demo
[CSS Custom Property]: #css-custom-property

