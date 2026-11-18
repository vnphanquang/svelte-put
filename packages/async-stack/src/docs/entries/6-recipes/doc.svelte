<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	import DemoTimeout from './includes/demo/timeout.svelte';
	import DemoSonner from './includes/demo/sonner/index.svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Recipes',
	});
</script>

{markdown`
Since \`async-stack\` is headless, a working setup may require more than what is listed in the
previous documentation pages. This page introduces some helpful UI-specific patterns to hopefully
aid you in your setup.

## Entry & Exit Transition

Svelte builtin [animate:flip](https://svelte.dev/docs/svelte/svelte-animate#flip) and
[transition](https://svelte.dev/docs/svelte/in-and-out) directives can help build a minimal
enhancement pattern to the stack UI setup. For example:

~~~svelte
<script>
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';
</script>

{#each notiStack.items as item (item.config.id)}
	<div
		animate:flip={{ duration: 200 }}
		in:fly={{ duration: 200, x: 20 }}
		out:fade={{ duration: 120 }}
	>
		<item.render.component {...item.render.props()} />
	</div>
{/each}
~~~

The above exact transition pattern has been used throughout the documentation. Try the interative
example in [Live Timeout Bar](#live-timeout-bar) and notice

- the entry fly-in and exit fade-out animation (upon timeout or when you dismiss by clicking the x
  button);
- items re-organised themselves if you push multiple ones and dimiss some in the middle.

## Live Timeout Bar

This UI pattern is seen in the [Setup] demo. Try it again and notice a progress bar running at the
bottom and paused on hover:
`}

<DemoTimeout />

{markdown`
One possible strategy to achieve said pattern is shown as follows:

~~~svelte #typehint
<script lang="ts">
	import type { StackItemProps } from '@svelte-put/async-stack';
	let { item }: StackItemProps = $props();
</script>

<div onmouseenter={item.pause} onmouseleave={item.resume}>
	{#if item.config.timeout}
		<div
			class="progress"
			class:paused={item.state === 'paused'}
			style:--progress-duration="{item.config.timeout}ms"
		></div>
	{/if}
</div>

<style>
	.progress {
		position: absolute;
		inset-block-end: 0;
		inset-inline: 0;
		transform-origin: 0;

		height: 4px;

		background-color: blue;

		animation: progress var(--progress-duration) linear;
	}

	.progress.paused {
		animation-play-state: paused;
	}

	@keyframes progress {
		from {
			transform: scaleX(0);
		}

		to {
			transform: scaleX(1);
		}
	}
</style>
~~~

## Wrapping Stack in Svelte Context

To share a [Stack](../stack) instance across an application, it is useful to wrap it in an
idiomatic [Svelte context](https://svelte.dev/docs/svelte#setcontext). The example below shows a
minimal version of such pattern.

> [!CODEGROUP]
>
> ~~~svelte #title="+layout.svelte" src="fs:./includes/examples/context/layout.svelte"
>
> ~~~
>
> ~~~typescript #title="lib/noti.ts" src="fs:./includes/examples/context/noti.ts"
>
> ~~~
>
> ~~~svelte #title="+page.svelte" src="fs:./includes/examples/context/page.svelte"
>
> ~~~

Your mileage, of course, may vary.

## Svelte Sonner Inspired Toast System

Inspired by [Svelte Sonner], this example shows a status-aware notification setup with more complex
animation coordination.
`}

<DemoSonner />

{markdown`
> [!CODEGROUP]
>
> ~~~svelte #title="+page.svelte" src="fs:./includes/demo/sonner/index.svelte"
>
> ~~~
>
> ~~~svelte #title="notification.svelte" src="fs:./includes/demo/sonner/notification.svelte"
>
> ~~~
>
> ~~~typescript #title="noti-stack.ts" src="fs:./includes/demo/sonner/noti-stack.ts"
>
> ~~~
>
> ~~~svelte #title="portal.svelte" src="fs:./includes/demo/sonner/portal.svelte"
>
> ~~~

[Svelte Sonner]: https://svelte-sonner.vercel.app/
[setup]: ../setup
`}
