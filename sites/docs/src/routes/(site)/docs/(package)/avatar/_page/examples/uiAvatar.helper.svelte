<script>
	import { uiAvatar } from '@svelte-put/avatar';
	import Avatar from '@svelte-put/avatar/Avatar.svelte';

	const uiAvatarUrl = uiAvatar({
		name: 'Steve+Harrington',
		background: '313131',
		color: 'FFFFFF',
		'font-size': 0.3,
		uppercase: true,
		rounded: true,
		length: 3,
		bold: true,
		size: 50,
		format: 'svg',
	});
</script>

<Avatar src={uiAvatarUrl} />

<!-- or simply -->
<!-- <img src={gravatarUrl} alt="a ui avatar" /> -->
