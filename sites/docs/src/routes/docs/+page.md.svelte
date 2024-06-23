<script>
  import { packages } from '$lib/data/packages';
  import { createNpmBadgeUrl, createNpmUrl } from '$lib/utils/badge';

  import StatusBadge from './_page/components/StatusBadge.svelte';
</script>

# @svelte-put

<p class="c-callout c-callout--info c-callout--icon-bulb">
svelte-put is a collection of useful svelte actions, utilities, and minimal components extracted from (my) real world projects that might be helpful for yours.
</p>

## Packages

@svelte-put includes several packages with self-manged release cycles, listed below. Check out their corresponding documentation for more details.

<div
    class="not-prose c-gtable-4 max-w-full grid-cols-[198px,1fr,180px,80px] items-center *:p-4"
  >
    <p>ID</p>
    <p>Description</p>
    <p>Version</p>
    <p>Status</p>
    {#each Object.values(packages) as { id, description, name, path, status }}
      <p>
        <a href={path} class="c-link font-medium">
          {id}
        </a>
      </p>
      <p>{description}</p>
      <div class="flex items-center">
        <a href={createNpmUrl(name)} target="_blank" class="block" external>
          <img
            class="block rounded"
            src={createNpmBadgeUrl(name)}
            alt={name}
            width="180"
            height="22"
            loading="lazy"
            decoding="async"
          />
        </a>
      </div>
      <p class="flex items-center"><StatusBadge {status} /></p>
    {/each}
  </div>

## Inspiration & Acknowledgement

There is already a great pool of [svelte actions collected by Shawn and other contributors](https://github.com/sw-yx/svelte-actions) that you should check out. There might be some duplications here and there. However:

- Shawn's project aims to be a source for RFCs into Svelte; I believe stuff I am putting here should stay in user land.
- I prefer having separate packages for their dedicated purposes (instead of one package that exports everything).
- I want to incrementally include more than just actions int his collection.

For those reasons, a monorepo seems like a good fit, hence this project. To contribute or support the project, head over to the [contributing page](/docs/contributing).

Happy coding! 👨‍💻


<p class="text-right text-sm">
  <a class="c-link" href="https://github.com/vnphanquang/svelte-put/edit/main/sites/docs/src/routes/docs/_page/content.md.svelte">
    Edit this page on Github
  </a>
</p>

