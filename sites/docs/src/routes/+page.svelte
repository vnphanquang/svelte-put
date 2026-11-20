<script lang="ts">
	import { PageMetadata } from '@vnphanquang/gach/metadata';

	import { asset, resolve } from '$app/paths';
</script>

<PageMetadata />

<main class="flex h-dvh flex-col items-center justify-center gap-10">
	<div class="flex items-end gap-6">
		<img src={asset('favicon.svg')} width="96" height="96" alt="" />
		<h1 class=" font-fingerpaint text-gradient-brand text-4xl tracking-wide">svelte-put</h1>
	</div>
	<p>
		Useful
		<a class="c-link" href="https://svelte.dev">svelte</a> stuff to put in your projects
	</p>
	<div class="flex items-center justify-between gap-10 text-sm uppercase">
		<a class="c-link-preserved text-link" href={resolve('/(docs)/[...slug]', { slug: 'overview' })}>
			Read Docs
		</a>
		<a
			class="c-link-preserved text-link"
			href="https://github.com/vnphanquang/svelte-put"
			data-external
		>
			See Github
		</a>
	</div>
</main>
