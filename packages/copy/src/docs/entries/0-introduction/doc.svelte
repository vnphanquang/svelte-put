<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	import copyMeme from './includes/images/copy-meme.webp';

	export const metadata = defineDocPageMetadata({
		title: 'Introduction',
	});
</script>

{markdown`
This package attempts at a reusable and minimal runtime abstraction to allow quickly copying text
from user action. For example:

~~~svelte
<script>
	import { copy } from '@svelte-put/copy';

	let trigger: HTMLButtonElement;
</script>

<!-- [!code word:copy] -->
<pre use:copy={{ trigger }}>
	<code>console.log('hello world!')</code>
</pre>

<button bind:this={trigger}>Copy code</button>
~~~

Read on for more examples and customistation options.

## Installation

> [!CODEGROUP] \`#file-icon=false\`
>
> ~~~bash #title=npm
> npm install --save-dev @svelte-put/copy
> ~~~
>
> ~~~bash #title=pnpm
> pnpm add -D @svelte-put/copy
> ~~~
>
> ~~~bash #title=yarn
> yarn add -D @svelte-put/copy
> ~~~

Happy copying! 👨‍💻
<hr />
`}

<figure>
	<img
		class="mx-auto"
		src={copyMeme}
		alt="meme from a scene of Mr. Bean TV show where he is copying another student's answers during an exam"
		width="300"
		height="217"
		loading="lazy"
	/>
	<figcaption>
		This package was made during
		<a class="c-link" href="https://en.wikipedia.org/wiki/COVID-19">Covid</a>. Or was it? Blurry
		years, hazzy mind, foggy memories...
	</figcaption>
</figure>
