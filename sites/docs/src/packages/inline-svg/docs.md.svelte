<script>
  import { SettingsContext } from '$lib/settings/context.svelte';

  import DemoAction from './_page/examples/action.svelte';

  const settings = SettingsContext.get();
</script>

## Introduction

Existing solutions for inline SVGs in Svelte land often rely on component, which proves painful when it comes to custom styling or event handling. This package attempts to achieve a more minimal alternative using [Svelte action] (runtime) and [Svelte preprocessor] (compile time).

<div class="c-callout c-callout--success c-callout--megaphone">

  `@svelte-put/preprocessor-inline-svg` has been merged into version 4 of `@svelte-put/inline-svg` for a single coherent package. See [Migration Guides](#migration-guides) if you previously used Svelte preprocessor for compile time solution.

</div>

## Installation

<enhanced-code-block group display="tabs" bind:title={settings.packageManager}>

```bash title=npm
npm install --save-dev @svelte-put/inline-svg
```

```bash title=pnpm
pnpm add -D @svelte-put/inline-svg
```

```bash title=yarn
yarn add -D @svelte-put/inline-svg
```

</enhanced-code-block>

<h2 id="runtime">Runtime - Dynamic SVGs - Svelte Action</h2>

This strategy is useful when:

- you don't know in advance what SVGs to inline until runtime (after app/site is loaded or data is fetched in browser), or
- if your SVG is large in size and only conditionally rendered.

For static icons and pictograms, consider the [compile-time strategy][compile-time] instead.

### Quick Start

<div class="flex items-center justify-between gap-10">

The Svelte logo SVG on the right is dynamically fetched via network at **runtime** upon page load.  Notice in the source code below, only `width` (or `height`) needs to be specified. By default, `inlineSvg` will calculate the other dimension the keep the aspect ratio.

<DemoAction />

</div>

```svelte src=./_page/examples/action.svelte title="inlineSvg action"
```

<div class="c-callout c-callout--warning">

`inlineSvg` only works if used on `<svg>` for obvious reason.

</div>

<h3 id="action-attributes-and-innerhtml">Attributes and Inner HTML</h3>

Attributes provided to the `svg` element where `inlineSvg` is placed on will replace existed ones from the original SVG. On the contrary, its inner HTML will be completely replaced.

Take the following SVG as an example:

```html title=https://example.com/original.svg
<svg viewBox="0 0 24 24" width="24" height="24" stroke-width="2">
  <!-- truncated original svg innerHTML -->
</svg>
```

And `inlineSvg` is used as follows:

```svelte title=source.svelte
<svg use:inlineSvg={'https://example.com/original.svg'} height="16" stroke-width="1">
  <!-- some innerHTML -->
</svg>
```

The resulting SVG at runtime will be:

```html title = rendered.html
<svg viewBox="0 0 24 24" width="16" height="16" stroke-width="1">
  <!-- truncated original svg innerHTML -->
</svg>
```

<div class="c-callout c-callout--info c-callout--icon-bulb">

If you have a use case where it is useful to append/prepend the innerHTML of the original SVG rather than replacing it, please [raise an issue over at github](https://github.com/vnphanquang/svelte-put/issues). For now, let's keep things simple.

</div>

<h3 id="action-customization">Customization</h3>

The `inlineSvg` action takes either a string as the remote SVG url, or a config object with the following interface:

```typescript title=InlineSvgActionConfig
/** verbose config for `inlineSvg` action */
export interface InlineSvgActionConfig {
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
  /** optionally transform the SVG string fetched from remote source before inlining */
  transform?: (svg: string) => string;
}
```

<h2 id="compile-time">Compile Time - Static SVGs - Svelte Preprocessor</h2>

This strategy is useful for SVGs that live in your repo as static assets. It only runs at compile time by [Svelte preprocessor] (via Vite plugin) during development, and therefore has **zero runtime footprint**. The idea is to enable the following...

```svelte
<svg inline-src="google/info"> <!-- innerHTML inlined at compile time --> </svg>
```

...which allows additional styling and attributes to be added idiomatically as with any other HTML element. This is different from current solutions that I know of for inlining SVGs in Svelte land, which require either runtime logics or a component-oriented strategy.

Alternatively, for dynamic SVGs that are fetched at runtime, consider using the [runtime strategy][runtime] instead.

<p class="c-callout c-callout--info">
  This library makes no implication that you should or should not use SVG to render icons. For some cases, it
  is helpful to do so, especially in conjunction with customizable color scheme. For others, different
  strategies such as icon font or CSS-only icons (see Icons in <a href="https://antfu.me/posts/icons-in-pure-css">Pure CSS by Anthony Fu</a>)
  might have more benefits.
</p>

### Setup

Given the following `vite.config.js` and filesystem...

<enhanced-code-block group display="files">

```javascript title=vite.config.js
import path from 'path';
// :::diff +
import { inlineSvg } from '@svelte-put/inline-svg/vite';
// :::

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    // :::diff +
    inlineSvg([
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
    ]),
    // :::
    sveltekit(),
  ],
};
export default config;
```

```bash title=Filesystem
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

</enhanced-code-block>

...we can now do...

```svelte title=source.svelte
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

<h3 id="preprocessor-attributes-and-innerhtml">Attributes and Inner HTML</h3>

Attributes provided to the `svg` element where inline src attribute (`inline-src` by default) is specified will replace existed ones from the original SVG. On the contrary, its inner HTML will be completely replaced.

Take the following SVG as an example:

```html title=local-icon.svg
<svg viewBox="0 0 24 24" width="24" height="24" stroke-width="2">
  <!-- truncated original svg innerHTML -->
</svg>
```

And `inlineSvg` is used as follows:

```svelte title=source.svelte
<svg inline-src="./local-icon.svg" height="16" stroke-width="1">
  <!-- some innerHTML -->
</svg>
```

The resulting SVG at runtime will be:

```html title=rendered.html
<!-- :::highlight warning -->
<svg viewBox="0 0 24 24" width="24" height="16" stroke-width="1">
<!-- ::: -->
  <!-- truncated original svg innerHTML -->
</svg>
```

<div class="c-callout c-callout--warning">

Notice that the `width` attribute is not automatically calculated for you in the output above. Make sure to provide both dimensions. This behavior differs from the [runtime strategy](#action-attributes-and-innerhtml), which automatically calculates the missing dimension to preserve aspect ratio. The rationale is that preprocessor operates at compile time with static SVGs, so it trusts your intention. If you think otherwise, feel free to [open a discussion](https://github.com/vnphanquang/svelte-put/discussions).

</div>

If you have a use case where it is useful to append/prepend the `innerHTML` of the original SVG rather than replacing it, please [raise an issue over at Github](https://github.com/vnphanquang/svelte-put/issues). For now, let's keep things simple.

<h3 id="preprocessor-customization">Customization</h3>

By default the Vite plugin / Svelte preprocessor can be setup with no config at all, in which case SVG source paths are resolved relative to the Svelte source file the inline src attribute (`inline-src` as default) is specified in.

```typescript title=inlineSvg
export function inlineSvg(
 uSources?: PreprocessorSourceDefinition | PreprocessorSourceDefinition[],
 uConfig?: PreprocessorConfig,
): import('svelte/compiler').PreprocessorGroup | import('vite').Plugin;
```

<div class="c-callout c-callout--warning">

Note that path alias is not supported! For example, `"$lib/src/assets/..."` will not work.

</div>

#### Source Definitions

The first parameter to Vite plugin / Svelte preprocessor can be either a single object, or an array of such (as seen in [Setup](#setup)), helpful for organizing SVG sources into different directories.

```typescript title=PreprocessorSourceDefinition
/** sources for the inline svg */
export type PreprocessorSourceDefinition = {
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
```

<div class="c-callout c-callout--info">

When source parameter is an array of config objects, the following applies: there can be only one config object without the `directories` option, taken as the default config and will be used for all SVG sources not covered by other config objects (all relative SVG paths). If multiple config objects without `directories` are provided, an error will be thrown during development. If none is provided, the internal default config is used.

</div>

During build, each SVG source will then be searched top down in the config until a match is found, or else an error will be thrown. Relative SVGs (relative to current Svelte source file) always has the highest priority and will use the **default config** as described above.

#### Preprocessor Options

The second parameter to the Vite plugin / Svelte preprocessor provides customization to the processor itself. Their corresponding interfaces are as follow:

```typescript title="PreprocessorConfig & VitePluginConfig"
/** global options for configuring behaviors of the inline-svg preprocessor */
export type PreprocessorConfig = {
  /** attribute to get the svg source from, default to `inline-src` */
  inlineSrcAttributeName?: string;
  /** whether to keep the inline src attribute after compilation, default to `false` */
  keepInlineSrcAttribute?: boolean;
};

/** configuration for the vite plugin that wraps inline-svg preprocessor */
export type VitePluginConfig = PreprocessorConfig & {
  /**
   * output path for generated type definition for inline src attribute.
   * Defaults to `null` (no generation).
   * Set to `true` to use the default `src/preprocess-inline-svg.d.ts` path.
   */
  typedef?: string | null | true;
};
```

### Typescript Support

Specify `typedef` option to let Vite plugin automatically generate type definition for the inline src attribute. This is useful to enable type checking and auto-completion in your editor.

<enhanced-code-block group display="files">

```javascript title=vite.config.js
import path from 'path';
import { inlineSvg } from '@svelte-put/inline-svg/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    inlineSvg([
      [/** truncated source config as in Setup */],
      // :::focus
      // :::diff +
      { typedef: true },
      // :::
      // :::
    ]),
    sveltekit(),
  ],
};
export default config;
```

```typescript title=src/preprocess-inline-svg.d.ts
/** DO NOT EDIT! This file is generated by @svelte-put/inline-svg vite plugin */
declare module 'svelte/elements' {
	export interface SVGAttributes {
		'inline-src'?:
			`./${string}`
			| `../${string}`
			| 'svelte'
			| 'google/arrow-right'
			| 'simpleicons/github'
			| 'diagram';
	}
}
export {};
```

```bash title=Filesystem
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

</enhanced-code-block>

As mentioned in [Preprocessor Options](#preprocessor-options), when `typedef` set to `true`, the vite plugin will write the type definition to `src/preprocess-inline-svg.d.ts` by default. You can specify a custom path if needed.

<div class="c-callout c-callout--warning">

Avoid setting `inlineSrcAttributeName` to `data-*` in this case since it would be "swallowed" by the [broader typedef from svelte/elements](https://github.com/sveltejs/svelte/blob/396ea2ef370e7ea5b5d4571c4e5e14384bac3ca6/packages/svelte/elements.d.ts#L843).

</div>

### Using Bare Svelte Preprocessor

The wrapper Vite plugin adds some improvements to developer experience by watching the specified directories from your [source config](#source-definitions) and triggering page reload when there is addition/removal/change to them. It also provide optional [typedef generation](#typescript-support) as seen in previous section.

If your setup doesn't allow Vite, however, you can do so by importing the preprocessor directly from `@svelte-put/inline-svg/preprocessor`.

```javascript title=svelte.config.js
// :::focus
import inlineSvg from '@svelte-put/inline-svg/preprocessor';
// :::

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    // :::focus
    inlineSvg(/** truncated config */),
    // :::
    // other preprocessors
  ],
};
export default config;
```

### Limitations

The `inlineSvg` preprocessor only works in Svelte markup, i.e in the template part of Svelte files. The following will not work:

```svelte title=source.svelte
<script>
  // :::highlight error
  let html = `<svg inline-src="path/icon"></svg>`;
  // :::
</script>

{@html html}
```

Similarly, the preprocessor does not support inline src attribute as a variable. The following will not work:

```svelte title=Component.svelte
<script>
  const icon = 'path/icon';
</script>

<!-- :::highlight error -->
<svg inline-src={icon} />
<!-- ::: -->
```

This is because it is difficult for the preprocessor to statically analyze a variable to determine its immutability at compile time, i.e a variable is meant to be changed. In these case, some alternatives are:

- use `if-else` statements to render different svg element with static inline src attribute as literal string, or
- use the [runtime strategy][runtime] to dynamically inline SVGs in browser.

If you have an idea for improvements, please [raise an issue over at github](https://github.com/vnphanquang/svelte-put/issues). Thanks!

## Frequently Asked Questions

Q: Why should I care about **runtime** vs **build time**?<br>
A: Javascript! **Runtime** [requires Javascript](https://www.kryogenix.org/code/browser/everyonehasjs.html). Without it, users will not see your SVG. On the other hand, **build time** does the work beforehand, so SVGs are already there in the initial HTML.

Q: When to use which?<br>
A: If you do not know in advance what SVGs to inline, or if your SVG is huge but only conditionally rendered: use Svelte action [runtime strategy][runtime]. Otherwise, especially for static icons and pictograms, use Svelte preprocessor [compile-time strategy][compile-time].

Q: Do I really need this package?<br>
A: No! Use `<img>` when possible. My initial use case is to be able to change properties of the SVG, especially color. But that can potentially be done with [mask-image](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image). So consider your use case before adding another dependency.

## Migration Guides

### From Preprocessor

If you are coming `@svelte-put/preprocess-inline-svg`, simply update the import path of the preprocessor in your `svelte.config.js`:

```javascript title=svelte.config.js
// :::diff -
import inlineSvg from '@svelte-put/preprocess-inline-svg';
// :::
// :::diff +
import inlineSvg from '@svelte-put/inline-svg/preprocessor';
// :::

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    inlineSvg(/** truncated config */),
    // other preprocessors
  ],
};
export default config;
```

Additionally, consider switching to the Vite plugin wrapper and enabling `typedef` option, if your setup allows it, for better developer experience. For more information, see [Using Bare Svelte Preprocessor](#using-bare-svelte-preprocessor).

<enhanced-code-block group display="tabs" bind:title={settings.packageManager}>

```javascript title=vite.config.js
import path from 'path';
// :::diff +
import { inlineSvg } from '@svelte-put/inline-svg/vite';
// :::

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    // :::diff +
    inlineSvg([/** truncated source setup */], {
      // :::focus
      typedef: true,
      // :::
    }),
    // :::
    sveltekit(),
  ],
};
export default config;
```

```javascript title=svelte.config.js
// :::diff -
import inlineSvg from '@svelte-put/inline-svg/preprocessor';
// :::

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    // :::diff -
    inlineSvg(/** truncated config */),
    // :::
    // other preprocessors
  ],
};
export default config;
```

</enhanced-code-block>

## Prior Art

- [svelte-inline-svg] runs at runtime as Svelte component.
- [vite-plugin-svelte-svg] runs at build time as Svelte component; svg can be processed with [svgo].
- [svg-to-svelte]: convert SVG files to svelte components.

---

Happy inlining SVGs! 👨‍💻

[Svelte action]: https://svelte.dev/docs/svelte-action
[Svelte preprocessor]: https://svelte.dev/docs/svelte-compiler#preprocess
[runtime]: #runtime
[compile-time]: #compile-time

[svelte-inline-svg]: https://github.com/robinscholz/svelte-inline-svg
[vite-plugin-svelte-svg]: https://github.com/metafy-gg/vite-plugin-svelte-svg
[svg-to-svelte]: https://github.com/metonym/svg-to-svelte
[svgo]: https://github.com/svg/svgo
