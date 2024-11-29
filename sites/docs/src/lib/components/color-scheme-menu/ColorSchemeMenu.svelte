<script lang="ts">
	import { clickoutside } from '@svelte-put/clickoutside';
	import type { HTMLAttributes } from 'svelte/elements';

	import { COLOR_SCHEMES } from '$lib/constants';
	import { SettingsContext } from '$lib/settings/context.svelte';

	let { class: cls, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
	let open = $state(false);
	let settings = SettingsContext.get();

	function toggle(force?: boolean) {
		open = force ?? !open;
	}

	const LABELS = {
		light: 'Light',
		dark: 'Dark',
		system: 'System',
	} satisfies Record<App.ColorScheme, string>;

	const iconClassMap = {
		light: 'i-[sun]',
		dark: 'i-[moon-stars]',
		system: 'i-[desktop]',
	} satisfies Record<App.ColorScheme, string>;
</script>

{#snippet icon(scheme: App.ColorScheme)}
	<span class="i {iconClassMap[scheme]} h-6 w-6 shrink-0"></span>
{/snippet}

<div class="color-scheme-menu csm relative {cls}" {...rest}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<label
		class="c-btn c-btn--icon grid grid-cols-[auto_auto] gap-2"
		id="csm-toggler"
		onclick={(e) => e.stopPropagation()}
	>
		<span class="sr-only">{settings.colorScheme}</span>
		{@render icon(settings.colorScheme)}
		<input type="checkbox" bind:checked={open} class="sr-only" />
		<i class="i i-[caret-down] h-5 w-5 transition-transform" class:rotate-180={open}></i>
	</label>
	<div
		class="csm-dropdown"
		use:clickoutside={{ enabled: open }}
		onclickoutside={() => toggle(false)}
		inert={!open}
	>
		<div class="overflow-hidden">
			<ul class="bg-bg relative border">
				{#each COLOR_SCHEMES as scheme}
					<li class="border-b last:border-b-0">
						<form
							method="GET"
							onsubmit={(e) => {
								e.preventDefault();
								settings.colorScheme = scheme;
								toggle(false);
							}}
						>
							<label
								class="c-btn c-btn--outlined focus-within:bg-bg-200 justify-start gap-4 border-none px-4
								py-2 focus-within:outline-none"
								class:text-primary={scheme === settings.colorScheme}
							>
								<input type="submit" value={scheme} name="color-scheme" class="sr-only" />
								{@render icon(scheme)}
								<span class="text-sm">{LABELS[scheme]}</span>
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
		z-index: var(--z-index-popup);
		top: calc(100% + var(--spacing) * 2);
		right: 0;

		display: grid;
		grid-template-rows: 0fr;

		width: max-content;

		transition: grid-template-rows 150ms var(--default-transition-timing-function);

		.csm:has(#csm-toggler input:checked) & {
			grid-template-rows: 1fr;
		}
	}

	.csm-caret {
		transition: transform 150ms var(--default-transition-timing-function);

		.csm:has(#csm-toggler input:checked) & {
			transform: rotate(180deg);
		}
	}
</style>
