<script>
  import { SettingsContext } from '$lib/settings/context.svelte';

  const settings = SettingsContext.get();
</script>

## Rationale

For content-heavy sites such as blogs or documentation, manually adding `target="_blank"`,`rel="noreferrer noopener"` and relevant attributes to anchor tags that points to external domains can be tedious. Sure you can wrap them in a component, but that would introduce additional complexity and boilerplate. This package aims to automate this process, so that...

```svelte
<a href="https://some-external-site.com">Take me away</a>
```

...would become something like:

```svelte
<a href="https://some-external-site.com" target="_blank" rel="noreferrer noopener">Take me away</a>
```

## Installation

<enhanced-code-block group display="tabs" bind:title={settings.packageManager}>

```bash title=npm
npm install --save-dev @svelte-put/preprocess-external-link
```

```bash title=pnpm
pnpm add -D @svelte-put/preprocess-external-link
```

```bash title=yarn
yarn add -D @svelte-put/preprocess-external-link
```

</enhanced-code-block>

## Setup

Given the following config...

```javascript title=svelte.config.js
// :::highlight
import externalLink from '@svelte-put/preprocess-external-link';
// :::

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // :::highlight
  preprocess: [externalLink(['your-domain.com', 'your-other-domain.com'])],
  // :::
};

export default config;
```

...and the following source code...

```svelte title=input.svelte
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
```

...`preprocess-external-link` will generate the following **Svelte output**:

```svelte title=output.svelte
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
```

## Customization

The `preprocessor` accepts either an array of strings as the external hosts, or a config object with the following interface:

```typescript title=ExternalLinkConfig
interface ExternalLinkConfig {
  /**
   * a list of hosts that, if href does NOT match, will be marked as external.
   * `localhost` is already included
   */
  hosts: string;
  /**
   * a function that returns true if the file should be processed.
   * By defaults it will matches
   */
  files?: (filename?: string) => boolean;
  /**
   * a boolean attribute that explicitly marks the anchor tag as external to be processed.
   * Defaults to `'data-external'`
   */
  markerAttribute?: string;
  /**
   * attributes to add to the anchor tag.
   * Defaults to `{ target: '_blank', rel: 'noopener noreferrer' }`
   */
  attributes?: Record<string, string>;
}
```

---

Happy linking! 👨‍💻

