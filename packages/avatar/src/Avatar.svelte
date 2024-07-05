<script>
	import { resolveAlt, resolveSize, resolveSrc, DEFINITIVE_FALLBACK } from './avatar.utils.js';

	/** @type {import('./types.public').AvatarProps} */
	let { src, gravatar, uiAvatar, fallback, size, alt, class: cls = '', img, ...rest } = $props();

	let rAlt = $derived(resolveAlt(alt, gravatar, uiAvatar, src));
	let rSize = $derived(resolveSize(32, size, src, gravatar, uiAvatar));
	let sources = $derived(resolveSrc(src, gravatar, uiAvatar, fallback));
	let rSrc = $state(DEFINITIVE_FALLBACK);

	/** @type {HTMLImageElement | undefined} */
	let element = $state(undefined);

	$effect(() => {
		let rElement = element;
		if (img) {
			rElement = new Image();
			rElement.style.display = 'none';
			document.body.appendChild(rElement);
		}
		let currentSourceIndex = 0;
		if (rElement) {
			rElement.addEventListener('error', (_) => {
				if (currentSourceIndex < sources.length - 1) {
					currentSourceIndex++;
					rElement.src = rSrc = sources[currentSourceIndex];
				} else {
					rElement.src = rSrc = DEFINITIVE_FALLBACK;
				}
			});
			rElement.src = rSrc = sources[currentSourceIndex] ?? DEFINITIVE_FALLBACK;
		}
	});
</script>

<!--
  @component
  Svelte image wrapper component for displaying avatar
-->
{#if img}
	{@render img({ src: rSrc, size: rSize, alt: rAlt, sources })}
{:else}
	<img
		src={rSrc}
		alt={rAlt}
		height={rSize}
		width={rSize}
		class="svelte-put-avatar {cls}"
		data-sources={sources.join(',')}
		bind:this={element}
		{...rest}
	/>
{/if}

<style>
	:global(:where(.svelte-put-avatar)) {
		aspect-ratio: 1 / 1;
	}
</style>

