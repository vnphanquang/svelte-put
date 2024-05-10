<script>
	import DemoQuickStart from './examples/quick-start.svelte';

	import { getSettingsContext } from '$lib/contexts/settings';
  const { packageManager } = getSettingsContext();
</script>

## Introduction

Existing solutions for inline SVGs in Svelte land often rely on component, which proves painful when it comes to styling and even handling. This package attempts to achieve a more minimal alternative using [Svelte action](https://svelte.dev/docs/svelte-action).

## Build Time Solution

This packages operates at **runtime**, meaning your prerendered HTML does not contain the complete SVG elements. To statically inline SVGs at **build time**, use [@svelte-put/preprocess-inline-svg](/docs/preprocess-inline-svg), which has similar interface but with additional setup step.

## Installation

<enhanced-code-block group display="tabs" bind:title={$packageManager}>

```bash
/// title=npm
npm install --save-dev @svelte-put/inline-svg
```

```bash
/// title=pnpm
pnpm add -D @svelte-put/inline-svg
```

```bash
/// title=yarn
yarn add -D @svelte-put/inline-svg
```

</enhanced-code-block>

## Quick Start

:::div flex items-start justify-between gap-10
The Svelte logo SVG on the right is dynamically fetched via network at **runtime** upon page load.  Notice in the source code below, only `width` (or `height`) needs to be specified. By default, `inlineSvg` will calculate the other dimension the keep the aspect ratio.

<DemoQuickStart />
:::

```svelte
/// src=./examples/quick-start.svelte
/// title=quick-start.svelte
```

:::div c-callout c-callout--warning
`inlineSvg` is typically used on `SVGElement` (i.e `<svg>`), for obvious reason.
:::

## Attributes and Inner HTML

Attributes provided to the `svg` element where `inlineSvg` is placed on will replace existed ones from the original SVG. On the contrary, its inner HTML will be replaced with that from the original SVG.

Take the following SVG as an example:

```html
/// title=https://example.com/original.svg
<svg viewBox="0 0 24 24" width="24" height="24" stroke-width="2">
  <!-- truncated original svg innerHTML -->
</svg>
```

And `inlineSvg` is used as follows:

```svelte
/// title=source.svelte
<svg use:inlineSvg={'https://example.com/original.svg'} height="16" stroke-width="1">
  <!-- some innerHTML -->
</svg>
```

The resulting SVG at runtime will be:

```html
/// title = Rendered HTML
<svg viewBox="0 0 24 24" width="16" height="16" stroke-width="1">
  <!-- truncated original svg innerHTML -->
</svg>
```

:::div c-callout c-callout--info c-callout--icon-megaphone
If you have a use case where it is useful to append/prepend the innerHTML of the original SVG rather than replacing it, please [raise an issue over at github](https://github.com/vnphanquang/svelte-put/issues). For now, let's keep things simple.
:::

## Customization

The `inlineSvg` action takes either a string for fetching remote SVG, or a config object with [the following interface](https://github.com/vnphanquang/svelte-put/blob/e65e4d4aed7be3f455977ae9fffb09f78d98695c/packages/inline-svg/src/public.d.ts).

```typescript
/// title=InlineSvgConfig
interface InlineSvgConfig {
	/** svg remote URI */
	src: string;
	/** cache policy for use in fetch from svg `src` */
	cache?: Request['cache'];
	/**
	 * automatically calculate dimensions from the available attributes
	 * of both the local SVG element (on which action is used) and the remote SVG
	 *
	 * For example, if you specify only `width` to the local SVG element, the
	 * height will automatically be calculated from the remote SVG
	 *
	 * For this to work, width & height must be "extractable" from the remote element,
	 * that is, the remote SVG must either have the `viewBox` or both `width` and `height` attributes that
	 * is in the same unit.
	 */
	autoDimensions?: boolean;
	/**
	 * optionally transform the SVG string fetched from remote source before inlining
	 */
	transform?: (svg: string) => string;
}
```

## Some Questions and Answers

Q: Why should I care about **runtime** vs **build time**?<br>
A: Javascript! **Runtime** [requires Javascript](https://www.kryogenix.org/code/browser/everyonehasjs.html). Without it, users will not see your SVG. On the other hand, **build time** does the work beforehand, so SVGs are already there in the initial HTML.

Q: When to use which?<br>
A: If you do not know in advance what SVGs to inline, or if your SVG is huge but only conditionally rendered: use `@svelte-put/inline-svg` at **runtime**. Otherwise, especially for static icons and pictograms, use [@svelte-put/preprocess-inline-svg](/docs/preproces-inline-svg) at **build time**.

Q: Do I really need this package?<br>
A: No! Use `<img>` when possible. My initial use case is to be able to change properties of the SVG, especially color. But that can potentially be done with [mask-image](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image). So consider your use case before adding another dependency.

---

Happy inlining SVGs! 👨‍💻
