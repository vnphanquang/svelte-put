<script lang="ts">
  import { onMount } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  let mounted = false;
  onMount(() => (mounted = true));
</script>

<main
  class="grid h-screen w-screen place-content-center place-items-center gap-10 bg-fg bg-paper text-white"
>
  {#key mounted}
    <h1 class="flex items-end gap-1" in:fly={{ y: 20, duration: 1000, easing: cubicOut }}>
      <img src="/images/svelte-put-logo.svg" alt="svelte-put" width="60" height="60" />
      <span class="font-bold uppercase text-gradient-brand">svelte-put</span>
    </h1>
    <p in:fly={{ y: 20, duration: 1000, delay: 100, easing: cubicOut }}>
      Useful <a class="c-link underline" href="https://svelte.dev/" target="__blank">svelte</a> stuff
      to put in your projects
    </p>
    <ul class="flex items-center justify-center gap-10 text-sm font-bold uppercase">
      <li in:fly={{ y: 20, duration: 1000, delay: 200, easing: cubicOut }}>
        <a href="/docs" class="c-link" data-sveltekit-prefetch>Read Docs</a>
      </li>
      <li in:fly={{ y: 20, duration: 1000, delay: 300, easing: cubicOut }}>
        <a href="https://github.com/vnphanquang/svelte-put" class="c-link" target="__blank"
          >See Github</a
        >
      </li>
    </ul>
  {/key}
</main>
