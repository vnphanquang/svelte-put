<script>
  import QR from '@svelte-put/qr/img/QR.svelte';
</script>

<QR
  data="https://svelte.dev"
  logo="https://raw.githubusercontent.com/sveltejs/branding/master/svelte-logo.svg"
  logoRatio={107 / 128}
  shape="square"
	anchorInnerFill="tomato"
	anchorOuterFill="tomato"
	moduleFill="tomato"
  let:src
>
  <img {src} alt="qr" />
</QR>