<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	export const metadata = defineDocPageMetadata({
		group: 'Deprecated',
		title: 'popover & tooltip',
	});
</script>

{markdown`
> [!INFO]
> **Deprecation Notice**
>
> \`@svelte-put@popover\` and \`@svelte-put@tooltip\` have been dropped because modern
> browsers now support Javascript-free popover control via [popovertargetaction] (and more via
> [Interest invokers] in the future, hopefully). More importantly, positioning an element relative to
> another, which was the primary abstraction purpose for these packages, is now possible natively via
> [CSS Anchor Positioning]. Let's embrace these new features for a more friendly web!

[popovertargetaction]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#popovertargetaction
[Interest invokers]: https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using_interest_invokers
[CSS Anchor Positioning]: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning
`}
