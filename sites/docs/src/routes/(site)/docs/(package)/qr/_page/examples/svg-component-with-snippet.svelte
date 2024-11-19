<script>
	import QR from '@svelte-put/qr/svg/QR.svelte';
</script>

<QR
	data="https://svelte.dev"
	logo="https://raw.githubusercontent.com/sveltejs/branding/master/svelte-logo.svg"
	logoRatio={107 / 128}
	shape="square"
	margin={4}
>
	{#snippet svg({ attributes, innerHTML })}
		<svg {...attributes} class="**:fill-blue-500">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html innerHTML}
		</svg>
	{/snippet}
</QR>
