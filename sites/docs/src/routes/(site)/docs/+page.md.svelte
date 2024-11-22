<script>
	import { packages } from '$lib/data/packages';
	import { StatusBadge } from '$lib/components/status-badge';
	import { createNpmBadgeUrl, createNpmUrl } from '$lib/utils/badge';
</script>

# @svelte-put

<p class="c-callout c-callout--info c-callout--icon-bulb">
	svelte-put is a collection of useful svelte actions, utilities, and minimal components extracted
	from (my) real world projects that might be helpful for yours.
</p>

## Packages

`@svelte-put` includes several packages with self-manged release cycles, listed below. Check out their corresponding documentation for more details.

<table class="not-prose border-collapse w-full">
  <thead>
    <tr class="*:text-left *:p-4 *:border *:bg-bg-100">
      <th>ID</th>
      <th>Desrciption</th>
      <th>Version</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody class="*:even:bg-bg-100/50">
    {#each Object.values(packages) as { id, description, name, path, status, releaseTag }}
    <tr class="*:border *:p-4">
      <td>
        <a href={path} class="c-link font-medium">
          {id}
        </a>
      </td>
      <td>{description}</td>
      <td class="w-40">
        <a href={createNpmUrl(name)} target="_blank" class="block" data-external>
          <img
            class="block rounded"
            src={createNpmBadgeUrl(name, releaseTag)}
            alt={name}
            width="180"
            height="22"
            loading="lazy"
            decoding="async"
          />
        </a>
      </td>
      <td class=""><StatusBadge {status} /></td>
    </tr>
    {/each}
  </tbody>
</table>


## Inspiration & Acknowledgement

There is already a great pool of [svelte actions collected by Shawn
and other contributors](https://github.com/sw-yx/svelte-actions) that you should check out. There
might be some duplications here and there. However:

- Shawn's project aims to be a source for RFCs into Svelte; I believe stuff I am putting here should stay in user land.
- I prefer having separate packages for their dedicated purposes (instead of one package that exports everything).
- I want to incrementally include more than just actions int his collection.

For those reasons, a monorepo seems
like a good fit, hence this project. To contribute or support the project, head over to the
[contributing page](/docs/contributing). Happy coding! 👨‍💻

<p class="text-right text-sm">
	<a
		class="c-link"
		href="https://github.com/vnphanquang/svelte-put/edit/main/sites/docs/src/routes/(site)/docs/+page.md.svelte"
	>
		Edit this page on Github
	</a>
</p>

