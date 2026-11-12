<div align="center">

# `@svelte-put/intersect`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs]

wrapper for
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
in Svelte land

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```svelte
<script lang="ts">
	import { intersect, type IntersectDetail } from '@svelte-put/intersect';

	function onIntersect(e: CustomEvent<IntersectDetail>) {
		const { observer, entries, direction } = e.detail;
		console.log('the observer itself', observer);
		console.log('scrolling direction:', direction);
		console.log('intersecting:', entries[0]?.isIntersecting ? 'entering' : 'leaving');
	}
</script>

<div use:intersect onintersect={onIntersect} onintersectonce></div>
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/intersect/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/intersect
[npm]: https://www.npmjs.com/package/@svelte-put/intersect
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/intersect?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/intersect
[docs]: https://svelte-put.vnphanquang.com/packages/intersect
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
