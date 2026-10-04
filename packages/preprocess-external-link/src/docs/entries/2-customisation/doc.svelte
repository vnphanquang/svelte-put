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
and available options. Code snippets in the following sections support type hints, if a pointer device
is available, hover to see more information.

## Internal Hosts

Set one or more hosts that are canonical or considered internal. Non-relative links that do not match
these hosts are marked as external by the processor. By default, \`localhost\` is always included,
so you don't have to add it.

~~~typescript #typehint
import { externalLink } from '@svelte-put/preprocess-external-link';

externalLink({
	preprocessor: {
		hosts: ['localhost'],
	},
});
~~~

If you aren't providing any other option, the argument to \`externalLink\` can be shorten to just
the host array:

~~~typescript #typehint
import { externalLink } from '@svelte-put/preprocess-external-link';

externalLink(['localhost']);
~~~

## Attributes

The attributes to be set on external links. Note that when provided, attributes, e.g. \`rel\`, will
replace the default, not merged. Below shows the default:

~~~typescript #typehint
import { externalLink } from '@svelte-put/preprocess-external-link';

externalLink({
	preprocessor: {
		attributes: { target: '_blank', rel: 'noopener noreferrer' },
	},
});
~~~

## Explicit External Marker

As mentioned in [Limitations](..#limitations), a link can be explicitly marked as
external, helpful in scenarios where \`href\` is not static.

~~~svelte
<a href={someVariable} data-external>an external link</a> <!-- [!code word:data-external] -->
~~~

This marker can be customised. Below shows the default:

~~~typescript #typehint
import { externalLink } from '@svelte-put/preprocess-external-link';

externalLink({
	preprocessor: {
		markerAttribute: 'data-external',
	},
});
~~~

## Using Bare Svelte Preprocessor

Usage with Vite plugin as shown in [Getting Started > Setup](../getting-started#setup) is
recommended for a unified experience. If your setup doesn't allow Vite, however, you may import the
preprocessor directly from \`@svelte-put/preprocess-external-link/preprocessor\`:

~~~javascript #title="svelte.config.js"
import { autoSlug } from '@svelte-put/preprocess-external-link/preprocessor'; // [!code ++]

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: [
		externalLink(/** truncated config */), // [!code ++]
		// other preprocessors
	],
};
~~~

[bare]: #using-bare-svelte-preprocessor
`}
