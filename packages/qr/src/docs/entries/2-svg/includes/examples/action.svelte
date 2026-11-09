<!-- [!code word:qr] -->
<script>
	import { qr } from '@svelte-put/qr/svg';
</script>

<svg
	use:qr={{
		data: 'https://svelte.dev',
		logo: 'https://svelte.dev/favicon.png',
		shape: 'circle',
	}}
></svg>