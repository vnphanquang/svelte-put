<script lang="ts">
	import { copy } from '@svelte-put/copy';

	function onSyntheticCopy(e: ClipboardEvent) {
		const clipboardData = e.clipboardData;
		clipboardData?.getData('text/plain') ?? '';
		clipboardData?.setData('text/plain', 'no effect'); // [!code --]
	}
</script>
<button
	use:copy={{ synthetic: true }}
	oncopy={onSyntheticCopy}
	type="button"
>
	Click synthetic copy
</button>
