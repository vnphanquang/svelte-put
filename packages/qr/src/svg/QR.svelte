<script>
	import { createEventDispatcher, onMount } from 'svelte';

	import { createSVGParts } from '../qr/index.js';

	$: ({ data, anchorInnerFill, anchorOuterFill, logo: logoURL, logoRatio, margin, moduleFill, shape, ...rest } = /** @type {import('../qr/types.js').QRConfig} */($$props));

	$: ({ anchors, attributes, logo, modules } = createSVGParts({
		data,
		anchorInnerFill,
		anchorOuterFill,
		logo: logoURL,
		logoRatio,
		margin,
		moduleFill,
		shape,
	}));
	$: innerHTML = `${anchors}${modules}${logo}`;

	/** @type {SVGElement}*/
	let element;
	/** @type {ReturnType<typeof createEventDispatcher<{ 'qr:init': typeof element }>>}*/
	const dispatch = createEventDispatcher();
	onMount(() => {
		if (element) dispatch('qr:init', element);
	});
</script>

<!-- eslint-disable svelte/no-at-html-tags  -->
<slot {attributes} {innerHTML}>
	<svg {...attributes} {...rest} bind:this={element}>
		{@html innerHTML}
	</svg>
</slot>
