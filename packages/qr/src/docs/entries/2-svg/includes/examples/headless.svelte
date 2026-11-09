<script lang="ts">
	import { createQrSvgString, createQrSvgDataUrl, type QRConfig } from '@svelte-put/qr';

	const config = { data: 'https://svelte.dev' } satisfies QRConfig;

	const dataURL = createQrSvgDataUrl(config);
	const svgString = createQrSvgString(config);
</script>

<div class="flex flex-col items-center gap-2 not-md">
	{@html svgString}
	<a
		class="c-btn"
		href={dataURL}
		download="qr.svg"
	>
		Download QR as SVG
	</a>
</div>
