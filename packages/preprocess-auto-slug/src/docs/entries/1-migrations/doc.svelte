<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Migrations',
	});
</script>

{markdown`
## Migrating to v3

Before v3, \`preprocess-auto-slug\` was exported as a direct Svelte preprocessor:

~~~javascript #title="svelte.config.js"
import autoSlug from '@svelte-put/preprocess-auto-slug'; // [!code --]

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [autoSlug()], // [!code --]
};

export default config;
~~~

Now, use it as a vite plugin instead:

~~~typescript #title="vite.config.ts"
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { autoSlug } from '@svelte-put/preprocess-auto-slug'; // [!code ++]

export default defineConfig({
	plugins: [
		autoSlug(), // [!code ++]
		svelte(), // or import('@sveltejs/kit/vite').sveltekit
	],
});
~~~
`}
