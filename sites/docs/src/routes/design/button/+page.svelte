<script>
	const variant_to_css = {
		default: 'c-btn',
		outlied: 'c-btn c-btn--outlined',
		pop: 'c-btn c-btn--pop',
		icon: 'c-btn c-btn--icon',
	};
</script>

<main class="mx-auto max-w-5xl p-10">
	<table class="border-collapse">
		<thead class="">
			<tr class="*:bg-bg-100 *:border *:p-4">
				<th scope="col">Variant</th>
				<th scope="col">Default</th>
				<th scope="col">No Icon</th>
				<th scope="col">Delayed</th>
				<th scope="col">Timeout</th>
				<th scope="col">Disabled</th>
			</tr>
		</thead>

		<tbody class="">
			{#each Object.entries(variant_to_css) as [variant, css]}
				<tr class="*:border *:p-4">
					<th class="text-left capitalize" scope="row">
						{variant}
					</th>
					<td>
						<button class={css}>
							<i class="i i-[info] h-6 w-6"></i>
							<span class:sr-only={variant === 'icon'}>Click me</span>
						</button>
					</td>
					<td>
						{#if variant !== 'icon'}
							<button class={css}>
								<span>Click me</span>
							</button>
						{/if}
					</td>
					<td>
						<button class={css} data-delayed>
							<i class="i i-[info] h-6 w-6"></i>
							<span class:sr-only={variant === 'icon'}>Click me</span>
						</button>
					</td>
					<td>
						<button class={css} data-timeout>
							<i class="i i-[info] h-6 w-6"></i>
							<span class:sr-only={variant === 'icon'}>Click me</span>
						</button>
					</td>
					<td>
						<button class={css} disabled>
							<i class="i i-[info] h-6 w-6"></i>
							<span class:sr-only={variant === 'icon'}>Click me</span>
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
