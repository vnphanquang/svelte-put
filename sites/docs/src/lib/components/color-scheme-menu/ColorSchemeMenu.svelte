<script lang="ts">
	import { clickoutside } from '@svelte-put/clickoutside';

	import { COLOR_SCHEMES } from '$lib/constants';
	import { getSettingsContext } from '$lib/contexts/settings';

	let cls = '';
	export { cls as class };

	const { colorScheme } = getSettingsContext();

	let open = false;

	function toggle(force?: boolean) {
		open = force ?? !open;
	}

	const LABELS = {
		light: 'Light',
		dark: 'Dark',
		system: 'System',
	};
</script>

<!-- eslint-disable svelte/valid-compile -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="color-scheme-menu csm relative {cls}">
	<label
		class="c-link c-link--icon grid cursor-pointer place-items-center rounded-2xl border border-current px-3 py-1"
		id="csm-toggler"
		on:click|stopPropagation
	>
		{#if $colorScheme === 'light'}
			<svg inline-src="lucide/sun" width="20" height="20" stroke-width="1.5" />
		{:else if $colorScheme === 'dark'}
			<svg inline-src="lucide/moon-star" width="20" height="20" stroke-width="1.5" />
		{:else}
			<svg inline-src="lucide/sliders-horizontal" width="20" height="20" stroke-width="1.5" />
		{/if}
		<input type="checkbox" bind:checked={open} class="sr-only" />
	</label>
	<div
		class="csm-dropdown"
		use:clickoutside={{ enabled: open }}
		on:clickoutside={() => toggle(false)}
	>
		<div class="overflow-hidden">
			<svg
				width="12"
				height="11"
				viewBox="0 0 12 11"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="csm-dropdown-arrow"
			>
				<path
					d="M8.16506 1.75L10.7631 6.25C11.7254 7.91667 10.5226 10 8.59808 10H3.40192C1.47742 10 0.274609 7.91667 1.23686 6.25L3.83494 1.75C4.79719 0.0833309 7.20281 0.0833325 8.16506 1.75Z"
					fill="white"
					stroke="currentcolor"
				/>
				<rect y="7" width="12" height="4" fill="white" />
			</svg>

			<ul class="relative rounded-lg border border-current bg-bg">
				{#each COLOR_SCHEMES as scheme}
					<li>
						<form
							method="GET"
							on:submit|preventDefault={() => {
								$colorScheme = scheme;
								toggle(false);
							}}
						>
							<label
								class="w-100% relative flex cursor-pointer items-center p-2.5 hover:text-link"
								class:text-link={scheme === $colorScheme}
							>
								<input type="submit" value={scheme} name="color-scheme" class="sr-only" />
								{#if scheme === 'light'}
									<svg inline-src="lucide/sun" width="20" height="20" stroke-width="1.5" />
								{:else if scheme === 'dark'}
									<svg inline-src="lucide/moon-star" width="20" height="20" stroke-width="1.5" />
								{:else}
									<svg inline-src="lucide/sliders-horizontal" width="20" height="20" stroke-width="1.5" />
								{/if}
								<span class="c-text-body2 ml-2">{LABELS[scheme]}</span>
							</label>
						</form>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style lang="postcss">
	.csm-dropdown {
		position: absolute;
		z-index: theme('zIndex.popup');
		top: calc(100% + 5px);
		left: 50%;
		transform: translate(-50%);

		display: grid;
		grid-template-rows: 0fr;

		width: max-content;

		transition: grid-template-rows 150ms ease-out;
	}

	.csm:has(#csm-toggler input:checked) .csm-dropdown {
		grid-template-rows: 1fr;
	}

	.csm-dropdown-arrow {
		position: relative;
		z-index: 2;
		top: 5px;
		left: 50%;
		transform: translateX(-50%);

		& rect,
		& path {
			fill: theme('colors.bg.DEFAULT');
		}
	}
</style>
