<script>
  import { uiAvatar } from '@svelte-put/avatar';
  import Avatar from '@svelte-put/avatar/Avatar.svelte';

  const uiAvatarUrl = uiAvatar({
    name: 'Steve+Harrington',
    background: 'FFFFFF',
    color: '000000',
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
