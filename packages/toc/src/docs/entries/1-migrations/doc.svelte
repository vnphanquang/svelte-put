<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Migration Guides',
	});
</script>

{markdown`
## Migrating to v7

Version 7 is a complete re-imagine of the library, keeping the "headless" motivation in mind, but
strive to:

1. reduce as much runtime overhead as possible,
2. utilise platform baseline when possible,
3. reduce manual setup as much as possible.

As such, while I tried to keep as much backward compatibility as possible, there have been a lot of
breaking changes. My apologies!

### Svelte Action -> Attachment

Previously, runtime enhancements relied on [Svelte action]. In version 7, [Svelte attachment] - a
newer semantic - has been employed for a smoother experience. Spread \`...toc.enhance\` instead
of \`use:toc.actions\`:

~~~svelte src="fs:./includes/examples/v7-action-to-attachment.svelte"

~~~

With the new [compile-time] strategy, the \`enhance.\` API supports some SSR enhancements too.

### Custom Events -> Callback Parameters

Previously, event listeners can be added for \`tocinit\` and \`tocchange\` on \`root\`:

~~~svelte
<main use:toc.actions.root ontocinit={handleTocInit} ontocchange={handleTocChange}> <!-- [!code --] -->
~~~

As we are moving away from [Svelte action], however, these custom events can now handled via
callbacks to the enhance attachment:

~~~svelte
<main {...toc.enhance.root({ onInit, onChange })}> <!-- [!code ++] -->
~~~

### Mandatory Link Text Content

Previously, text content of the link text was set dynamically on mount within the action. In hindsight,
this is magic that, albeit documented, should not be used in the first place. It must now be set
explicitly, i.e.

~~~svelte $class=" no-line-number"
<a {...toc.enhance.link(item)}>
{...item.text}  <!-- [!code ++] -->
</a>
~~~

This explicit requirement also plays very well with the new [compile-time strategy][compile-time],
making the markup readily available without the need for hydration:

~~~svelte src="fs:./includes/examples/v7-combined-strategies.svelte"

~~~

> [!SUCCESS]
> The new compile-time strategy populates the Table-of-Contents data by searching through the Svelte
> AST during compilation. It takes a few extra steps to set up, however, so make sure to check out
> [its documentation][compile-time] for more information.

### @svelte-put/preprocess-auto-slug

It was recommended before to use [@svelte-put/preprocess-auto-slug](https://svelte-put.vnphanquang.com/packages/preprocess-auto-slug) in conjunction with this library to set up heading slug automatically.
\`@svelte-put/preprocess-auto-slug\` has been merged into the [compile-time Vite plugin][compile-time]
for a unified experience. Remove it from your config...

~~~javascript #title="svelte.config.js"
import autoSlug from '@svelte-put/preprocess-auto-slug'; // [!code --]

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [autoSlug()], // [!code --]
};

export default config;
~~~

...and set up \`@svelte-put/toc/vite\` instead:

~~~typescript #title="vite.config.ts" src="fs:../4-compile-time/includes/examples/vite-config.ts"

~~~

### Default matching tags

In version 7, \`h1\` has been dropped from the default matching tags. The default is now: \`['h2', 'h3', 'h4', 'h5', 'h6']\`.

Also, \`tags\` is now a nested option under \`index\`:

### Default Anchor Position

In version 7, the default for \`anchor.position\` option has been changed to a new \`'content'\`
strategy, which wraps all content of the matching tag. For example:

~~~svelte
<h2>A heading to Index</h2>
<!-- [!code --] -->
<!-- [!code ++:3] -->
<h2 id="a-heading-to-index" data-toc-index>
	<a data-toc-anchor="content">A heading to Index</a>
</h2>
~~~

In my experience, this has been the best strategy for UX so far.

### \`TocInit\` is not \`TocOptions\`

## Migrating to v6 (Svelte 5 in Runes mode)

The [Svelte-store-based][Svelte store] \`TocStore\` interface has been dropped in favor for the new
\`Toc\` class, which is now powered by Svelte runes, providing a much more minimal and powerful API.
Whereas \`TocStore\` was optional, creating a \`Toc\` instance is now a **required** step:

- start by replacing \`createTocStore\` with \`new Toc()\`,
- move the parameters passed to previously \`toc\` action to now \`Toc\` \`new\` call,
- use the actions \`toc.actions.root\` and \`toc.actions.link\` instead of \`toc\` and \`toc-link\`, and
- change references to \`$tocStore\` to \`toc\`.

~~~svelte src="fs:./includes/examples/v6-store-to-rune.svelte"

~~~

## An Overhaul of Data-Attributes

## Migrating to v5

From version 5, the \`items\` property of \`TocStore\` and \`TocInitEventDetail\` is now a [Map]
instead of plain object as in version 4. This enables better performance and properly preserves the
order of collected toc elements.

[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

~~~svelte src="fs:./includes/examples/v5-object-to-map.svelte"

~~~

[compile-time]: ../compile-time
[Svelte store]: https://svelte.dev/docs/svelte-store
[Svelte action]: https://svelte.dev/docs/svelte-action
[Svelte attachment]: https://svelte.dev/docs/svelte/svelte-attachments
`}
