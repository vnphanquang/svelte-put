<script lang="ts">
  import { lockscroll } from '@svelte-put/lockscroll';

  let locked = false;
</script>

<button class="c-btn mx-auto" on:click={() => (locked = !locked)}
  >Toggle lock scroll for below section</button
>
<section class="mt-4 max-h-[400px] overflow-auto rounded bg-bg-soft px-6" use:lockscroll={locked}>
  {#each new Array(10) as _}
    <p>
      What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
      an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
      survived not only five centuries, but also the leap into electronic typesetting, remaining
      essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
      containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
      PageMaker including versions of Lorem Ipsum.
    </p>
  {/each}
</section>