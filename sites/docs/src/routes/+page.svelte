<script lang="ts">
	import { SOCIAL_LINKS } from "$lib/constants";

</script>

<main class="h-dvh flex items-center flex-col justify-center gap-10">
	<div class="flex items-end gap-6">
		<svg inline-src="svelte-put" height="100" width="100" />
		<h1 class=" text-4xl c-text-h1 font-fingerpaint text-gradient-brand">svelte-put</h1>
	</div>
	<p>
		Useful
		<a class="c-link" href="https://svelte.dev">svelte</a> stuff to put in your projects
	</p>
	<div class="flex items-center justify-between gap-10 uppercase text-sm">
		<a class="c-link c-link--preserved text-link" href="/docs">
			Read Docs
		</a>
		<a class="c-link c-link--preserved text-link" href={SOCIAL_LINKS.GITHUB} external>
			See Github
		</a>
	</div>
</main>
