<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';
	import Playground from './components/playground.svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Interactive Playground',
	});
</script>

<script lang="ts">
	let config = $state({ data: 'https://example.com' });
	let json = $derived(JSON.stringify(config, null, 9).replace('}', '       }'));

	function onchange(c) {
		config = c;
	}
</script>

{markdown`
Use the playground below to customise a QR code to your need. Or use one of the examples
to get a feel of what is possible.
`}

<Playground {onchange} />

{markdown`
---

Example code for the above input & output:

~~~svelte
<script lang="ts">
	import type { QRConfig } from '@svelte-put/qr';
	import QR from '@svelte-put/qr/svg/QR.svelte';

	const config: QRConfig = JSON.parse(\`${json}\`);
</script>

<QR {...config} />
~~~
`}
