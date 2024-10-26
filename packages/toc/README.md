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
<!-- input.svelte -->
<script>
	import { Toc } from '@svelte-put/toc';

	const toc = new Toc({ observe: true });
</script>

<main use:toc.actions.root>
	<h1>Page Heading</h1>

	<section>
		<h2>Table of Contents</h2>
		{#if toc.items.size}
		<ul>
			{#each toc.items.values() as tocItem (tocItem.id)}
			<li>
				<!-- svelte-ignore a11y_missing_attribute -->
				<a use:toc.actions.link="{tocItem}">
					<!-- textContent injected by toc -->
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

will render...

```html
<!-- output.html -->
<main
	data-toc-observe-for="page-heading"
	data-toc-root="ee4f13a3-dfec-401d-b52c-a52550e20ddf"
	data-toc-observe-active-id="section-heading-level-3"
>
	<h1 id="page-heading" data-toc="">
		<a aria-hidden="true" tabindex="-1" href="#page-heading" data-toc-anchor="">#</a>Page Heading
	</h1>
	<section data-toc-observe-for="table-of-contents">
		<h2 id="table-of-contents" data-toc="">
			<a aria-hidden="true" tabindex="-1" href="#table-of-contents" data-toc-anchor="">#</a>Table of
			Contents
		</h2>
		<ul>
			<li>
				<a href="#page-heading" data-toc-link-for="page-heading" data-toc-link-current="false"
					>Page Heading</a
				>
			</li>
			<li>
				<a
					href="#table-of-contents"
					data-toc-link-for="table-of-contents"
					data-toc-link-current="false"
					>Table of Contents</a
				>
			</li>
			<li>
				<a
					href="#section-heading-level-2"
					data-toc-link-for="section-heading-level-2"
					data-toc-link-current="false"
					>Section Heading Level 2</a
				>
			</li>
			<li>
				<a
					href="#section-heading-level-3"
					data-toc-link-for="section-heading-level-3"
					data-toc-link-current="true"
					>Section Heading Level 3</a
				>
			</li>
		</ul>
	</section>
	<section data-toc-observe-for="section-heading-level-2">
		<h2 id="section-heading-level-2" data-toc="">
			<a aria-hidden="true" tabindex="-1" href="#section-heading-level-2" data-toc-anchor="">#</a
			>Section Heading Level 2
		</h2>
		<p>...</p>
	</section>
	<section data-toc-observe-for="section-heading-level-3">
		<h3 id="section-heading-level-3" data-toc="">
			<a aria-hidden="true" tabindex="-1" href="#section-heading-level-3" data-toc-anchor="">#</a
			>Section Heading Level 3
		</h3>
		<p>...</p>
	</section>
</main>
```

## Acknowledgement

This package relies on svelte action strategy and attempts to stay minimal. If you are looking for a declarative, component-oriented solution, check out [Janosh][janosh]'s [svelte-toc].

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/toc/CHANGELOG.md

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
