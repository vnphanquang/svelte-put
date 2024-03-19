<script>
	import { createEventDispatcher, onMount } from 'svelte';

	import { createBase64Image } from '../qr/index.js';

	import { DEFAULT_FILLS, toDataURL } from './index.js';

	$: ({ data, anchorInnerFill, anchorOuterFill, logo, logoRatio, margin, moduleFill, shape, ...rest } = /** @type {import('../qr/types.js').QRConfig} */($$props));

	$: src = createBase64Image(
		/** @type {import('./QR.svelte').QRProps} */ ({
			...DEFAULT_FILLS,
			data,
			anchorInnerFill,
			anchorOuterFill,
			logo,
			logoRatio,
			margin,
			moduleFill,
			shape,
		}),
	);

	/** @type {SVGElement | HTMLImageElement}*/
	let element;
	/** @type {ReturnType<typeof createEventDispatcher<{ 'qr:init': typeof element, 'qr:logofetch': string }>>}*/
	const dispatch = createEventDispatcher();
	onMount(async () => {
		if (element) dispatch('qr:init', element);

		if (logo?.startsWith('http')) {
			logo = await toDataURL(logo);
			dispatch('qr:logofetch', logo);
		}
	});
</script>

<slot {src}>
	<img {src} alt={$$props.data ?? $$restProps.alt} {...rest} bind:this={element} />
</slot>
