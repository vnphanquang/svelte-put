<script>
  import { SettingsContext } from '$lib/contexts/settings.svelte';

  import ImgAction from './_page/examples/img-action.svelte';
  import ImgComponentWithSnippet from './_page/examples/img-component-with-snippet.svelte';
  import ImgComponent from './_page/examples/img-component.svelte';
  import ImgBackgroundFill from './_page/examples/img-background-fill.svelte';
  import ImgHeadless from './_page/examples/img-headless.svelte';
  import SvgAction from './_page/examples/svg-action.svelte';
  import SvgComponentWithSnippet from './_page/examples/svg-component-with-snippet.svelte';
  import SvgComponent from './_page/examples/svg-component.svelte';
  import SvgHeadless from './_page/examples/svg-headless.svelte';

  const settings = SettingsContext.get();

  let svgVariant = 'action';
  let imgVariant = 'action';
</script>

## Installation

<enhanced-code-block group display="tabs" bind:title={settings.packageManager}>

```bash title=npm
npm install --save-dev @svelte-put/qr
```

```bash title=pnpm
pnpm add -D @svelte-put/qr
```

```bash title=yarn
yarn add -D @svelte-put/qr
```

</enhanced-code-block>

<div class="c-callout c-callout--success c-callout--megaphone">

  New to Svelte 5? See [Migration Guides](#migration-guides).

</div>

## Kudos

This package is made possible by [qrcode-generator](https://www.npmjs.com/package/qrcode-generator) and heavily inspired by [bitjson/qr-code](https://github.com/bitjson/qr-code). Please check out their work for more information.

## SVG

<div class="grid gap-8 grid-cols-1 sm:grid-cols-[2fr,1fr]">

<div class="flex-1">

`@svelte-put/qr` allows rendering QR as `svg`. Depending on the scenario, you may find certain strategy more convenient than others.

- **action**: quick and minimal, enough if you do not care about server side rendering (SSR) or prerendering, and is especially helpful if you need access to the `SVGElement` (for styling or event handling),
- **component**: good if you prefer having component abstraction, also applicable to SSR and prerendering. However, you lose direct access to the `SVGElement`,
- **component with custom default slot**: good if you want a component and also need access to the `SVGElement`.

</div>

<div>

{#if svgVariant === 'action'}
<SvgAction />
{:else if svgVariant === 'component'}
<SvgComponent />
{:else}
<SvgComponentWithSnippet />
{/if}

</div>

</div>

<enhanced-code-block group display="tabs" bind:title={svgVariant}>

```svelte src=./_page/examples/svg-action.svelte title=action
```

```svelte src=./_page/examples/svg-component.svelte title=component
```

```svelte src=./_page/examples/svg-component-with-snippet.svelte title="default slot"
```

</enhanced-code-block>

<div class="c-callout c-callout--info">

Note the imports from subpackage `@svelte-put/qr/svg` in the _page/examples above.

</div>

### SVG Headless Helpers

<div class="grid gap-8 grid-cols-1 sm:grid-cols-[1fr,auto]">

<div class="flex-1">

`@svelte-put/qr` exports two top-level helpers, `createQrSvgString` and `createQrSvgDataUrl`, that allow you to create QR code programmatically as string or [Base64 SVG Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs), respectively. The aforementioned helpers works in both browser and server.

</div>

<div class="not-prose">
<SvgHeadless />
</div>

</div>

```svelte src=./_page/examples/svg-headless.svelte title=SVG Headless Helpers
```

## Image

<div class="grid gap-8 grid-cols-1 sm:grid-cols-[2fr,1fr]">

<div class="flex-1">

`@svelte-put/qr` also allows rendering QR as `img`. The available strategies are similar to those found in the previous section.

- **action**: quick and minimal, only rendered at **runtime** in browser,
- **component**: useful for SSR and prerendering,
- **component with custom default slot**: useful if you need to use component and have access to `HTMLImageElement`.

</div>

{#if imgVariant === 'action'}
  <ImgAction />
{:else if imgVariant === 'component'}
  <ImgComponent />
{:else}
  <ImgComponentWithSnippet />
{/if}

</div>

<div class="c-callout c-callout--success c-callout--icon-confetti">

Since **v1.2.0**, `@svelte-put/qr` renders a base64 PNG image for `img` in the browser using the [Canvas API]. On the server (i.e during prerendering and SSR), however, it will render a base64 SVG instead, since canvas is not available there.

The rendered PNG has the default size of 1000x1000, it is recommended that you specify `width` and `height` explicitly.

</div>

<enhanced-code-block group display="tabs" bind:title={imgVariant}>

```svelte src=./_page/examples/img-action.svelte title=action
```

```svelte src=./_page/examples/img-component.svelte title=component
```

```svelte src=./_page/examples/img-component-with-snippet.svelte title="default slot"
```

</enhanced-code-block>

<div class="c-callout c-callout--info">

Note the imports from subpackage `@svelte-put/qr/img` in the _page/examples above.

</div>

### Background Fill

<div class="grid gap-8 grid-cols-1 sm:grid-cols-[1fr,auto]">

<div class="flex-1">

In addition to `moduleFill`, `anchorOuterFill`, and `anchorInnerFill`, listed in [Common Configuration], `img` strategies accept a `backgroundFill` option to specify the background of the QR code.

</div>

<ImgBackgroundFill />

</div>

```svelte src=./_page/examples/img-background-fill.svelte title="the backgroundFill option"
```

### PNG Headless Helper

<div class="grid gap-8 grid-cols-1 sm:grid-cols-[1fr,auto]">

<div class="flex-1">

In case you want to create a [base64 PNG data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs) QR code programmatically, `@svelte-put/qr` exports a top-level helper named `createQrPngDataUrl` for your convenience. This is helpful, for example, if you want to generate a downloadable link.

</div>

<div class="not-prose">
<ImgHeadless />
</div>

</div>

```svelte src=./_page/examples/img-headless.svelte title="PNG Headless Helper"
```

<div class="c-callout c-callout--warning">

Note that `createQrPngDataUrl` requires the [Canvas API] and only works in browser.

</div>

## Common Configuration

Rendering strategies exported by `@svelte-put/qr/*`, whether it's `svg` or `img`, component or action, all share the following configuration interface.

```typescript title=QRConfig
/**
 * instructions to render a QR
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

All rendering strategies share a `qrinit` [CustomEvent] that fires when the rendering is completed. Its `event.detail` is the element itself (`SVGElement` or `HTMLImageElement`).

`@svelte-put/qr/img/QR.svelte` might also fire another [CustomEvent] named `qrlogofetch`, the `event.detail` of which is the base64 encoded logo. This only happens if you specify the `logo` prop / option as `/http*./`, which has to be fetched manually to be compatible for conversion to base64 svg.

```svelte title=events.svelte
<script lang="ts">
  import { qr as imgQR } from '@svelte-put/qr/img';
  import ImgQR from '@svelte-put/qr/img/QR.svelte';
  import { qr as svgQR } from '@svelte-put/qr/svg';
  import SvgQR from '@svelte-put/qr/svg/QR.svelte';

  const data = 'https://svelte-put.vnphanquang.com';
</script>

<svg use:svgQR={{ data }} onqrinit={(e) => console.log(e.detail /** SVGElement */)} />

<SvgQR {data} onqrinit={(e) => console.log(e.detail /** SVGElement */)} />

<img use:imgQR={{ data }} onqrinit={(e) => console.log(e.detail /** ImgElement */)} alt="qr" />

<ImgQR
  {data}
  onqrinit={(e) => console.log(e.detail /** ImgElement */)}
  onqrlogofetch={(e) => console.log(e.detail /** string, the logo as base64 */)}
/>
```

## Migration Guides

### V1 -> V2 (Svelte 5 in Runes mode)

When migrating to V2, you will need to update event directives to standard attribute (remove `:`)

```svelte title="Event directive -> attribute"
<!-- :::diff - -->
<svg use:svgQR on:qr:init>
<img use:imgQR on:qr:init>
<!-- ::: -->
<!-- :::diff + -->
<svg use:svgQR onqrinit>
<img use:imgQR onqrinit>
<!-- ::: -->

<!-- :::diff - -->
<SvgQR on:qr:init>
<!-- ::: -->
<!-- :::diff + -->
<SvgQR onqrinit>
<!-- ::: -->

<!-- :::diff - -->
<ImgQR on:qr:init on:qr:logofetch>
<!-- ::: -->
<!-- :::diff + -->
<ImgQR onqrinit onqrlogofetch>
<!-- ::: -->
```

Default `slot` for svg and img components are deprecated in favor for the `svg` and `img` Svelte snippets, respectively:

<enhanced-code-block group display="tabs">

```svelte title=SVG
<script>
  import QR from '@svelte-put/qr/svg/QR.svelte';
</script>

<QR
  data="https://svelte.dev"
  logo="https://raw.githubusercontent.com/sveltejs/branding/master/svelte-logo.svg"
  logoRatio={107 / 128}
  shape="square"
	anchorInnerFill="tomato"
	anchorOuterFill="tomato"
	moduleFill="tomato"
	margin={4}
  <!-- :::diff - -->
  let:attributes
  let:innerHTML
  <!-- ::: -->
>
  <!-- :::diff + -->
  {#snippet svg({ attributes, html })}
  <!-- ::: -->
    <svg {...attributes} color="gray">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html innerHTML}
    </svg>
  <!-- :::diff + -->
  {/snippet}
  <!-- ::: -->
</QR>
```

```svelte title="IMG"
<script>
  import QR from '@svelte-put/qr/img/QR.svelte';
</script>

<QR
  data="https://svelte.dev"
  logo="https://raw.githubusercontent.com/sveltejs/branding/master/svelte-logo.svg"
  logoRatio={107 / 128}
  shape="square"
	anchorInnerFill="tomato"
	anchorOuterFill="tomato"
	moduleFill="tomato"
	margin={4}
	width="500"
	height="500"
  <!-- :::diff - -->
  let:src
  <!-- ::: -->
>
  <!-- :::diff + -->
  {#snippet img({ src })}
  <!-- ::: -->
    <img {src} alt="qr" />
  <!-- :::diff + -->
  {/snippet}
  <!-- ::: -->
</QR>
```

</enhanced-code-block>

---

Happy making QR! 👨‍💻

[Common Configuration]: #common-configuration

[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
[Canvas API]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
