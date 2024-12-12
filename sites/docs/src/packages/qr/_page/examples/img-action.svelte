<script>
	import { qr } from '@svelte-put/qr/img';
</script>

<img
	use:qr={{
		data: 'https://svelte-put.vnphanquang.com/docs/qr',
		logo: 'https://svelte-put.vnphanquang.com/images/svelte-put-logo.svg',
		shape: 'circle',
		anchorInnerFill: 'gray',
		anchorOuterFill: 'gray',
		moduleFill: 'gray',
		width: 500,
		height: 500,
	}}
	alt="qr"
/>
