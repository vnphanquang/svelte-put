<script>
	import { gravatar } from '@svelte-put/avatar';
	import Avatar from '@svelte-put/avatar/Avatar.svelte';

	const gravatarUrl = gravatar({
		email: 'willbyers@domain.com',
		rating: 'r',
		size: 50,
		default: 'retro',
		// forcedefault: 'y',
	});
</script>

<Avatar src={gravatarUrl} />

<!-- or simply -->
<!-- <img src={gravatarUrl} alt="a gravatar" /> -->
