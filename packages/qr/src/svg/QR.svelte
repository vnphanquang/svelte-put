<script>
	import { createQrSvgParts } from '../qr/index.js';

	/** @type {import('./QR.svelte').QRProps} */
	let {
		onqrinit,
		svg,
		data,
		anchorInnerFill,
		anchorOuterFill,
		logo,
		logoRatio,
		margin,
		moduleFill,
		shape,
		errorCorrectionLevel,
		typeNumber,
		...rest
	} = $props();

	let parts = $derived(createQrSvgParts({
		data,
		anchorInnerFill,
		anchorOuterFill,
		logo,
		logoRatio,
		margin,
		moduleFill,
		shape,
		errorCorrectionLevel,
		typeNumber,
	}));
	let innerHTML = $derived(`${parts.anchors}${parts.modules}${parts.logo}`)

	/** @type {SVGElement | undefined}*/
	let element = $state(undefined);

	$effect(() => {
		if (element) onqrinit?.(element);
	});
</script>k

{#if svg}
	{@render svg({ attributes: parts.attributes, innerHTML })}
{:else}
	<svg {...parts.attributes} {...rest} bind:this={element}>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html innerHTML}
	</svg>
{/if}
