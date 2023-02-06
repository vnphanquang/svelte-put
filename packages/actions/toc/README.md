<div align="center">

# `@svelte-put/toc`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs] [![repl.badge]][repl]

Svelte `use:toc` action for building table of contents

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```html
<script>
  import { toc, createTocStore, toclink } from '@svelte-put/toc';
  const tocStore = createTocStore();
</script>

<main use:toc={{ store: tocStore, observe: true }}>
  <h1>Page Heading</h1>

  <section>
    <h2>Table of Contents</h2>
    {#if Object.values($tocStore.items).length}
      <ul>
        {#each Object.values($tocStore.items) as tocItem}
          <li>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a use:toclink={{ store: tocStore, tocItem, observe: true }} />
          </li>
        {/each}
      </ul>
    {/if}
  </section>

  <section>
    <h2>Section Heading Level 2</h2>
    <p>...</p>
  </section>

  <section>
    <h3>Section Heading Level 3</h3>
    <p>...</p>
  </section>
  <!-- ... -->
</main>
```

## Acknowledgement

This package relies on svelte action strategy and attempts to stay minimal. If you are looking for a declarative, component-oriented solution, check out [Janosh][janosh]'s [svelte-toc].

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/toc/CHANGELOG.md

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/toc
[npm]: https://www.npmjs.com/package/@svelte-put/toc
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/toc?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/toc

<!-- external resources -->

[svelte-toc]: https://github.com/janosh/svelte-toc
[janosh]: https://github.com/janosh

<!-- repl -->

[repl]: https://svelte.dev/repl/d9c896ac62cd41d49f80ffa249d292e6
[repl.badge]: https://img.shields.io/static/v1?label=&message=Svelte+REPL&logo=svelte&logoColor=fff&color=ff3e00
[docs]: https://svelte-put.vnphanquang.com/docs/toc
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
