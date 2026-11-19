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
		version,
		typeNumber,
		correction,
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
		version,
		correction,
		typeNumber,
		errorCorrectionLevel,
	});

	let srcSvgPlaceholder = $derived(createQrSvgDataUrl(config));
	let base64pngPromise = $derived.by(async () => {
		/** @type {string | undefined}*/
		let logoData = undefined;
		if (logo?.startsWith('http')) {
			try {
				logoData = await toDataURL(logo);
				onqrlogofetch?.(logo);
			} catch {
				// fetch may be blocked (CORS/CSP); pass the original URL through
				// so createQrPngDataUrl can try a CORS-enabled image load instead
			}
		}
		return await createQrPngDataUrl({
			...config,
			backgroundFill,
			width: parseInt(rest.width),
			height: parseInt(rest.height),
			logo: logoData ?? logo,
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
