<script>
	import { setContext } from 'svelte';

	import { notiStack } from '#lib/noti';

	setContext('app:noti', notiStack);
</script>
