<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';

	import { resolve } from '$app/paths';

	export const metadata = defineDocPageMetadata({
		group: 'Overview',
		title: 'Introduction',
	});
</script>

<script lang="ts">
	import { getAllPackageManifest } from '#lib/remotes';

	let packages = await getAllPackageManifest();
</script>

{markdown`
\`svelte-put\` is a collection of useful svelte actions, utilities, and minimal components extracted
from (my) real world projects that might be helpful for yours.

## Packages

The collection includes several packages, listed below, with self-managed release cycles. Check out
their corresponding documentation for more information.
`}

<table>
	<thead>
		<tr>
			<th class="text-start" scope="col">Package</th>
			<th class="text-start" scope="col">Version</th>
			<th class="text-start" scope="col">Description</th>
		</tr>
	</thead>
	<tbody>
		{#each packages as pkg (pkg.name)}
			{let name = pkg.name.replace('@svelte-put/', '')}
			<tr>
				<td>
					<a
						class="c-link whitespace-nowrap"
						href={resolve('/(docs)/packages/[pkg=pkg]/[...slug]', { pkg: name, slug: '' })}
					>
						{pkg.name}
					</a>
				</td>
				<td class="tabular-nums">{pkg.version}</td>
				<td>{pkg.description}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	tbody tr:nth-child(even) {
		background-color: oklch(from var(--color-fill-100) l c h / 20%);
	}
</style>
