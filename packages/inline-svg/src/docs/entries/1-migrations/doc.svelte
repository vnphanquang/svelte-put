<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Migration Guides',
	});
</script>

{markdown`
## Migrating to v4

If you are coming \`@svelte-put/preprocess-inline-svg\`, simply update the import path of the
preprocessor in your \`svelte.config.js\`:

~~~javascript #title=svelte.config.js
import inlineSvg from '@svelte-put/preprocess-inline-svg'; // [!code --]
import inlineSvg from '@svelte-put/inline-svg/preprocessor'; // [!code ++]

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		inlineSvg(/** truncated config */),
		// other preprocessors
	],
};
export default config;
~~~

It is recommended, however, to use the Vite plugin instead. See [Compile Time - Static SVGs - Vite Plugin](../compile-time).
`}
