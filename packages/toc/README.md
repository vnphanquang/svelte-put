# `@svelte-put/toc`

[![Read documentation][docs.badge]][docs]
[![Open on npmx.dev][npmx.version]][npmx]
[![Open on npmx.dev][npmx.vulnerabilities]][npmx]
[![See on bundlephobia][npmx.bundlephobia]][bundlephobia]
[![See license][npmx.license]][license]

Strategies for building Table-of-Contents in Svelte land. Features include:

- Vite plugin / Svelte preprocessor for compile-time indexing for static content
- Runtime indexing for dynmaic content
- Zero-JS visibility tracking
- SSR-compatible markup enhancement

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Example

```svelte
<script>
	import { Toc, compileToc } from '@svelte-put/toc';
	import '@svelte-put/toc/style.css';

	const toc = new Toc({ ...comipleToc() });
	// remove `compileToc` if content is dynamic
</script>

<main {...toc.enhance.scope()} {...toc.runtime.index()}> <!-- remove `toc.runtime.index()` if content is completely static -->
	<h1>Page Heading</h1>

  <section>
    <h2>Table of Contents</h2>
    {#if toc.items.size}
      <ul>
        {#each toc.items.values() as item (item.id)}
          <li>
            <a {...toc.enhance.link(item)}>
              {...item.text}
            </a>
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
</main>
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/toc/CHANGELOG.md
[license]: https://github.com/vnphanquang/svelte-put/blob/main/LICENSE

<!-- heading badges -->

[npmx.version]: https://npmx.dev/api/registry/badge/version/@svelte-put/toc
[npmx.vulnerabilities]: https://npmx.dev/api/registry/badge/vulnerabilities/@svelte-put/toc
[npmx.bundlephobia]: https://npmx.dev/api/registry/badge/size/@svelte-put/toc
[npmx.license]: https://npmx.dev/api/registry/badge/license/@svelte-put/toc
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue

<!-- others -->

[npmx]: https://npmx.dev/package/@svelte-put/toc
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/toc
[docs]: https://svelte-put.vnphanquang.com/packages/toc
