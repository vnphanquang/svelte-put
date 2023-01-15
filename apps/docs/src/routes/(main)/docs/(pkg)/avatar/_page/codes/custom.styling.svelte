<script>
  import Avatar from '@svelte-put/avatar/Avatar.svelte';
  /** passed from parent */
  export let color = 'blue';
</script>

<Avatar
  src="https://img.freepik.com/free-photo/adorable-jack-russell-retriever-puppy-portrait_53876-64825.jpg?w=2000"
  uiAvatar="Jim+Hopper"
  size={50}
  class="custom-avatar rounded-full"
  --border-color={color}
  crossorigin="anonymous"
/>

<style lang="postcss">
  :global(.custom-avatar) {
    border: 2px var(--border-color) solid;
    box-shadow: 0 0 0 10px hsl(0deg 0% 50%), 0 0 0 15px hsl(0deg 0% 60%),
      0 0 0 20px hsl(0deg 0% 70%), 0 0 0 25px hsl(0deg 0% 80%), 0 0 0 30px hsl(0deg 0% 90%);
  }
</style>
