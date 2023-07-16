<script>
  import Avatar from '@svelte-put/avatar/Avatar.svelte';
</script>

<Avatar
  size={50}
  gravatar="billy.hargrove@domain.com"
  uiAvatar="Billy+Hargrove"
  let:alt
  let:src
  let:size
  let:sources
>
  <img {src} {alt} width={size} height={size} data-sources={sources} />
</Avatar>
