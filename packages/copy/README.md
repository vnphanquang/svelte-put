# `@svelte-put/copy`

[![Read documentation][docs.badge]][docs]
[![Open on npmx.dev][npmx.version]][npmx]
[![Open on npmx.dev][npmx.vulnerabilities]][npmx]
[![Open on npmx.dev][npmx.size]][npmx]
[![See license][npmx.license]][license]

Utilities for copying text to clipboard in Svelte land

## `svelte-put`

This package is part of the [@svelte-put][github.monorepo] family. For contributing guideline and more, refer to its [readme][github.monorepo].

## Usage & Documentation

[See the dedicated documentation page here][docs].

## Quick Start

```svelte
<script lang="ts">
	import { copy, type CopyDetail } from '@svelte-put/copy';

	function handleCopied(e: CustomEvent<CopyDetail>) {
		console.log('Text copied:', e.detail.text);
	}
</script>

<button type="button" use:copy oncopied={handleCopied}>Click to copy this</button>
```

## [Changelog][github.changelog]

<!-- github specifics -->

[github.monorepo]: https://github.com/vnphanquang/svelte-put
[github.changelog]: https://github.com/vnphanquang/svelte-put/blob/main/packages/copy/CHANGELOG.md
[license]: https://github.com/vnphanquang/svelte-put/blob/main/LICENSE

<!-- others -->

[npmx]: https://npmx.dev/package/@svelte-put/copy
[npmx.version]: https://npmx.dev/api/registry/badge/version/@svelte-put/copy
[npmx.vulnerabilities]: https://npmx.dev/api/registry/badge/vulnerabilities/@svelte-put/copy
[npmx.bundlephobia]: https://npmx.dev/api/registry/badge/size/@svelte-put/copy
[npmx.license]: https://npmx.dev/api/registry/badge/license/@svelte-put/copy
[npmx.size]: https://npmx.dev/api/registry/badge/size/@svelte-put/copy
[docs]: https://vnphanquang.com/projects/svelte-put/packages/copy
[docs.badge]: https://img.shields.io/badge/-Docs%20Site-blue
