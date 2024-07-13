<div align="center">

# `@svelte-put/swipeable`

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![docs.badge]][docs]

Svelte action `use:swipeable` - event for setting up quick gestures on an element (swipe right to delete, for example).

</div>

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```html
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
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/next/packages/swipeable/CHANGELOG.md
[github.issues]: https://github.com/vnphanquang/svelte-put/issues?q=

<!-- heading badge -->

[npm.badge]: https://img.shields.io/npm/v/@svelte-put/swipeable
[npm]: https://www.npmjs.com/package/@svelte-put/swipeable
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/@svelte-put/swipeable?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/@svelte-put/swipeable
[docs]: https://svelte-put.vnphanquang.com/docs/swipeable
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue

