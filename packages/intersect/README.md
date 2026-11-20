# `@svelte-put/intersect`

[![Read documentation][docs.badge]][docs]
[![Open on npmx.dev][npmx.version]][npmx]
[![Open on npmx.dev][npmx.vulnerabilities]][npmx]
[![Open on npmx.dev][npmx.size]][npmx]
[![See license][npmx.license]][license]

wrapper for
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
in Svelte land

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
[license]: https://github.com/vnphanquang/svelte-put/blob/main/LICENSE

<!-- others -->

[npmx]: https://npmx.dev/package/@svelte-put/intersect
[npmx.version]: https://npmx.dev/api/registry/badge/version/@svelte-put/intersect
[npmx.vulnerabilities]: https://npmx.dev/api/registry/badge/vulnerabilities/@svelte-put/intersect
[npmx.bundlephobia]: https://npmx.dev/api/registry/badge/size/@svelte-put/intersect
[npmx.license]: https://npmx.dev/api/registry/badge/license/@svelte-put/intersect
[npmx.size]: https://npmx.dev/api/registry/badge/size/@svelte-put/intersect
[docs]: https://vnphanquang.com/projects/svelte-put/packages/intersect
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
