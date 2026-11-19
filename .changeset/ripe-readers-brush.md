---
'@svelte-put/qr': patch
---

draw QR modules and logo separately in `createQrPngDataUrl` to avoid race condition (empty logo when exported)
