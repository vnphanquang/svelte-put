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

<main class="grid flex-1 flex-col gap-y-10 p-4">
  <h1 class="t-10 text-center text-4xl font-bold">@svelte-put/intersect</h1>
  <div class="grid flex-1 gap-y-10 text-center">
    <section class="grid h-screen place-items-center bg-bg-accent p-8">
      <p>A static section</p>
    </section>
    <section
      class="
        grid h-[800px] place-items-center bg-bg-accent p-8
        {once ? 'animate-fade-in-up' : 'opacity-0'}
      "
      use:intersect={{ threshold: 0.4 }}
      on:intersectonce={onOnce}
    >
      <p>
        A section that will fade in once, when intersected with viewport by 40%, and stays static
        afterwards.
      </p>
      <div class="px-10 text-left">
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
      class="grid h-[800px] place-items-center bg-bg-accent p-8"
      use:intersect={{ threshold: 0.4 }}
      on:intersect={onDynamic}
    >
      {#if dynamic !== undefined}
        <p class="self-start">Scrolling {dynamic ? 'into view' : 'out of view'}...</p>
      {/if}
      <p>
        A section that reacts to when scrolling in view (intersecting === true) and scrolling out of
        view (intersecting === false)
      </p>
      <div class="px-10 text-left">
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
    <section class="grid h-screen place-items-center bg-bg-accent p-8">
      <p>Another static section</p>
    </section>
  </div>
</main>
