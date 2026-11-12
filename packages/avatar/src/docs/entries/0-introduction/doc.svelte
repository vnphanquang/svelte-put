<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	import imgAang from './includes/images/aang.gif';

	export const metadata = defineDocPageMetadata({
		title: 'Introduction',
	});
</script>

{markdown`
This package attempts at a minimal reusable pattern to set up avatar in a system, with fallbacks to
[Gravatar] and [UI Avatar].

~~~svelte #title="my-avatar.svelte"
<script>
	import Avatar from '@svelte-put/avatar/Avatar.svelte';

	let { id, email, firstName, lastName } = $props();
</script>

<Avatar
	src="https://your.api/avatar/{id}"
	gravatar={email}
	uiAvatar="{firstName}+{lastName}"
	fallback="https://your.api/avatar/default"
/>
~~~

Read on for additional guidelines and examples.

## Installation

> [!CODEGROUP] \`#file-icon=false\`
>
> ~~~bash #title=npm
> npm install --save-dev @svelte-put/avatar
> ~~~
>
> ~~~bash #title=pnpm
> pnpm add -D @svelte-put/avatar
> ~~~
>
> ~~~bash #title=yarn
> yarn add -D @svelte-put/avatar
> ~~~

Happy bending!

[Gravatar]: https://docs.gravatar.com/
[UI Avatar]: https://ui-avatars.com/
`}

<img
	class="ms-0"
	src={imgAang}
	alt="Guess who is the Avatar?"
	width="300"
	height="168.6"
	loading="lazy"
	decoding="async"
/>
