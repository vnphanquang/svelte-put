<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  import SveltePutLogoAnimation from '$client/components/SveltePutLogoAnimation.svelte';

  let animationOpen = false;
  function open() {
    animationOpen = true;
  }
  function close() {
    animationOpen = false;
  }

  let innerWidth = Infinity;
  let mounted = false;
  $: if (innerWidth < 768) {
    tick().then(open);
  } else {
    close();
  }
  onMount(async () => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>svelte-put</title>
  <meta
    name="description"
    content="Collection of utilities, components, and tooling for svelte projects"
  />
</svelte:head>

<svelte:window bind:innerWidth />

<main class="text-center">
  {#key mounted}
    <div
      class="grid h-screen w-screen place-content-center place-items-center gap-10"
      class:hidden={!mounted}
    >
      <SveltePutLogoAnimation open={animationOpen} class="ml-1 scale-75" />

      <h1
        class="font-fingerpaint text-4xl text-gradient-brand"
        in:fly={{ y: 20, duration: 1000, easing: cubicOut }}
      >
        svelte-put
      </h1>

      <p in:fly={{ y: 20, duration: 1000, delay: 100, easing: cubicOut }}>
        Useful <a
          class="c-link underline"
          href="https://svelte.dev/"
          target="_blank"
          rel="noreferrer">svelte</a
        > stuff to put in your projects
      </p>
      <ul
        class="flex items-center justify-center gap-10 text-sm font-bold uppercase"
        on:mouseenter={open}
        on:mouseleave={close}
      >
        <li in:fly={{ y: 20, duration: 1000, delay: 200, easing: cubicOut }}>
          <a href="/docs" class="c-link" data-sveltekit-preload-data>Read Docs</a>
        </li>
        <li in:fly={{ y: 20, duration: 1000, delay: 400, easing: cubicOut }}>
          <a
            href="https://github.com/vnphanquang/svelte-put"
            class="c-link"
            target="_blank"
            rel="noreferrer">See Github</a
          >
        </li>
      </ul>
    </div>
  {/key}
</main>
