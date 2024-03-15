<script>
  import ImgAction from './examples/img-action.svelte';
  import ImgComponentWithDefaultSlot from './examples/img-component-with-custom-default-slot.svelte';
  import ImgComponent from './examples/img-component.svelte';
  import SvgAction from './examples/svg-action.svelte';
  import SvgComponentWithDefaultSlot from './examples/svg-component-with-custom-default-slot.svelte';
  import SvgComponent from './examples/svg-component.svelte';

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

:::div c-callout c-callout--info
Note the imports from subpackage `@svelte-put/qr/svg` in the examples below.
:::

<enhanced-code-block group display="tabs" bind:current={svgVariant}>

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

## Image

:::div grid gap-8 grid-cols-1 sm:grid-cols-[2fr,1fr]

:::div flex-1

`@svelte-put/qr` also allows rendering QR as `img`. The available strategies are similar to those found in the previous section.

- **action**: quick and minimal, only rendered at **runtime** in browser,
- **component**: useful for SSR and prerendering,
- **component with custom default slot**: useful if you need to use component and have access to `HTMLImageElement`.

Underneath, the rendered image is just an inline base64 encoding of an svg.

:::

{#if imgVariant === 'action'}
  <ImgAction />
{:else if imgVariant === 'component'}
  <ImgComponent />
{:else}
  <ImgComponentWithDefaultSlot />
{/if}

:::

:::div c-callout c-callout--info
Note the imports from subpackage `@svelte-put/qr/img` in the examples below.
:::

<enhanced-code-block group display="tabs" bind:current={imgVariant}>

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

## Configuration

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
  /** fill for the outer ring of each anchor (big positioning square at the corner) */
  anchorOuterFill?: string;
  /** fill for the inner square of each anchor */
  anchorInnerFill?: string;
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

[CustomEvent]: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
