<script>
	import QR from '@svelte-put/qr/svg/QR.svelte';
</script>

<QR
	data="https://svelte.dev"
	logo="https://svelte.dev/favicon.png"
	shape="circle"
>
	{#snippet svg({ attributes, innerHTML })}
		<svg {...attributes}>
			{@html innerHTML}
		</svg>
	{/snippet}
</QR>
