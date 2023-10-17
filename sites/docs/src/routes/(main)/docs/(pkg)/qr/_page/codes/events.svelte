<script lang="ts">
  import { qr as imgQR } from '@svelte-put/qr/img';
  import ImgQR from '@svelte-put/qr/img/QR.svelte';
  import { qr as svgQR } from '@svelte-put/qr/svg';
  import SvgQR from '@svelte-put/qr/svg/QR.svelte';

  const data = 'https://svelte-put.vnphanquang.com';
</script>

<svg use:svgQR={{ data }} on:qr:init={(e) => console.log(e.detail /** SVGElement */)} />

<SvgQR {data} on:qr:init={(e) => console.log(e.detail /** SVGElement */)} />

<img use:imgQR={{ data }} on:qr:init={(e) => console.log(e.detail /** ImgElement */)} alt="qr" />

<ImgQR
  {data}
  on:qr:init={(e) => console.log(e.detail /** ImgElement */)}
  on:qr:logofetch={(e) => console.log(e.detail /** string, the logo as base64 */)}
/>
