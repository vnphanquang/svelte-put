<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	import Demo from './includes/demo.svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Setup',
		group: 'Usage',
	});
</script>

{markdown`
\`async-stack\` is headless, it tries to handle only the logic and leave the UI to be defined by you.
There are three steps to complete a setup:

> [!STEPLIST]
>
> 1. define component(s) - what to render,
> 2. define stack - how to render,
> 3. define portal - where to render.

A working demo is shown below. Try clicking on the buttons.
`}

<Demo />

{markdown`
Let's take an overview at each step. In the following examples, styling is purposedly left out to
avoid cluttering. Some UI patterns are introduced in [Recipes](../recipes).

## Component - What

Extends the \`StackItemProps\` interface to your component of choice:

~~~svelte #title="notification.svelte" src="fs:./includes/examples/component.svelte"

~~~

More capabilities are discussed in [Usage > Component](../component).

## Stack - How

Build the stack using the component(s) already set up:

~~~typescript #title="noti-stack.ts" src="fs:../../components/noti-stack.ts"

~~~

Details about how \`Stack\` works and customisation options are discussed in [Usage > Stack](../stack).

## Portal - Where

Choose an appropriate subtree in your DOM to centralise all pushed components:

~~~svelte #title="portal.svelte" src="fs:./includes/examples/portal.svelte"

~~~

More discussion is available in [Usage > Portal](../portal).
`}
