<div align="center">

# `@svelte-put/tooltip`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs] [![repl.badge]][repl]

Type-safe, headless, extensible tooltip builder via Svelte action `use:tooltip`

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```html
<script>
  import { computePosition } from '@floating-ui/dom';
  import { tooltip } from '@svelte-put/tooltip';
</script>

<button
  class="c-btn-primary relative"
  use:tooltip={{
    content: 'An example tooltip',
    class: 'c-tooltip',
    compute: async ({ node, tooltip, content }) => {
      const { x, y } = await computePosition(node, tooltip, {
        placement: 'right',
      });
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
    },
  }}
>
  A button with tooltip
</button>
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/tooltip/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/tooltip
[npm]: https://www.npmjs.com/package/@svelte-put/tooltip
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/tooltip?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/tooltip
[repl]: https://svelte.dev/repl/ac411d28f87b4b6d9942e050fa29e0cd
[repl.badge]: https://img.shields.io/static/v1?label=&message=Svelte+REPL&logo=svelte&logoColor=fff&color=ff3e00
[docs]: https://svelte-put.vnphanquang.com/docs/tooltip
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
