<script lang="ts">
  import clsx from 'clsx';

  import { packagesByCategory } from '$data/packages';
  import EditThisPageLink from '$lib/ui/components/EditThisPageLink/EditThisPageLink.svelte';
  import ResourceLink from '$lib/ui/components/ResourceLink/ResourceLink.svelte';
  import StatusBadge from '$lib/ui/components/StatusBadge/StatusBadge.svelte';
  import Github from '$lib/ui/components/icons/Github.svelte';
  import { createNpmBadgeUrl, createNpmUrl } from '$lib/utils/badge';
  import { capitalize } from '$lib/utils/string';
</script>

<h1>@svelte-put</h1>

<p class="c-callout">
  a collection of useful svelte actions, components, and utilities extracted from real world
  projects.
</p>

<section>
  <h2 data-toc-strategy="self">Packages</h2>
  <p>
    <code>@svelte-put</code> includes several packages with self-managed release cycles, listed below.
    Check out their corresponding documentation page for more details.
  </p>

  {#each Object.entries(packagesByCategory) as [category, packages]}
    <section>
      <h3 id="{category}-packages">{capitalize(category)}</h3>
      <div
        class="not-prose c-gtable-4 grid max-w-full grid-cols-[198px,1fr,140px,80px] items-center bg-bg-accent/50 direct-children:p-4"
      >
        <p>ID</p>
        <p>Description</p>
        <p>Version</p>
        <p>Status</p>
        {#each packages as { id, description, name, path, status }}
          <p>
            <a href={path} class="c-link font-medium">
              {id}
            </a>
          </p>
          <p>{description}</p>
          <div class="flex items-center">
            <a href={createNpmUrl(name)} target="_blank" class="block" rel="noreferrer">
              <img
                class="block rounded"
                src={createNpmBadgeUrl(name)}
                alt={name}
                height="25"
                width="106"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>
          <p class="flex items-center"><StatusBadge {status} /></p>
        {/each}
      </div>
    </section>
  {/each}
</section>

<section>
  <h2>Inspiration & Acknowledgement</h2>
  <p>
    This is a collection of useful svelte utilities extracted from my real world projects that might
    be helpful for yours too.
  </p>
  <p>
    There is already a great pool of svelte
    <ResourceLink href="https://github.com/sw-yx/svelte-actions">
      svelte actions collected by Shawn and other contributors
    </ResourceLink>
    that you should check out. There might be some duplication here and there. However:
  </p>
  <ul>
    <li>
      Shawn's project aims to be a source for RFCs into svelte; I believe the stuff I am putting
      here should stay in user land.
    </li>
    <li>
      I prefer having separate packages for their dedicated purposes (instead of one package that
      exports everything).
    </li>
    <li>I want to incrementally include more than just actions in this collection.</li>
  </ul>
  <p>For those reasons, a monorepo seems like a good fit, hence this project.</p>
</section>

<section>
  <h2>Contributing</h2>
  <p>
    Source code can be found at
    <span class="">
      <ResourceLink key="github">
        github <Github class="inline-block h-6 w-6 align-top" />
      </ResourceLink>
    </span>. If you have any suggestions or found a bug, please read the
    <ResourceLink href="https://github.com/vnphanquang/svelte-put/blob/main/CONTRIBUTING.md"
      >Contributing Guidelines</ResourceLink
    > and
    <ResourceLink href="https://github.com/vnphanquang/svelte-put/issues"
      >open an issue</ResourceLink
    >.
  </p>
</section>

<p>Happy coding! 👨‍💻</p>

<p class="text-right">
  <EditThisPageLink
    href="https://github.com/vnphanquang/svelte-put/edit/main/apps/docs/src/routes/docs/+page.svelte"
  />
</p>
