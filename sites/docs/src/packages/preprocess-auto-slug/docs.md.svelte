<script>
  import { SettingsContext } from '$lib/settings/context.svelte';
  import { ConnectedList, ConnectedListItem } from '$lib/components/connected-list';

  import suspiciousLinkImage from './_page/images/suspicious-links.webp';

  const settings = SettingsContext.get();
</script>

## Introduction

This package is heavily inspired by [rehype-slug] and [rehype-autolink-headings]. If you are already using a markdown preprocessor such as [MDsveX] with some other `rehype` plugins, `rehype-slug` and `rehype-autolink-headings` should already work well.

`preprocess-auto-slug` operates at **build time** and does the following:

 <ConnectedList>
  <ConnectedListItem>
    <p>search for matching elements (heading elements by default),</p>
  </ConnectedListItem>
  <ConnectedListItem>
    <p>generate <code>id</code> attributes from element content,</p>
  </ConnectedListItem>
  <ConnectedListItem>
    <p>add anchor tag to element.</p>
  </ConnectedListItem>
</ConnectedList>

`preprocess-auto-slug` alone is not that interesting. When paired with [@svelte-put/toc] (**runtime** logics), however, they provide a minimal and efficient solution for generating table of contents.

## Installation

<enhanced-code-block group display="tabs" bind:title={settings.packageManager}>

```bash title=npm
npm install --save-dev @svelte-put/preprocess-auto-slug
```

```bash title=pnpm
pnpm add -D @svelte-put/preprocess-auto-slug
```

```bash title=yarn
yarn add -D @svelte-put/preprocess-auto-slug
```

</enhanced-code-block>

## Setup

Given the following config...

```javascript title=svelte.config.js
import autoSlug from '@svelte-put/preprocess-auto-slug';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [autoSlug()],
};

export default config;
```

...and the following source code...

```svelte
<h2>Quick start</h2>
```

...`preprocess-auto-slug` will generate the following HTML:

```html title=output.html
<h2 id="quick-start">
  <a href="#quick-start" aria-hidden="true" tabindex="-1">#</a>
  Quick Start
</h2>
```

## Customization

Almost every aspect of `preprocess-auto-slug` can be customized, including which tags to process, how `id` and `href` are generated, or the placement of the anchor tag. To avoid being verbose, utilize language server during development or see the [type definitions here](https://github.com/vnphanquang/svelte-put/blob/06d92e97bc078fd7a60ef86f33cd9447cf44a937/packages/preprocess-auto-slug/src/types.d.ts) for more details.

<div class="c-callout c-callout--info">

This documentation site uses this very package. Most `id` and link tag for headings are auto-generated during build. See [svelte.config.js](https://github.com/vnphanquang/svelte-put/blob/06d92e97bc078fd7a60ef86f33cd9447cf44a937/sites/docs/svelte.config.js#L23-L33) as an example for a more complex use case.

</div>

## Limitation

`preprocess-auto-slug` will generate duplicated `id` for matching nodes rendered inside `each` block. In such cases it is recommended to manually specify `id` for the node.

<enhanced-code-block group display="files">

```svelte title=input.svelte
{#each new Array(2) as _, index}
  <h2 id="section-heading-{index}">Section Heading {index}</h2>
{/each}
```

```html title=output.html
<h2 id="section-heading-0">
  <a href="#section-heading-0" aria-hidden="true" tabindex="-1">#</a>
  Section Heading 0
</h2>
<h2 id="section-heading-1">
  <a href="#section-heading-1" aria-hidden="true" tabindex="-1">#</a>
  Section Heading 1
</h2>
```

</enhanced-code-block>

---

<img
  src={suspiciousLinkImage}
  alt="Link from the Legend of Zelda series, with text saying 'don't click on any suspicious links'"
  width="300"
  height="168"
  loading="lazy"
  decoding="async"
/>

Happy slugging! 👨‍💻

[rehype-slug]: https://github.com/rehypejs/rehype-slug
[rehype-autolink-headings]: https://github.com/rehypejs/rehype-autolink-headings
[MDsveX]: https://github.com/pngwn/MDsveX
[@svelte-put/toc]: /docs/toc

