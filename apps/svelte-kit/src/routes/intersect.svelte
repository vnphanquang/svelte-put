<script lang="ts">
  import { intersect, type IntersectDetail } from '@svelte-put/intersect';

  let once = false;
  let onceEntry: IntersectionObserverEntry;
  let dynamic: boolean | undefined = undefined;
  let dynamicEntry: IntersectionObserverEntry;

  function onOnce(event: CustomEvent<IntersectDetail>) {
    onceEntry = event.detail.entries[0];
    once = true;
  }

  function onDynamic(event: CustomEvent<IntersectDetail>) {
    dynamicEntry = event.detail.entries[0];
    dynamic = dynamicEntry.isIntersecting;
  }

  function entryObject(entry: IntersectionObserverEntry) {
    return {
      boundingClientRect: entry.boundingClientRect,
      intersectionRatio: entry.intersectionRatio,
      intersectionRect: entry.intersectionRect,
      isIntersecting: entry.isIntersecting,
      rootBounds: entry.rootBounds,
      target: {
        id: entry.target.id,
        className: entry.target.className,
        tagName: entry.target.tagName,
      },
    };
  }
</script>

<title>intersect | @svelte-put</title>

<main class="flex-1 flex-col p-4 grid gap-y-10">
  <h1 class="t-10 text-center text-4xl font-bold">@svelte-put/intersect</h1>
  <div class="flex-1 grid gap-y-10 text-center">
    <section class="p-8 h-screen grid place-items-center bg-bg-accent">
      <p>A static section</p>
    </section>
    <section
      class="
        p-8 h-[800px] grid place-items-center bg-bg-accent
        {once ? 'animate-fade-in-up' : 'opacity-0'}
      "
      use:intersect={{ threshold: 0.4 }}
      on:intersectonce={onOnce}
    >
      <p>A section that will fade in once, when intersected with viewport by 40%, and stays static afterwards.</p>
      <div class='text-left px-10'>
        <p>First IntersectionObserverEntry:</p>
        {#if onceEntry}
          <ul>
            {#each Object.entries(entryObject(onceEntry)) as [key, value]}
              <li class="mt-2">{key}: {JSON.stringify(value)}</li>
            {/each}
          </ul>
        {/if}
      </div>
    </section>
    <section
      class="p-8 h-[800px] grid place-items-center bg-bg-accent"
      use:intersect={{ threshold: 0.4 }}
      on:intersect={onDynamic}
    >
      {#if dynamic !== undefined}
        <p class="self-start">Scrolling {dynamic ? 'into view' : 'out of view'}...</p>
      {/if}
      <p>A section that reacts to when scrolling in view (intersecting === true) and scrolling out of view (intersecting === false)</p>
      <div class='text-left px-10'>
        <p>Latest IntersectionObserverEntry:</p>
        {#if dynamicEntry}
          <ul>
            {#each Object.entries(entryObject(dynamicEntry)) as [key, value]}
              <li class="mt-2">{key}: {JSON.stringify(value)}</li>
            {/each}
          </ul>
        {/if}
      </div>
      {#if dynamic !== undefined}
        <p class="self-end">Scrolling {dynamic ? 'into view' : 'out of view'}...</p>
      {/if}
    </section>
    <section class="p-8 h-screen grid place-items-center bg-bg-accent">
      <p>Another static section</p>
    </section>
  </div>
</main>
