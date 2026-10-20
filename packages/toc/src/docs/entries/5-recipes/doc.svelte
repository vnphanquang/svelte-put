<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Recipes',
	});
</script>

{markdown`
## Collecting Compile-time TOC with Vite's Glob Import

Consider a **static** documentation site where each unique page live at \`entries/<slug>/doc.svelte\`.
We intend to use \`@svelte-put/toc\` to index these files to build out a Table-of-Contents for each page.

Let's first set up the Vite plugin:

~~~typescript #typehint #title="vite.config.ts"
import { toc } from '@svelte-put/toc/vite'; // [!code ++]
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		// [!code ++:8]
		toc({
			include: /doc.svelte$/,
			preprocessor: {
				compileToc: {
					autoDeclare: true,
				},
			},
		}),
	],
});
~~~

Notice the [.preprocesor.compileToc.autoDeclare](../compile-time#automatic-declaration) option is
turned on, which means at compile-time, for each \`doc.svelte\` module, the following is added
automatically:

~~~typescript #title="**/doc.svelte"
<script module>
	import { compileToc } from '@svelte-put/toc';
	export const toc = compileToc();
</script>
~~~

Next, use Vite's [glob import](https://vite.dev/guide/features#glob-import) to statically collect
these \`toc\` data:

~~~typescript #typehint #title="collect.ts"
/// <reference types="vite/client" />
// ---cut---
import type { CompileTimeToc } from '@svelte-put/toc';

const compileTimeTocModules = import.meta.glob<CompileTimeToc>('./entries/**/doc.svelte', {
	import: 'toc',
});

export async function loadCompileTimeTocBySlug(slug: string): Promise<CompileTimeToc | null> {
	const path = \`./entries/\${slug}/doc.svelte\`;
	const mod = compileTimeTocModules[path];
	if (!mod) return null;
	return await mod();
}
~~~

Depending on your setup, you can now load the compile-time data into a Toc instance:

~~~svelte #title="src/routes/[...slug]/+page.svelte" src="fs:./includes/examples/collect-usage.svelte"

~~~
`}
