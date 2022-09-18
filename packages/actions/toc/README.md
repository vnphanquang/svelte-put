<div align="center">

# `@svelte-put/toc`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia]

Svelte `<Toc>` component and `use:toc` action for building table of contents

</div>

## Table of Contents

<details open>
  <summary>Show / hide</summary>

- [`@svelte-put/toc`](#svelte-puttoc)
  - [Table of Contents](#table-of-contents)
  - [`svelte-put`](#svelte-put)
  - [Installation](#installation)
  - [Acknowledgement](#acknowledgement)
  - [Usage](#usage)
    - [Action](#action)
    - [Component](#component)
  - [Documentation](#documentation)
    - [Typescript support](#typescript-support)

</details>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Installation

```bash
npm install -D @svelte-put/toc
```

```bash
yarn add -D @svelte-put/toc
```

```bash
pnpm add -D @svelte-put/toc
```

## [Changelog][github.changelog]

## Acknowledgement

This package rely on svelte action strategy and attempts to stay minimal. If you are looking for a declarative, component-oriented solution, check out [Janosh][janosh]'s [svelte-toc].

## Usage

### Action

The `use:toc` action will search for all matching DOM elements and
transform them to support hash navigation (anchor element with id attribute).
By default, all heading elements are collected. You can customize the behavior
with the action parameters [TocParameters][github.api.TocParameters]

<details open>
  <summary>Show / hide</summary>

```html
<script>
  import { toc } from '@svelte-put/toc';
  import type { TocEventDetails } from '@svelte-put/toc';

  function onToc(e: CustomEvent<TocEventDetails>) {
    const { items } = e.detail.items;
    for (const item of items) {
      const { id, element, text, p, anchor } = item;
      // do stuff
      console.log(item);
    }
  }
</script>

<svelte:body use:toc on:toc={onToc} />

<h1>Heading</h1>
<h2 id="manual-id">Some other content</h2>
<h2>Content without explicit id will be slugified into an id with maximum length of 50 characters</h2>

```

</details>

After `toc` has completed its execution, the HTML in example above will be transformed, to:

<details open>
  <summary>Show / hide</summary>

```html
<h1 class="toc-element" style="position: relative;">
  <a
    class="toc-anchor"
    href="#heading"
    style="position: relative;"
  >
    Heading
  </a>
  <p
    class="toc-p"
    id="note"
    style="bottom: 100%; position: absolute; visibility: hidden; margin-top: -96px; height: 96px;"
  ></p>
</h1>

<h2 class="toc-element" style="position: relative;">
  <a
    class="toc-anchor"
    href="#manual-id"
    style="position: relative;"
  >
    Some other content
  </a>
  <p
    class="toc-p"
    id="note"
    style="bottom: 100%; position: absolute; visibility: hidden; margin-top: -96px; height: 96px;"
  ></p>
</h2>

<h2 class="toc-element" style="position: relative;">
  <a
    class="toc-anchor"
    href="#content-without-explicit-id-will-be-slugified-into"
    style="position: relative;"
  >
    Content without explicit id will be slugified into an id with maximum length of 50 characters
  </a>
  <p
    class="toc-p"
    id="note"
    style="bottom: 100%; position: absolute; visibility: hidden; margin-top: -96px; height: 96px;"
  ></p>
</h2>
```

</details>

### Component

The exported `Toc` component internally uses `<svelte:body use:toc />`; customization can be done by
providing [TocParameters][github.api.TocParameters] through the `parameters` prop.

The component will print out a simple `ul` with some default margin for `li` depending on the heading level. For a simple blog post, this should be enough. For more complex use cases, you can override one of [TocSlots][github.api.TocSlots].

If the component interface does not provide enough customization flexibility for you, consider open an [issue][github.issues] to discuss or use the `use:toc` action interface instead.

Consider the same example as in the previous section but now we use the component instead:

<details open>
  <summary>Show / hide</summary>

```html
<script>
  import Toc from '@svelte-put/toc/Toc.svelte';
</script>

<Toc on:toc>
  <svelte:fragment slot="anchor" let:item>
    <a href="#{item.id}" class="custom-anchor-tag">{item.text}</a>
  </svelte:fragment>
</Toc>

<!-- some headings like the previous example -->
```

</details>

The HTML generated will look similar to

<details open>
  <summary>Show / hide</summary>

```html
<ul class="toc-ul">
  <li class="toc-li toc-li--h1">
    <a class="custom-anchor-tag" href="#heading">
      Heading
    </a>
  </li>
  <li class="toc-li toc-li--h2">
    <a class="custom-anchor-tag" href="#manual-id">
      Some other content
    </a>
  </li>
    <li class="toc-li toc-li--h2">
    <a class="custom-anchor-tag" href="#content-without-explicit-id-will-be-slugified-into">
      Content without explicit id will be slugified into an id with maximum length of 50 characters
    </a>
  </li>
</ul>
```

And the CSS for this list is


<details open>
  <summary>Show / hide</summary>

```css
.toc-li.toc-li--h1 {
  font-weight: bold;
}
.toc-li.toc-li--h2 {
  margin-left: 1rem;
}
```

</details>


</details>

## Documentation

### Typescript support

<details open>
  <summary> app.d.ts: show / hide </summary>

```typescript
/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />

// Typescript support in svelte-kit, see
// https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    // on:toc
    ontoc?: (event: CustomEvent<import('@svelte-put/toc').TocEventDetails>) => void;
  }
}
```

</details>

For detailed documentation, see the [extracted API][github.api].

<br />

<p align="center">
  <a href="https://www.buymeacoffee.com/vnphanquang" target="_blank">
    <img
      src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
      height="60"
      width="217"
      alt="buy vnphanquang a coffee"
    />
  </a>
</p>

<!-- github specifics -->
[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/toc/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=
[github.api]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/toc/api/docs/index.md
[github.api.TocProps]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/toc/api/docs/toc.tocprops.md
[github.api.TocSlots]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/toc/api/docs/toc.tocslots.md
[github.api.TocParameters]: https://github.com/vnphanquang/svelte-put/blob/main/packages/actions/toc/api/docs/toc.tocparameters.md

<!-- heading badge -->
[npm.badge]: https://img.shields.io/npm/v/@svelte-put/toc
[npm]: https://www.npmjs.com/package/@svelte-put/toc
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/toc?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/toc

<!-- external resources -->
[svelte-toc]: https://github.com/janosh/svelte-toc
[janosh]: https://github.com/janosh
