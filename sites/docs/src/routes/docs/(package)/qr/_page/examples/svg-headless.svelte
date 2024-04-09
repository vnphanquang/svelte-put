<script>
	import { createQrSvgString, createQrSvgDataUrl } from '@svelte-put/qr';

	const config = { data: 'https://svelte.dev' }

	const dataURL = createQrSvgDataUrl(config);
	const svgString = createQrSvgString(config);
</script>

<div class="flex items-center gap-2 flex-col">
	{@html svgString}
	<a class="c-btn" href={dataURL} download="qr.svg">Download QR as SVG</a>
</div>