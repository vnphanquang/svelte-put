<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Migration Guides',
	});
</script>

{markdown`
## Migrating to v2

Before v2, \`preprocess-auto-slug\` was exported as a Svelte preprocessor:

~~~javascript #title="svelte.config.js"
import externalLink from '@svelte-put/preprocess-external-link'; // [!code --]

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [externalLink()], // [!code --]
};

export default config;
~~~

Now, use it as a Vite plugin instead:

~~~typescript #title="vite.config.ts"
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { externalLink } from '@svelte-put/preprocess-external-link'; // [!code ++]

export default defineConfig({
	plugins: [
		svelte(), // or import('@sveltejs/kit/vite').sveltekit
		externalLink(), // [!code ++]
	],
});
~~~

The preprocessor, however, is still accessible at \`@svelte-put/preprocess-external-link/preprocessor\`.
See [Using Bare Svelte Preprocessor](../customisation#using-bare-svelte-preprocessor) for more
information.
`}
