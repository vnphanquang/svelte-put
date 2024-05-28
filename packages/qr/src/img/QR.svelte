<script>
	import { createQrPngDataUrl, createQrSvgDataUrl } from '../qr/index.js';

	import { toDataURL } from './index.js';

	/** @type {import('./QR.svelte').QRProps} */
	let {
		data,
		margin,
		shape,
		logo,
		logoRatio,
		moduleFill,
		anchorInnerFill,
		anchorOuterFill,
		backgroundFill,
		typeNumber,
		errorCorrectionLevel,
		onqrinit,
		onqrlogofetch,
		img,
		...rest
	} = $props();

	let config = $derived({
		data,
		anchorInnerFill,
		anchorOuterFill,
		logoRatio,
		margin,
		moduleFill,
		shape,
		typeNumber,
		errorCorrectionLevel,
	});

	let srcSvgPlaceholder = $derived(createQrSvgDataUrl(config));
	let base64pngPromise = $derived.by(async () => {
		/** @type {string | undefined}*/
		let logoData = undefined;
		if (logo?.startsWith('http')) {
			logoData = await toDataURL(logo);
			onqrlogofetch?.(logo);
		}
		return await createQrPngDataUrl({
			...config,
			backgroundFill,
			width: parseInt(rest.width),
			height: parseInt(rest.height),
			logo: logoData,
		});
	});

	/** @type {HTMLImageElement | undefined}*/
	let element = $state(undefined);

	$effect(() => {
		if (element) onqrinit?.(element);
	});
</script>

{#await base64pngPromise}
	<img src={srcSvgPlaceholder} {...rest} />
{:then base64}
	{#if img}
		{@render img({ src: base64 })}
	{:else}
		<img src={base64} {...rest} bind:this={element} />
	{/if}
{/await}
