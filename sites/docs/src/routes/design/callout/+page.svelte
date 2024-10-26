<script lang="ts">
	const status_modifiers = [
		'c-callout--info',
		'c-callout--success',
		'c-callout--warning',
		'c-callout--error',
	];

	const icon_modifiers = [
		'c-callout--icon-bulb',
		'c-callout--icon-confetti',
		'c-callout--icon-megaphone',
		'c-callout--icon-question',
		'c-callout--icon-trophy',
	];

	const text =
		'This is a sample “callout” that enhances a text block with some contextual meaning.\
	It is used in blog posts to better draw user attention. See real usage at this blog post\
	“Productive Dark Mode with SvelteKit, PostCSS, and TailwindCSS (Behind the Screen)”';
</script>

<main class="mx-auto max-w-5xl space-y-10 p-10">
	{#each status_modifiers as css}
		<p class="c-callout {css}">{text}</p>
	{/each}
	{#each icon_modifiers as css}
		<p class="c-callout {css}">{text}</p>
	{/each}
</main>
