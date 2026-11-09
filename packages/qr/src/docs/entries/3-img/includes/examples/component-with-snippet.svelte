<script>
	import QR from '@svelte-put/qr/img/QR.svelte';
</script>

<QR
	data="https://svelte.dev"
	logo="https://svelte.dev/favicon.png"
	shape="circle"
	width="500"
	height="500"
>
	{#snippet img({ src })}
		<img {src} alt="qr" />
	{/snippet}
</QR>