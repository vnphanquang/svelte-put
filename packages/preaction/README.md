<div align="center">

# `@svelte-put/preaction`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs]

Svelte preprocessor for extending Svelte action with ability to add SSR-friendly attributes.

</div>

> !IMPORTANT
> PROOF OF CONCEPT ONLY. NOT READY FOR PRODUCTION!

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

Given this `svelte.config.js`...

```javascript
// svelte.config.js
import preaction from '@svelte-put/preaction';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
		preaction(),
    // other preprocessors
  ],
};
export default config;
```

...`make` a "preaction"...

```typescript
import type { HTMLAttributes } from 'svelte/elements';
import { make } from '@svelte-put/preaction';

export const setMyColor = make((initialColor = 'blue') => {
  // :::highlight
  // this code runs both both on server and client, as if it is top-level script code.
  // So don't rely on browser stuff such as `document` or `window`.
  // :::

  return {
    action = (node: HTMLElement, color: string) => {
      // :::highlight
      // this code is a typical Svelte action and runs only on client
      // :::
      return {
        update: (newColor: string) => {
          // update the color attribute dynamically at runtime
          node.dataset.color = newColor;
        },
      }
    },

    attributes: {
      // :::highlight
      // this attributes will be statically spread onto the node
      // :::
      'data-color': initialColor;
    } as HTMLAttributes<HTMLElement>,
  };
});

// For typescript users, to take full advantage of language tooling,
// like make sure to provide type parameters and attributes as seen above.
```

...`apply` a "preaction"...

```html
<script>
  import { apply } from '@svelte-put/preaction';
  import { setMyColor } from './set-my-color.ts'; // see previous step
</script>

<!-- add data-color on server, and apply action on client -->
<div use:apply={setMyColor('red')}></div>
```

...which is equivalent to...

```html
<script>
  import { setMyColor } from './set-my-color.ts'; // see previous step
	const { acton, attributes } = setMyColor('red');
</script>

<!-- add data-color on server, and apply action on client -->
<div {...(attributes ?? {})} use:action={'red'}></div>
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/next/packages/preaction/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/preaction
[npm]: https://www.npmjs.com/package/@svelte-put/preaction
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/preaction?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/preaction
[docs]: https://svelte-put.vnphanquang.com/docs/preaction
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue

