<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		group: 'Overview',
		title: 'Architecture',
	});
</script>

{markdown`
Packages within the \`svelte-put\` collection follow, as much as possible, the following design
decisions:

- Minimalism: stay small, with as few dependencies as possible - do one thing at a time.
- Headless UI: say no to UI component abstraction as much as possible to avoid opinionated UI
  patterns - prioritise flexibility.
- Typescript support: provide type-safety with self-documented code for code discovery and language
  server support.
- Less Javascript:
  - If a setup can be achieved at build-time, do so instead of rely in on runtime JS.
  - If a strategy can be achieved with native HTML & CSS features, prefer so.

Because of the philosophies above, you will find that the majority of packages rely primarily on...

- [Vite plugin][vite.plugin] and [preprocessor][svelte.preprocess] for compile-time / build-time abstraction,
- [action][svelte.action] and [attachment][svelte.attachment] for runtime abstraction

...to encapsulate only the necessary logics and leave the UI to be defined by users.

The trade-off, however, is that sometimes it takes verbose setup to achieve a desired system (such
as in the case of [async-stack](/packages/async-stack) or [toc](/packages/toc)). In my own work,
this has encouraged me to "own" my code and get familiar with pieces of the package; if issues or
customisation demand arises, I will likely be more capable of providing solutions than say if I were
to use a prebuilt component library.

[svelte.action]: https://svelte.dev/docs/svelte-action
[svelte.attachment]: https://svelte.dev/docs/svelte/@attach
[svelte.preprocess]: https://svelte.dev/docs/svelte/svelte-compiler#preprocess
[vite.plugin]: https://vite.dev/guide/api-plugin
`}
