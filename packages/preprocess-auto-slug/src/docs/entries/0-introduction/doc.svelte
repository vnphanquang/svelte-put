<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Getting Started',
	});
</script>

{markdown`
This package is heavily inspired by [rehype-slug] and [rehype-autolink-headings]. If you are already using a markdown preprocessor such as [MDsveX] with some other \`rehype\` plugins, \`rehype-slug\` and \`rehype-autolink-headings\` should already work well.

\`preprocess-auto-slug\` operates at **build time** and does the following:

> [!STEPLIST]
>
> 1. search for matching elements (heading elements by default),
> 2. generate \`id\` attributes from element content,
> 3. add anchor tag to element.

## Installation

> [!CODEGROUP] \`#file-icon=false\`
>
> ~~~bash #title=npm
> npm install --save-dev @svelte-put/preprocess-auto-slug
> ~~~
>
> ~~~bash #title=pnpm
> pnpm add -D @svelte-put/preprocess-auto-slug
> ~~~
>
> ~~~bash #title=yarn
> yarn add -D @svelte-put/preprocess-auto-slug
> ~~~

## Setup

Given the following config...

~~~typescript #title="vite.config.ts"
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { autoSlug } from '@svelte-put/preprocess-auto-slug';

export default defineConfig({
	plugins: [
		autoSlug(),
		svelte(), // or import('@sveltejs/kit/vite').sveltekit
	],
});
~~~

...and the following source code...

~~~svelte #title="+page.svelte"
<h2>Quick start</h2>
~~~

...\`preprocess-auto-slug\` will transform to an intermediate Svelte as follow:

~~~svelte #title="+page.svelte"
<h2 id="quick-start">
	<a href="#quick-start" aria-hidden="true" tabindex="-1">#</a>
	Quick Start
</h2>
~~~

---

![@nofigure,class="mx-0"@ from The Legend of Zelda, with text "Don't click on any suspicious links"](./includes/suspicious-links.webp?w=300)

Happy slugging!

[rehype-slug]: https://github.com/rehypejs/rehype-slug
[rehype-autolink-headings]: https://github.com/rehypejs/rehype-autolink-headings
[MDsveX]: https://github.com/pngwn/MDsveX
[@svelte-put/toc]: /docs/toc
`}
