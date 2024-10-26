<script>
	import { createQrPngDataUrl } from '@svelte-put/qr';
	import { onMount } from 'svelte';

	const config = {
		data: 'https://svelte.dev',
		width: 500,
		height: 500,
		backgroundFill: '#fff',
	};

	let src = '';
	onMount(async () => {
		src = await createQrPngDataUrl(config);
	});
</script>

<div class="flex flex-col items-center gap-2">
	<img {src} width="180" height="180" alt="a qr code" />
	<a class="c-btn" href={src} download="qr.png">Download QR as PNG</a>
</div>
