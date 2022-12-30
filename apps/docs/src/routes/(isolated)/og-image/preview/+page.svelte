<script lang="ts">
  import { dragscroll } from '@svelte-put/dragscroll';

  import { packages } from '$shared/data/packages';

  import OgImage from '../OgImage.svelte';
</script>

<ul class="flex h-screen cursor-move flex-col overflow-y-auto" use:dragscroll={{ axis: 'y' }}>
  {#each ['', ...Object.keys(packages)] as pkg}
    <li class="h-screen w-screen">
      <OgImage {pkg} />
    </li>
  {/each}
</ul>

<style>
  ul {
    scroll-snap-type: y mandatory;
    scroll-snap-stop: always;
    scroll-snap-points-y: repeat(100vh);
  }

  li {
    scroll-snap-align: start;
  }
</style>
