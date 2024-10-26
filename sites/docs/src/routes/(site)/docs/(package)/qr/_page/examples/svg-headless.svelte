<script>
	import { createQrSvgString, createQrSvgDataUrl } from '@svelte-put/qr';

	const config = { data: 'https://svelte.dev' };

	const dataURL = createQrSvgDataUrl(config);
	const svgString = createQrSvgString(config);
</script>

<div class="flex flex-col items-center gap-2">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html svgString}
	<a class="c-btn" href={dataURL} download="qr.svg">Download QR as SVG</a>
</div>
