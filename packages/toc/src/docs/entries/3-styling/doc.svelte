<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Styling',
	});
</script>

{markdown`
\`@svelte-put/toc\` comes with a stylesheet to help you reduce manual setup:

~~~javascript
import '@svelte-put/toc/styles.css';
~~~

You can also use
[CSS @import](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@import). This can
be helpful to interop the library into your design system, for example:

~~~css
@import './my-markdown-base.styling' layer(markdown);
@import '@svelte-put/toc/styles.css' layer(markdown); /* [!code info] */
~~~

## Fine-Grained Bundle

You can also pick what feature to load:

~~~javascript
// importing '@svelte-put/toc/styles.css' is equivalent to:
import '@svelte-put/toc/styles/anchor.css';
import '@svelte-put/toc/styles/track.css';
~~~

For example, if you omit [Anchor Tag Insertion][anchor], you can skip \`anchor.css\`. Similarly,
if you omit [Visibility Tracking][tracking], skip \`track.css\`. If you skip both, don't import
anything.

## Customisation & Debug

Each feature-scoped stylesheet may provide quick customisation via CSS variables, or a separate
on-demand debug stylesheet. Make sure to check out specific documentation pages for more information.

[tracking]: ../toc/tracking
[anchor]: ../toc/anchor
`}
