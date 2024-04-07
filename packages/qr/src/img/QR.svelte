<script>
	import { createEventDispatcher, onMount } from 'svelte';

	import { createBase64Image } from '../qr/index.js';

	import { DEFAULT_FILLS, toDataURL } from './index.js';

	$: ({ data, anchorInnerFill, anchorOuterFill, logo, logoRatio, margin, moduleFill, shape, errorCorrectionLevel, typeNumber, ...rest } = /** @type {import('../qr/types.js').QRConfig} */($$props));

	// FIXME: svelte v5 for better dependency tracking here
	let logoData = logo;
	$: fetchLogo(logo);

	$: src = createBase64Image(
		/** @type {import('./QR.svelte').QRProps} */ ({
			...DEFAULT_FILLS,
			data,
			anchorInnerFill,
			anchorOuterFill,
			logo: logoData,
			logoRatio,
			margin,
			moduleFill,
			shape,
			typeNumber,
			errorCorrectionLevel,
		}),
	);

	/** @type {SVGElement | HTMLImageElement}*/
	let element;
	/** @type {ReturnType<typeof createEventDispatcher<{ 'qr:init': typeof element, 'qr:logofetch': string }>>}*/
	const dispatch = createEventDispatcher();
	onMount(async () => {
		if (element) dispatch('qr:init', element);
	});

	/**
	 * @param {string} logo
	 */
	async function fetchLogo(logo) {
		if (logo?.startsWith('http')) {
			logoData = await toDataURL(logo);
			dispatch('qr:logofetch', logo);
		}
	}
</script>

{#key src}
	<slot {src}>
		<img {src} alt={$$props.data ?? $$restProps.alt} {...rest} bind:this={element} />
	</slot>
{/key}
