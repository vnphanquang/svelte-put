<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		group: 'Overview',
		title: 'Contributing',
	});
</script>

{markdown`
Your contribution is well apprciated!

## Code

Source code can be found at [github/svelte-put](https://github.com/vnphanquang/svelte-put). If you
have any suggestion or bug report, please read the [Contributing
Guidelines](https://github.com/vnphanquang/svelte-put/blob/main/CONTRIBUTING.md), [start a
discussion](https://github.com/vnphanquang/svelte-put/discussions), or [open an
issue](https://github.com/vnphanquang/svelte-put/issues).

## Money

It is strange asking for money; but here I am. To sponsor my work, please visit
[github.com/sponsors/vnphanquang](https://github.com/sponsors/vnphanquang). Thank you very much for
your support.

## A Hello

Why would you donate? I honestly don't know. I build this collection mainly for myself; it is open
source and my code is largely inspired by other open source projects. And you too can use it however
you wish. So if you find it useful, just reach out to say hello and let me know what amazing project
you are building.

Stop by [this Github discussion thread](https://github.com/vnphanquang/svelte-put/discussions/223)
and say hello!

## Svelte Vietnam

If you are based in Vietnam, stop by [sveltevietnam.dev](https://sveltevietnam.dev), an inclusive
community for people of Svelte in Vietnam that I am proudly a part of.
`}
