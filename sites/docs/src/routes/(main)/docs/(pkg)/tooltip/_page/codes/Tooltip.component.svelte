<script>
  // (optional) props injected by @svelte-put/tooltip at runtime
  export let visible = false;
  // your props
  export let content = 'Placeholder content';

  $: console.log('visibility state', visible);
</script>

<p class="m-0 p-0 text-gradient-brand text-lg">{content}</p>
