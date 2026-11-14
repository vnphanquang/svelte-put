<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';
	import { turnstile } from '@svelte-put/cloudflare-turnstile';

	export const metadata = defineDocPageMetadata({
		title: 'Introduction',
	});
</script>

<div class="float-right" use:turnstile turnstile-sitekey="1x00000000000000000000AA"></div>

{markdown`
This package attempts at a minimal runtime abstraction for setting up [Cloudflare Turnstile]:

~~~svelte #typehint
<script>
	import { turnstile } from '@svelte-put/cloudflare-turnstile';
</script>

<div
	use:turnstile
	turnstile-sitekey="1x00000000000000000000AA"
	onturnstile={(e) => console.log(e.detail.token)}
></div>
~~~

Read on for more examples and guidelines.

## Prior Art

This implementation of [Cloudflare Turnstile] utilizes [Svelte action]. If you are looking for a
component-oriented solution, check out
[ghostdevv/svelte-turnstile](https://github.com/ghostdevv/svelte-turnstile) instead.

## Installation

> [!CODEGROUP] \`#file-icon=false\`
>
> ~~~bash #title=npm
> npm install --save-dev @svelte-put/cloudflare-turnstile
> ~~~
>
> ~~~bash #title=pnpm
> pnpm add -D @svelte-put/cloudflare-turnstile
> ~~~
>
> ~~~bash #title=yarn
> yarn add -D @svelte-put/cloudflare-turnstile
> ~~~

Happy turning in style! 👨‍💻

[Svelte action]: https://svelte.dev/docs/svelte-action
[Cloudflare Turnstile]: https://developers.cloudflare.com/turnstile/
`}
