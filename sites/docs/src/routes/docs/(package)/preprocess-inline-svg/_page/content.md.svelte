<script>
	import { getSettingsContext } from '$lib/contexts/settings';
  const { packageManager } = getSettingsContext();
</script>

## Deprecation Notice

In [Svelte 5](https://svelte-5-preview.vercel.app/status), this package is merged into [@svelte-put/inline-svg](https://svelte-put.vnphanquang.com/docs/inline-svg) for cohesiveness. If you are using Svelte 5 today, head over to [Migration Guides](https://svelte-put.vnphanquang.com/docs/preprocess-inline-svg) for more information.

## Introduction

Current solutions (that I know of) for inlining SVGs in Svelte land require either runtime logics or a component-oriented strategy. These solutions are acceptable in most cases but have been proven to be problematic when additional styling / attributes are needed for the inlined `SVGElement`.

This package tries to achieve **zero runtime footprint** with **no additional component**. The idea is to enable the following...

```svelte
<svg inline-src="google/info"></svg>
```

...which will automatically read from a source svg and inline it at build time. Additional styling and attributes can now be added idiomatically as with any other HTML element.

## Prior Art

- [svelte-inline-svg] runs at runtime as Svelte component.
- [vite-plugin-svelte-svg] runs at build time as Svelte component; svg can be processed with [svgo].
- [svg-to-svelte]: convert SVG files to svelte components.

## Runtime Solution

This package works best with static SVGs like icons and pictograms. For dynamic SVGs (i.e fetched from network), use [@svelte-put/inline-svg](/docs/inline-svg) - an action-based strategy with a similar API to that of this package.

```svelte
<svg use:inlineSvg={'https://example.com/icon.svg'}></svg>
```

## Installation

<enhanced-code-block group display="tabs" bind:title={$packageManager}>

```bash
/// title=npm
npm install --save-dev @svelte-put/preprocess-inline-svg@^2.0.0
```

```bash
/// title=pnpm
pnpm add -D @svelte-put/preprocess-inline-svg@^2.0.0
```

```bash
/// title=yarn
yarn add -D @svelte-put/preprocess-inline-svg@^2.0.0
```

</enhanced-code-block>

<h2 id="setup">Setup</h2>

`preprocess-inline-svg` is a [Svelte preprocessor]. There are two ways to use it:

- **Use the bare preprocessor**, which works in all setup, especially helpful when the order of preprocessors is important.
- **Use the Vite plugin**, which wraps Svelte preprocessor and provides additional Typescript support, but must be used, unsurprisingly, with Vite.

Given one of the following setup...

<enhanced-code-block group display="tabs">

```javascript
/// title=svelte.config.js (Svelte preprocessor)
import inlineSvg from '@svelte-put/preprocess-inline-svg';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    // input to `inlineSvg` can be either a single object or an array of such
    inlineSvg([
      {
        directories: 'src/assets/icons',
        attributes: {
          class: 'icon',
          width: '20',
          height: '20',
        },
      },
      {
        directories: 'src/assets/pictograms',
      },
    ]),
    // other preprocessors
  ],
};
export default config;
```

```typescript
/// title=vite.config.ts (Vite plugin)
import { inlineSvg } from '@svelte-put/preprocess-inline-svg/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    // make sure inlineSvg comes before `svelte` or `sveltekit` plugin
    inlineSvg(
      [
        {
          directories: 'src/assets/icons',
          attributes: {
            class: 'icon',
            width: '20',
            height: '20',
          },
        },
        {
          directories: 'src/assets/pictograms',
        },
      ],
      {
        inlineSrcAttributeName: 'inline-src',
      },
    ),
    sveltekit(),
  ],
});
```

</enhanced-code-block>

...and the asset files as follow...

```bash
/// title=Assets Directory Structure
src/assets
    |
    |-- icons
         |-- svelte.svg
         |
         |-- google
               |-- arrow-right.svg
         |-- simpleicons
               |-- github.svg
    |
    |-- pictograms
         |-- diagram.svg
```

...we can now do...

```svelte
/// title=Source code
<!-- this will have width="20" height="20" as specified in the config -->
<svg inline-src="svelte" />

<!-- nested -->
<svg inline-src="google/arrow-right.svg" />
<!-- .svg can be omitted -->
<svg inline-src="simpleicons/github" />

<!-- with custom attributes -->
<svg inline-src="diagram" width="100" height="100" />

<!-- alternatively, you can provide a per-case path that is relative to the current source file -->
<svg inline-src="./local-icon.svg" />

<!-- if the source svg is not found for any of the above, an error will be thrown -->
```

:::div c-callout c-callout--info
The `.svg` extension may be omitted from the path provided to `inline-src`.
:::

## Attributes and Inner HTML

Attributes provided to the `svg` element where `inline-src` is specified will replace existed ones from the original SVG. On the contrary, its inner HTML will be replaced with that from the original SVG.

Take the following SVG as an example:

```html
/// title=local-icon.svg
<svg viewBox="0 0 24 24" width="24" height="24" stroke-width="2">
  <!-- truncated original svg innerHTML -->
</svg>
```

And `inlineSvg` is used as follows:

```svelte
/// title=source.svelte
<svg inline-src="./local-icon.svg" height="16" stroke-width="1">
  <!-- some innerHTML -->
</svg>
```

The resulting SVG at runtime will be:

```html
/// title = Rendered HTML
<!-- :::highlight error -->
<svg viewBox="0 0 24 24" width="24" height="16" stroke-width="1">
<!-- ::: -->
  <!-- truncated original svg innerHTML -->
</svg>
```

:::div c-callout c-callout--error
Notice that the `width` attribute is not automatically calculated for you in the output above. Make sure to provide both dimensions. This behavior differs from `@svelte-put/inline-svg`, which automatically calculates the missing dimension to preserve aspect ratio. The rationale is that `preprocess-inline-svg` operates at build time with static SVGs, so it trusts your intention. If you think otherwise, feel free to [open a discussion](https://github.com/vnphanquang/svelte-put/discussions).
:::

If you have a use case where it is useful to append/prepend the innerHTML of the original SVG rather than replacing it, please [raise an issue over at github](https://github.com/vnphanquang/svelte-put/issues). For now, let's keep things simple.

## Typing the `inline-src` Attribute

:::div c-callout c-callout--warning
This feature is only available when the Vite plugin is used, see [Setup] for more information about Vite plugin vs Svelte preprocessor config.
:::

The `preprocess-inline-svg` Vite plugin provides automatic typing generation (enabled by default) for the `inline-src` attribute when multiple svg sources are configured. There are a couple of steps needed to get this working.

1. Set the `inlineSrcAttributeName` option to a non `data` attribute (this is because currently data attributes do not get intellisense with `svelte-check`, for some strange reason).

    ```typescript
    /// title=vite.config.ts
    import { inlineSvg } from '@svelte-put/preprocess-inline-svg/vite';
    import { defineConfig } from 'vite';

    export default defineConfig({
      plugins: [
        inlineSvg(
          [
            // ... sources as in Setup section
          ],
          // section parameter to `inlineSvg` is the config object
          // :::diff +
          {
            inlineSrcAttributeName: 'inline-src',
          },
          // :::
        ),
        // ...
      ],
    });
    ```

2. Set typing in an `additional-svelte-typing.d.ts` file, following [instruction here from the Svelte language-tools team](https://svelte.dev/docs/typescript#enhancing-built-in-dom-types)

    ```typescript
    /// title=src/additional-svelte-typing.d.ts
    declare module 'svelte/elements' {
      <!-- :::diff + -->
      export interface SVGAttributes {
        'inline-src'?: string;
      }
      <!-- ::: -->
    }

    export {};
    ```

The `inline-src` attribute should be strongly typed now. For example, with the assets as shown in [Setup], the typing should be:

```typescript
/// title=inline-src.d.ts
// import('@svelte-put/inline-svg/preprocess').Source
export type Source =
  | `./${string}`
  | `../${string}`
  | 'svelte'
  | 'google/arrow-right'
  | 'simpleicons/github'
  | 'diagram';
```

To disable this typing generation, set `sourceTypingGeneration` option to `false`.

## Limitations

`preprocess-inline-svg` only works in Svelte markup, i.e in the template part of Svelte files. The following will not work.

```svelte
/// title=source.svelte
<script>
  // :::highlight error
  let html = `<svg inline-src="path/icon"></svg>`;
  // :::
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html html}
```

`preprocess-inline-svg` does not support `inline-src` as a variable. The following will not work.

```svelte
/// title=Component.svelte
<script lang="ts">
  export let icon: string;
</script>

<!-- :::highlight error -->
<svg inline-src={icon} />
<!-- ::: -->
```

This is because it is difficult for the preprocessor to statically analyze a variable to determine its immutability at build time, i.e a variable is meant to be changed. In these case, some alternatives are:

- use `if-else` statements to switch between `inline-src` as literal strings, or
- use [@svelte-put/inline-svg](/docs/inline-svg) as a runtime action-based strategy.

If you have an idea for improvements, please [raise an issue over at github](https://github.com/vnphanquang/svelte-put/issues). Thanks!

## Customization

All options in the config object are optional. By default `preprocess-inline-svg` can be setup with no config at all, in which case SVG source paths are resolved relative to the Svelte source file `inline-src` is specified in.

:::div c-callout c-callout--warning
Note that path alias is not supported in `preprocess-inline-svg`! For example, `"$lib/src/assets/..."` will not work.
:::

Alternatively, the `directories` option can be specified (as seen in [Setup]) to conveniently omit the need for verbose pathnames.

### Source Config

The first parameter to `preprocess-inline-svg` can be either a single object, or an array of such (as seen in [Setup]), helpful for organizing SVG sources into different directories.

:::div c-callout c-callout--info
When source parameter is an array of config objects, the following applies: there can be only one config object without the `directories` option, taken as the default config and will be used for all SVG sources not covered by other config objects. If multiple config objects without `directories` are provided, an error will be thrown during build. If none is provided, the internal default config is used.
:::

During build, each SVG source will then be searched top down in the config until a match is found, or else an error will be thrown. Local SVG (local to current Svelte source file) always has the highest priority and will use the **default config** as described above.

---

Below is the type signature for preprocessor.

```typescript
/// title=InlineSvgConfig
/**
 * sources for the inline svg
 */
export type SourceConfig = {
	/**
	 * directories relative to which the svg source path will be resolved
	 */
	directories?: string[] | string;
	/**
	 * default attributes to add to the svg element, will override the attributes from the svg source,
	 * but be overridden by the attributes from the element itself (in svelte source)
	 */
	attributes?: Record<string, string>;
};

/**
 * global options for configuring behaviors of the inline-svg preprocessor
 */
export type InlineSvgConfig = {
	/** attribute to get the svg source from, default to `data-inline-src` */
	inlineSrcAttributeName?: string;
	/** whether to keep the inline src attribute after build, default to `false` */
	keepInlineSrcAttribute?: boolean;
};

export type inlineSvg = (
  sources?: SourceConfig | SourceConfig[],
  config?: InlineSvgConfig
) => import('svelte/types/compiler/preprocess').PreprocessorGroup
```

## Future Work

This package is kept minimal as it has served its purpose for all my need. If you find that this package lacks certain feature that is essential to your use cases, please [file an issue](https://github.com/vnphanquang/svelte-put/issues). Thank you!

Some possibilities:

- Support for [svgo]?
- Support for fetching remote SVG from `inline-src` at build time?

---

Happy inlining SVGs! 👨‍💻

[svelte-inline-svg]: https://github.com/robinscholz/svelte-inline-svg
[vite-plugin-svelte-svg]: https://github.com/metafy-gg/vite-plugin-svelte-svg
[svgo]: https://github.com/svg/svgo
[svg-to-svelte]: https://github.com/metonym/svg-to-svelte
[Svelte preprocessor]: https://svelte.dev/docs/svelte-compiler#preprocess
[Setup]: #setup

