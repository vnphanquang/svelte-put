<script>
	import { createEventDispatcher, onMount } from 'svelte';

	import { createQrSvgDataUrl, createQrPngDataUrl } from '../qr/index.js';

	import { toDataURL } from './index.js';

	// FIXME: svelte v5 for better props declaration & dependency tracking here

	/** @type {string} */
	export let data;
	/** @type {number | undefined} */
	export let margin = undefined;
	/** @type {import('./QR.svelte.js').QRProps['shape'] | undefined} */
	export let shape = undefined;

	/** @type {string | undefined} */
	export let logo = undefined;
	/** @type {number | undefined} */
	export let logoRatio = undefined;

	/** @type {string | undefined} */
	export let moduleFill = undefined;
	/** @type {string | undefined} */
	export let anchorInnerFill = undefined;
	/** @type {string | undefined} */
	export let anchorOuterFill = undefined;
	/** @type {string | undefined} */
	export let backgroundFill = undefined;

	/** @type {import('./QR.svelte.js').QRProps['typeNumber'] | undefined} */
	export let typeNumber = undefined;
	/** @type {import('./QR.svelte.js').QRProps['errorCorrectionLevel'] | undefined} */
	export let errorCorrectionLevel = undefined;

	function getConfig() {
		return {
			data,
			anchorInnerFill,
			anchorOuterFill,
			logoRatio,
			margin,
			moduleFill,
			shape,
			typeNumber,
			errorCorrectionLevel,
		};
	}

	let src = createQrSvgDataUrl(getConfig());

	/** @type {SVGElement | HTMLImageElement}*/
	let element;

	/** @type {ReturnType<typeof createEventDispatcher<{ 'qr:init': typeof element, 'qr:logofetch': string }>>}*/
	const dispatch = createEventDispatcher();
	onMount(async () => {
		if (element) dispatch('qr:init', element);
		/** @type {string | undefined}*/
		let logoData = undefined;
		if (logo?.startsWith('http')) {
			logoData = await toDataURL(logo);
			dispatch('qr:logofetch', logo);
		}
		const base64png = await createQrPngDataUrl({
			...getConfig(),
			backgroundFill,
			width: $$restProps.width,
			height: $$restProps.height,
			logo: logoData,
		});
		src = base64png;
	});
</script>

{#key src}
	<slot {src}>
		<img {src} alt={$$props.data ?? $$restProps.alt} {...$$restProps} bind:this={element} />
	</slot>
{/key}
