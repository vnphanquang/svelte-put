<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Getting Started',
	});
</script>

{markdown`
For content-heavy sites such as blogs or documentation, manually adding \`target="_blank"\`,
\`rel="noreferrer noopener"\` and relevant attributes to anchor tags that points to external domains
can be tedious. Sure you can wrap them in a component, but that would introduce additional
complexity and boilerplate. This package aims to automate this process, so that...

~~~svelte
<a href="https://some-external-site.com">Take me away</a>
~~~

...would become something like:

~~~svelte
<a href="https://some-external-site.com" target="_blank" rel="noreferrer noopener">Take me away</a>
~~~

## Installation

> [!CODEGROUP] \`#file-icon=false\`
>
> ~~~bash #title=npm
> npm install --save-dev @svelte-put/preprocess-external-link
> ~~~
>
> ~~~bash #title=pnpm
> pnpm add -D @svelte-put/preprocess-external-link
> ~~~
>
> ~~~bash #title=yarn
> yarn add -D @svelte-put/preprocess-external-link
> ~~~

## Setup

Given the following config...

~~~typescript #title="vite.config.ts"
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { externalLink } from '@svelte-put/preprocess-external-link'; // [!code ++]

export default defineConfig({
	plugins: [
		svelte(), // or import('@sveltejs/kit/vite').sveltekit
		externalLink(['your-domain.com', 'your-other-domain.com']), // [!code ++]
	],
});
~~~

...and the following source code...

~~~svelte
<script>
	let href = 'https://developer.mozilla.org';
</script>

<!-- links that are treated as internal -->
<a href="/internal-path">Internal Path</a>
<a href="https//your-domain.com/some-path">Internal Path</a>
<a href="https//your-other-domain.com/some-path">Internal Path</a>

<!-- links that are treated as external, implicitly -->
<a href="https://svelte.dev/">Svelte</a>

<!-- links that are treated as external, explicitly by specifying data-external -->
<a {href} data-external>Svelte</a>
~~~

...\`preprocess-external-link\` will generate the following intermediate **Svelte output**:

~~~svelte
<script>
	let href = 'https://developer.mozilla.org';
</script>

<!-- links that are treated as internal -->
<a href="/internal-path">Internal Path</a>
<a href="https//your-domain.com/some-path">Internal Path</a>
<a href="https//your-other-domain.com/some-path">Internal Path</a>

<!-- links that are treated as external, implicitly -->
<a href="https://svelte.dev/" target="_blank" rel="noreferrer noopener">Svelte</a>

<!-- links that are treated as external, explicitly by specifying data-external -->
<a {href} data-external target="_blank" rel="noreferrer noopener">Svelte</a>
~~~

## Limitations

The library is a [Svelte preprocessor] and only supports static \`href\`. In other words, the
following will not work:

~~~svelte
<script>
	let href = 'https://some-external-site.com';
</script>

<!-- will not be processed by the library  -->
<a {href}>Take me away</a>
<!-- [!code error] -->
~~~

In such cases, set \`data-external\` to explicitly mark the link as external.

~~~svelte
<a {href} data-external>Take me away</a> <!-- [!code word:data-external] -->
~~~

[Svelte preprocessor]: https://svelte.dev/docs/svelte-compiler#preprocess
`}
