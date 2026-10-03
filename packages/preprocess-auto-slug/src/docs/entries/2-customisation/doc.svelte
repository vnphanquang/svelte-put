<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Customisation',
	});
</script>

{markdown`
If you are using the Vite plugin, processing options can be specified at \`.preprocessor.*\`:

~~~typescript $class=" no-line-number" #typehint
import { autoSlug } from '@svelte-put/preprocess-auto-slug';
autoSlug({ preprocessor: {/* options */} });
~~~

...whereas if you are [using the bare svelte preprocessor][bare], the same options are available
at the top level:

~~~typescript $class=" no-line-number" #typehint
import { autoSlug } from '@svelte-put/preprocess-auto-slug/preprocessor';
autoSlug({/* options */});
~~~

When possible, utilise language server during development to get the most up-to-date documentation
and available options. Code snippets in the following secionts support type hints, if a pointer device
is available, hover to see more information.

## Matching Tags

The processing can be filtered based on element tags. The default is shown below:

~~~typescript #typehint
import { autoSlug } from '@svelte-put/preprocess-auto-slug';

autoSlug({
	preprocessor: {
		tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
	},
});
~~~

## ID Attribute and Slug Resolution

When a tag is matched, the processor will look for the attribute whose name specified in
\`.preprocssor.attributeName\`. If present, that will be taken as the slug. Otherwise, a slug will
be generated based on the text content. The default options are shown below:

~~~typescript #typehint
import { autoSlug } from '@svelte-put/preprocess-auto-slug';

autoSlug({
	preprocessor: {
		attributeName: 'id',
		slug: ({ generated, nodeText, slugger }) => generated,
	},
});
~~~

## Anchor Options

Customisation to how anchor tag is inserted can be provided via the \`.preprocessor.anchor\` option
(or just \`.anchor\` if you are [using the bare svelte preprocessor][bare]). The default options are
shown below:

~~~typescript #typehint
import { autoSlug } from '@svelte-put/preprocess-auto-slug';

autoSlug({
	preprocessor: {
		anchor: {
			enabled: true,
			position: 'prepend',
			content: '#',
			properties: {
				'aria-hidden': 'true',
				tabindex: '-1',
			},
			href: (slug) => \`#\${slug}\`,
		},
	},
});
~~~

## Using Bare Svelte Preprocessor

Usage with Vite plugin as shown in [Getting Started > Setup](../getting-started#setup) is
recommended for a unified experience. If your setup doesn't allow Vite, however, you may import the
preprocessor directly from \`@svelte-put/preprocess-auto-slug/preprocessor\`:

~~~javascript #title="svelte.config.js"
import { autoSlug } from '@svelte-put/preprocess-auto-slug/preprocessor'; // [!code ++]

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: [
		autoSlug(/** truncated config */), // [!code ++]
		// other preprocessors
	],
};
~~~

[bare]: #using-bare-svelte-preprocessor
`}
