# `@svelte-put/clickoutside`

[![Read documentation][docs.badge]][docs]
[![Open on npmx.dev][npmx.version]][npmx]
[![Open on npmx.dev][npmx.vulnerabilities]][npmx]
[![Open on npmx.dev][npmx.size]][npmx]
[![See license][npmx.license]][license]

Svelte action `use:clickoutside` - event for clicking outside a node

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```svelte
<script lang="ts">
	import { clickoutside } from '@svelte-put/clickoutside';

	function doSomething(e: CustomEvent<MouseEvent>) {
		console.log(e.target);
	}
</script>

<div use:clickoutside onclickoutside={doSomething} />
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/clickoutside/CHANGELOG.md
[license]: https://github.com/vnphanquang/svelte-put/blob/main/LICENSE

<!-- others -->

[npmx]: https://npmx.dev/package/@svelte-put/clickoutside
[npmx.version]: https://npmx.dev/api/registry/badge/version/@svelte-put/clickoutside
[npmx.vulnerabilities]: https://npmx.dev/api/registry/badge/vulnerabilities/@svelte-put/clickoutside
[npmx.bundlephobia]: https://npmx.dev/api/registry/badge/size/@svelte-put/clickoutside
[npmx.license]: https://npmx.dev/api/registry/badge/license/@svelte-put/clickoutside
[npmx.size]: https://npmx.dev/api/registry/badge/size/@svelte-put/clickoutside
[docs]: https://vnphanquang.com/projects/svelte-put/packages/clickoutside
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
