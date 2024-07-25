<script>
  import { SettingsContext } from '$lib/contexts/settings.svelte';

  const settings = SettingsContext.get();
</script>

<br>

<div class="c-callout c-callout--success c-callout--icon-megaphone">

`@svelte-put/preprocess-inline-svg` is merged into [@svelte-put/inline-svg](/docs/inline-svg) V4 for a more cohesive package.

</div>

## Migration to `@svelte-put/inline-svg`

Make sure you have version 4 of `@svelte-put/inline-svg` installed:

<enhanced-code-block group display="tabs" bind:title={settings.packageManager}>

```bash title=npm
npm install --save-dev @svelte-put/inline-svg@next
```

```bash title=pnpm
pnpm add -D @svelte-put/inline-svg@next
```

```bash title=yarn
yarn add -D @svelte-put/inline-svg@next
```

</enhanced-code-block>

Simply update the import path of the preprocessor in your `svelte.config.js`:

```javascript title=svelte.config.js
// :::diff -
import inlineSvg from '@svelte-put/preprocess-inline-svg';
// :::
// :::diff +
import inlineSvg from '@svelte-put/inline-svg/preprocessor';
// :::

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    inlineSvg(/** truncated config */),
    // other preprocessors
  ],
};
export default config;
```

<div class="c-callout c-callout--info c-callout--icon-bulb">

Consider switching to the new Vite plugin that wraps the `preprocess-inline-svg` preprocessor, which provide some improvements to developer experience. See more at [@svelte-put/inline-svg](/docs/inline-svg#from-preprocessor).

</div>

---

Happy migrating 😅

