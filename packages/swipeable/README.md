# `@svelte-put/swipeable`

[![Read documentation][docs.badge]][docs]
[![Open on npmx.dev][npmx.version]][npmx]
[![Open on npmx.dev][npmx.vulnerabilities]][npmx]
[![Open on npmx.dev][npmx.size]][npmx]
[![See license][npmx.license]][license]

Utilities for setting up quick gestures on an element in Svelte land, e.g. swipe right to delete

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```svelte
<script lang="ts">
  import { swipe } from '@svelte-put/swipeable';

	const items = $state([1, 2, 3, 4, 5]);

  function delete(e: CustomEvent) {
		const id = e.target.dataset.id;
		items = items.filter(i => i !== id);
  }

	function archive(e: CustomEvent) {
		const id = e.target.dataset.id;
		// call backend API to archive...

		items = items.filter(i => i !== );
	}
</script>

<ul>
	{#each items as i}
		<li
			use:swipe={{ direction: 'horizontal', threshold: '50%' }}
			data-id={i}
			onswipeleft={archive}
			onswiperight={delete}
		>{i}</li>
	{/each}
</ul>
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/swipeable/CHANGELOG.md
[license]: https://github.com/vnphanquang/svelte-put/blob/main/LICENSE

<!-- others -->

[npmx]: https://npmx.dev/package/@svelte-put/swipeable
[npmx.version]: https://npmx.dev/api/registry/badge/version/@svelte-put/swipeable
[npmx.vulnerabilities]: https://npmx.dev/api/registry/badge/vulnerabilities/@svelte-put/swipeable
[npmx.bundlephobia]: https://npmx.dev/api/registry/badge/size/@svelte-put/swipeable
[npmx.license]: https://npmx.dev/api/registry/badge/license/@svelte-put/swipeable
[npmx.size]: https://npmx.dev/api/registry/badge/size/@svelte-put/swipeable
[docs]: https://svelte-put.vnphanquang.com/packages/swipeable
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
