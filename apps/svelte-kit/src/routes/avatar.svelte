<script lang="ts">
  import Avatar from '@svelte-put/avatar/Avatar.svelte';

  const invalidImageSrc = 'https://www.gravatar.com/avatar?d=404';
  const invalidEmail = 'aosdfij@oaisdfj.com';
  const user = {
    email: 'vnphanquang@gmail.com',
    firstName: 'Quang',
    lastName: 'Phan',
  };
</script>

<main>
  <Avatar src={invalidImageSrc} />

  <Avatar class="rounded-full" size={50} />

  <Avatar
    gravatar={user.email}
    class="rounded-full"
    size={50}
  />

  <Avatar
    gravatar={{ email: invalidEmail, default: 'monsterid' }}
    class="rounded-full"
    size={50}
  />

  <Avatar
    gravatar={invalidEmail}
    uiAvatar="{user.firstName}+{user.lastName}"
    class="rounded-full"
    size={50}
  />

  <Avatar
    src={invalidImageSrc}
    gravatar={invalidEmail}
    uiAvatar="John+Doe"
  >
    <svelte:fragment let:src>
      Overriding slot default. "src" is resolved to: {src}
    </svelte:fragment>
  </Avatar>
</main>


<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  :global(.rounded-full) {
    border-radius: 99999px;
  }
</style>
