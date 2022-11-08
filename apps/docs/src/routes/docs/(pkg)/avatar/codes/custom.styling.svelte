<script>
  import Avatar from '@svelte-put/avatar/Avatar.svelte';
  /** passed from parent */
  export let color = 'blue';
</script>

<Avatar
  src="https://images.unsplash.com/photo-1597838816882-4435b1977fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=849&q=80"
  uiAvatar="Jim+Hopper"
  size={50}
  class="custom-avatar rounded-full"
  --border-color={color}
/>

<style lang="postcss">
  :global(.custom-avatar) {
    border: 2px var(--border-color) solid;
    box-shadow: 0 0 0 10px hsl(0, 0%, 50%), 0 0 0 15px hsl(0, 0%, 60%), 0 0 0 20px hsl(0, 0%, 70%),
      0 0 0 25px hsl(0, 0%, 80%), 0 0 0 30px hsl(0, 0%, 90%);
  }
</style>
