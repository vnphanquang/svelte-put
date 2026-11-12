<script>
	import Avatar from '@svelte-put/avatar/Avatar.svelte';
</script>
<!-- ---cut--- -->
<Avatar gravatar="billy.hargrove@upside.down" uiAvatar="Billy+Hargrove" size={50}>
	{#snippet img({ src, size, alt, sources })}
		<img {src} {alt} width={size} height={size} data-sources={sources} />
	{/snippet}
</Avatar>