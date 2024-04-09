<script>
  import ImgAction from './examples/img-action.svelte';
  import ImgComponentWithDefaultSlot from './examples/img-component-with-custom-default-slot.svelte';
  import ImgComponent from './examples/img-component.svelte';
  import ImgBackgroundFill from './examples/img-background-fill.svelte';
  import ImgHeadless from './examples/img-headless.svelte';
  import SvgAction from './examples/svg-action.svelte';
  import SvgComponentWithDefaultSlot from './examples/svg-component-with-custom-default-slot.svelte';
  import SvgComponent from './examples/svg-component.svelte';
  import SvgHeadless from './examples/svg-headless.svelte';

	import { getSettingsContext } from '$lib/contexts/settings';
  const { packageManager } = getSettingsContext();

  let svgVariant = 'action';
  let imgVariant = 'action';
</script>

## Installation

<enhanced-code-block group display="tabs" bind:title={$packageManager}>

```bash
/// title=npm
npm install --save-dev @svelte-put/qr
```

```bash
/// title=pnpm
pnpm add -D @svelte-put/qr
```

```bash
/// title=yarn
yarn add -D @svelte-put/qr
```

</enhanced-code-block>

## Kudos

This package is made possible by [qrcode-generator](https://www.npmjs.com/package/qrcode-generator) and heavily inspired by [bitjson/qr-code](https://github.com/bitjson/qr-code). Please check out their work for more information.

## SVG

:::div grid gap-8 grid-cols-1 sm:grid-cols-[2fr,1fr]

:::div flex-1

`@svelte-put/qr` allows rendering QR as `svg`. Depending on the scenario, you may find certain strategy more convenient than others.

- **action**: quick and minimal, enough if you do not care about server side rendering (SSR) or prerendering, and is especially helpful if you need access to the `SVGElement` (for styling or event handling),
- **component**: good if you prefer having component abstraction, also applicable to SSR and prerendering. However, you lose direct access to the `SVGElement`,
- **component with custom default slot**: good if you want a component and also need access to the `SVGElement`.

:::

{#if svgVariant === 'action'}
  <SvgAction />
{:else if svgVariant === 'component'}
  <SvgComponent />
{:else}
  <SvgComponentWithDefaultSlot />
{/if}

:::

<enhanced-code-block group display="tabs" bind:title={svgVariant}>

```svelte
/// src=./examples/svg-action.svelte
/// title=action
```

```svelte
/// src=./examples/svg-component.svelte
/// title=component
```

```svelte
/// src=./examples/svg-component-with-custom-default-slot.svelte
/// title=default slot
```

</enhanced-code-block>

:::div c-callout c-callout--info
Note the imports from subpackage `@svelte-put/qr/svg` in the examples above.
:::

### SVG Headless Helpers

:::div grid gap-8 grid-cols-1 sm:grid-cols-[1fr,auto]

:::div flex-1

`@svelte-put/qr` exports two top-level helpers, `createQrSvgString` and `createQrSvgDataUrl`, that allow you to create QR code programmatically as string or [Base64 SVG Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs), respectively. The aforementioned helpers works in both browser and server.

:::

:::div not-prose
  <SvgHeadless />
:::

:::

```svelte
/// src=./examples/svg-headless.svelte
/// title=SVG Headless Helpers
```

## Image

:::div grid gap-8 grid-cols-1 sm:grid-cols-[2fr,1fr]

:::div flex-1

`@svelte-put/qr` also allows rendering QR as `img`. The available strategies are similar to those found in the previous section.

- **action**: quick and minimal, only rendered at **runtime** in browser,
- **component**: useful for SSR and prerendering,
- **component with custom default slot**: useful if you need to use component and have access to `HTMLImageElement`.

:::

{#if imgVariant === 'action'}
  <ImgAction />
{:else if imgVariant === 'component'}
  <ImgComponent />
{:else}
  <ImgComponentWithDefaultSlot />
{/if}

:::

:::div c-callout c-callout--success c-callout--icon-confetti
Since **v1.2.0**, `@svelte-put/qr` renders a base64 PNG image for `img` in the browser using the [Canvas API]. On the server (i.e during prerendering and SSR), however, it will render a base64 SVG instead, since canvas is not available there.

The rendered PNG has the default size of 1000x1000, it is recommended that you specify `width` and `height` explicitly.
:::

<enhanced-code-block group display="tabs" bind:title={imgVariant}>

```svelte
/// src=./examples/img-action.svelte
/// title=action
```

```svelte
/// src=./examples/img-component.svelte
/// title=component
```

```svelte
/// src=./examples/img-component-with-custom-default-slot.svelte
/// title=default slot
```

</enhanced-code-block>

:::div c-callout c-callout--info
Note the imports from subpackage `@svelte-put/qr/img` in the examples above.
:::

### Background Fill

:::div grid gap-8 grid-cols-1 sm:grid-cols-[1fr,auto]

:::div flex-1

In addition to `moduleFill`, `anchorOuterFill`, and `anchorInnerFill`, listed in [Common Configuration], `img` strategies accept a `backgroundFill` option to specify the background of the QR code.

:::

<ImgBackgroundFill />

:::

```svelte
/// src=./examples/img-background-fill.svelte
/// title=the `backgroundFill` option
```

### PNG Headless Helper

:::div grid gap-8 grid-cols-1 sm:grid-cols-[1fr,auto]

:::div flex-1

In case you want to create a [base64 PNG data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs) QR code programmatically, `@svelte-put/qr` exports a top-level helper named `createQrPngDataUrl` for your convenience. This is helpful, for example, if you want to generate a downloadable link.

:::

:::div not-prose
  <ImgHeadless />
:::

:::

```svelte
/// src=./examples/img-headless.svelte
/// title=PNG Headless Helper
```

:::div c-callout c-callout--warning
Note that `createQrPngDataUrl` requires the [Canvas API] and only works in browser.
:::

## Common Configuration

Rendering strategies exported by `@svelte-put/qr/*`, whether it's `svg` or `img`, component or action, all share the following configuration interface.

```typescript
/// title=QRConfig
/**
 * instructions to render a QR
 * @public
 */
export type QRConfig = {
	/** the data to encode in QR, typically an URL */
	data: string;
	/**
	 * the quite zone along the edges of QR
	 */
	margin?: number;
	/**
	 * determine what shape to render the elements
	 *
	 * - `square` (default): each module or anchor is a sharp-edged square
	 * - `circle`: each module is a circle, each anchor is a round-edged square
	 */
	shape?: 'square' | 'circle';
	/**
	 * logo to render in the middle of QR
	 */
	logo?: string;
	/** width : height */
	logoRatio?: number;

	/* styling */
	/** fill for each module */
	moduleFill?: string;
	/** fill for the outer ring of each anchor (big positioning square at the corners) */
	anchorOuterFill?: string;
	/** fill for the inner square of each anchor */
	anchorInnerFill?: string;
	/**
	 * Type number (1 ~ 40), or 0 for auto detection,
	 * passed as parameter to {@link https://github.com/kazuhikoarase/qrcode-generator | qrcode-generator},
   * default to 0,
	 */
	typeNumber?: Parameters<typeof QR>[0];
	/**
	 * Error correction level ('L', 'M', 'Q', 'H'),
	 * passed as parameter to {@link https://github.com/kazuhikoarase/qrcode-generator | qrcode-generator},
   * default to H,
	 */
	errorCorrectionLevel?: Parameters<typeof QR>[1];
};
```

## Events

All rendering strategies share a `qr:init` [CustomEvent] that fires when the rendering is completed. Its `event.detail` is the element itself (`SVGElement` or `HTMLImageElement`).

`@svelte-put/qr/img/QR.svelte` might also fire another [CustomEvent] named `qr:logofetch`, the `event.detail` of which is the base64 encoded logo. This only happens if you specify the `logo` prop / option as `/http*./`, which has to be fetched manually to be compatible for conversion to base64 svg.

```svelte
/// title=events.svelte
<script lang="ts">
  import { qr as imgQR } from '@svelte-put/qr/img';
  import ImgQR from '@svelte-put/qr/img/QR.svelte';
  import { qr as svgQR } from '@svelte-put/qr/svg';
  import SvgQR from '@svelte-put/qr/svg/QR.svelte';

  const data = 'https://svelte-put.vnphanquang.com';
</script>

<svg use:svgQR={{ data }} on:qr:init={(e) => console.log(e.detail /** SVGElement */)} />

<SvgQR {data} on:qr:init={(e) => console.log(e.detail /** SVGElement */)} />

<img use:imgQR={{ data }} on:qr:init={(e) => console.log(e.detail /** ImgElement */)} alt="qr" />

<ImgQR
  {data}
  on:qr:init={(e) => console.log(e.detail /** ImgElement */)}
  on:qr:logofetch={(e) => console.log(e.detail /** string, the logo as base64 */)}
/>
```

---

Happy making QR! 👨‍💻

[Common Configuration]: #common-configuration

[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
[Canvas API]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
