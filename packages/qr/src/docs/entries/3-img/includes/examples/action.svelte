<!-- [!code word:qr] -->
<script>
	import { qr } from '@svelte-put/qr/img';
</script>

<img
	use:qr={{
		data: 'https://svelte.dev',
		logo: 'https://svelte.dev/favicon.png',
		shape: 'circle',
		width: 500,
		height: 500,
	}}
	alt="qr"
/>