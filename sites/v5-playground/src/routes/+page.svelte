<script>
  import QR from '@svelte-put/qr/img/QR.svelte';
</script>

<QR
  data="https://svelte-put.vnphanquang.com/docs/qr"
	logo="https://svelte-put.vnphanquang.com/images/svelte-put-logo.svg"
  moduleFill="violet"
  anchorOuterFill="red"
  anchorInnerFill="violet"
	backgroundFill="white"
	width="500"
	height="500"
	onqrinit={(element) => {
		console.log('QR initialized', element);
	}}
	onqrlogofetch={(logo) => {
		console.log('QR logo fetched', logo);
	}}
>
</QR>
