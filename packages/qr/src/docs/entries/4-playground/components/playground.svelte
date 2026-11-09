<script lang="ts">
	import { onMount, tick } from 'svelte';

	import type { QRConfig } from '@svelte-put/qr';
	import { createQrPngDataUrl, createQrSvgDataUrl } from '@svelte-put/qr';
	import QR from '@svelte-put/qr/svg/QR.svelte';

	let { onchange }: { onchange: (config: QRConfig) => void } = $props();

	const DEFAULT_CONFIG = {
		data: 'https://example.com',
		shape: 'square',
		margin: 1,
		logo: undefined,
		logoRatio: 1,
		version: 0,
		correction: 'M',
		moduleFill: '#000000',
		anchorInnerFill: '#000000',
		anchorOuterFill: '#000000',
	} satisfies QRConfig;

	let data = $state(DEFAULT_CONFIG.data);
	let shape: QRConfig['shape'] = $state(DEFAULT_CONFIG.shape);
	let margin: QRConfig['margin'] = $state(DEFAULT_CONFIG.margin);

	let logo: QRConfig['logo'] = $state(DEFAULT_CONFIG.logo);
	let logoRatio: QRConfig['logoRatio'] = $state(DEFAULT_CONFIG.logoRatio);

	let moduleFill: QRConfig['moduleFill'] = $state(DEFAULT_CONFIG.moduleFill);
	let anchorInnerFill: QRConfig['anchorInnerFill'] = $state(DEFAULT_CONFIG.moduleFill);
	let anchorOuterFill: QRConfig['anchorOuterFill'] = $state(DEFAULT_CONFIG.anchorOuterFill);

	let useDefaultModuleFill = $state(true);
	let useDefaultAnchorInnerFill = $state(true);
	let useDefaultAnchorOuterFill = $state(true);

	let version: QRConfig['version'] = $state(DEFAULT_CONFIG.version);
	let correction: QRConfig['correction'] = $state(DEFAULT_CONFIG.correction);

	interface Example {
		title: string;
		img: string;
		config: QRConfig;
	}

	const EXAMPLES: Example[] = [
		{
			title: 'Svelte',
			img: 'https://svelte.dev/favicon.png',
			config: {
				data: 'https://svelte.dev',
				shape: 'circle',
				logo: 'https://svelte.dev/favicon.png',
				moduleFill: '#ff7800',
				anchorInnerFill: '#e66100',
				anchorOuterFill: '#ef4623',
			},
		},
		{
			title: 'DaisyUI',
			img: 'https://img.daisyui.com/images/daisyui/mark.svg',
			config: {
				data: 'https://daisyui.com',
				shape: 'circle',
				logo: 'https://img.daisyui.com/images/daisyui/mark-rotating.svg',
				moduleFill: '#f8e45c',
				anchorInnerFill: '#f8e45c',
				anchorOuterFill: '#f6d32d',
			},
		},
		{
			title: 'Vite',
			img: 'https://vite.dev/logo-without-border.svg',
			config: {
				data: 'https://vite.dev',
				shape: 'circle',
				logo: 'https://vite.dev/logo-without-border.svg',
				moduleFill: '#47BFFF',
				anchorInnerFill: '#7E14FF',
				anchorOuterFill: '#7E14FF',
			},
		},
		{
			title: 'Bluesky',
			img: 'https://web-cdn.bsky.app/static/favicon-32x32.png',
			config: {
				data: 'https://bsky.app',
				shape: 'circle',
				logo: 'https://web-cdn.bsky.app/static/favicon-32x32.png',
				moduleFill: '#62a0ea',
				anchorInnerFill: '#0f73ff',
				anchorOuterFill: '#0f73ff',
			},
		},
	];

	function useExample(title?: string) {
		const merged = title
			? {
					...DEFAULT_CONFIG,
					...EXAMPLES.find((p) => p.title === title)?.config,
				}
			: DEFAULT_CONFIG;

		useDefaultModuleFill = useDefaultAnchorInnerFill = useDefaultAnchorOuterFill = false;

		data = merged.data;
		shape = merged.shape;
		margin = merged.margin;

		logo = merged.logo;
		logoRatio = merged.logoRatio;

		moduleFill = merged.moduleFill;
		anchorInnerFill = merged.anchorInnerFill;
		anchorOuterFill = merged.anchorOuterFill;

		version = merged.version;
		correction = merged.correction;

		handleChange?.();
	}

	let resetCount = $state(0);
	function reset() {
		useExample();
		resetCount++;
	}

	let config = $derived.by(() => {
		const c: QRConfig = { data };

		if (shape !== DEFAULT_CONFIG.shape) c.shape = shape;
		if (margin !== DEFAULT_CONFIG.margin) c.margin = margin;

		if (logo) c.logo = logo;
		if (logoRatio !== DEFAULT_CONFIG.logoRatio) c.logoRatio = logoRatio;

		if (!useDefaultModuleFill) c.moduleFill = moduleFill;
		if (!useDefaultAnchorInnerFill) c.anchorInnerFill = anchorInnerFill;
		if (!useDefaultAnchorOuterFill) c.anchorOuterFill = anchorOuterFill;

		if (version !== DEFAULT_CONFIG.version) c.version = version;
		if (correction !== DEFAULT_CONFIG.correction) c.correction = correction;

		return c;
	});
	async function handleChange() {
		await tick();
		onchange?.(config);
	}

	let png = $derived('');
	let svg = $derived(createQrSvgDataUrl(config));
	onMount(async () => {
		png = await createQrPngDataUrl({ ...config, width: 500, height: 500 });
	});
</script>

<form class="not-md gap-4 space-y-4" onchange={handleChange}>
	<fieldset class="pbs-2 border border-current p-4">
		<legend>Examples</legend>
		<ul class="flex flex-wrap gap-4">
			{#each EXAMPLES as example (example.title)}
				<li>
					<button
						class="c-btn c-btn--pop min-w-24"
						type="button"
						onclick={() => useExample(example.title)}
					>
						<img class="h-6 w-6" src={example.img} width="24" height="24" alt="" />
						<span>{example.title}</span>
					</button>
				</li>
			{/each}
		</ul>
	</fieldset>

	<fieldset class="pbs-2 float-right ms-6 border border-current p-4">
		<legend>
			Output
			<span>
				<i class="i i-[ph--info] h-5 w-5"></i>
				<span class="c-infobox">
					QR is rendered <a class="c-link" href="../svg">as SVG</a>.
				</span>
			</span></legend
		>
		{#key resetCount}
			<svelte:boundary>
				<QR
					class="h-50 w-50"
					width="200"
					height="200"
					{data}
					{margin}
					{shape}
					{logo}
					{logoRatio}
					moduleFill={useDefaultModuleFill ? undefined : moduleFill}
					anchorInnerFill={useDefaultAnchorInnerFill ? undefined : anchorInnerFill}
					anchorOuterFill={useDefaultAnchorOuterFill ? undefined : anchorOuterFill}
					{version}
					{correction}
				/>
				<div class="flex justify-end gap-2 text-sm">
					<a class="c-btn c-btn--outlined px-2 py-1" href={svg} download="qr.svg">
						<i class="i i-[ph--download]"></i>
						SVG
					</a>
					<a class="c-btn c-btn--outlined px-2 py-1" href={png} download="qr.png">
						<i class="i i-[ph--download]"></i>
						PNG
					</a>
				</div>
				{#snippet failed(e)}
					<p class="text-error text-center">
						The input combination fails to produce a valid QR:
						{(e as Error)?.message}
						<br />
					</p>
					<button class="c-btn" onclick={reset} type="reset">Reset</button>
				{/snippet}
			</svelte:boundary>
		{/key}
	</fieldset>

	<fieldset class="pbs-2 border border-current p-4">
		<legend>General</legend>

		<div class="space-y-4">
			<label class="c-text-input">
				<span>Data<span class="text-error">*</span>:</span>
				<input type="text" name="data" id="data" bind:value={data} required />
			</label>

			<label class="c-select">
				<span>Shape: </span>
				<select bind:value={shape}>
					{#each ['square', 'circle'] as shape (shape)}
						<option value={shape}>
							<span>{shape}</span>
						</option>
					{/each}
				</select>
			</label>

			<label for="logo-ratio" class="c-number-input">
				<span>Margin:</span>
				<input type="number" name="margin" bind:value={margin} min="0" />
				<i class="c-infobox-anchor i i-[ph--info] h-5 w-5"></i>
				<span class="c-infobox">The quite zone along the edge of a QR</span>
			</label>
		</div>
	</fieldset>

	<fieldset class="pbs-2 border border-current p-4">
		<legend>Logo</legend>

		<div class="space-y-4">
			<label class="c-text-input">
				<span>Logo URL: </span>
				<input type="url" name="logo" bind:value={logo} />
				<i class="c-infobox-anchor i i-[ph--info] h-5 w-5 self-center"></i>
				<span class="c-infobox">It may takes a few seconds to fetch the image.</span>
			</label>

			<label for="logo-ratio" class="c-number-input">
				<span>Logo Ratio:</span>
				<input type="number" name="logo-ratio" bind:value={logoRatio} min="1" />
				<i class="c-infobox-anchor i i-[ph--info] h-5 w-5"></i>
				<span class="c-infobox">width : height, helpful when logo is not square</span>
			</label>
		</div>
	</fieldset>

	<fieldset class="pbs-2 border border-current p-4">
		<legend>
			Colors
			<span>
				<i class="i i-[ph--info] h-5 w-5"></i>
				<span class="c-infobox">
					Default for each color is <code>'currentcolor'</code>, which behaves as in CSS
				</span>
			</span>
		</legend>

		<div class="space-y-4">
			<div class="space-y-1">
				<div class="flex items-baseline justify-between gap-2">
					<label for="module-fill"> Module Fill: </label>
					<label class="mbs-1 flex items-center justify-end gap-2 text-sm">
						<span>Or, use default</span>
						<input
							class="c-checkbox"
							type="checkbox"
							name="use-module-fill-default"
							bind:checked={useDefaultModuleFill}
						/>
					</label>
				</div>
				<input
					class="c-color-input w-full"
					type="color"
					name="module-fill"
					id="module-fill"
					bind:value={moduleFill}
					disabled={useDefaultModuleFill}
				/>
			</div>

			<div class="space-y-1">
				<div class="flex items-baseline justify-between gap-2">
					<label for="anchor-inner-fill">Anchor Inner Fill: </label>
					<label class="flex items-center justify-end gap-2 text-sm">
						<span>Or, use default</span>
						<input
							class="c-checkbox"
							type="checkbox"
							name="use-default-anchor-inner-fill"
							bind:checked={useDefaultAnchorInnerFill}
						/>
					</label>
				</div>
				<input
					class="c-color-input w-full"
					type="color"
					name="anchor-inner-fill"
					id="anchor-inner-fill"
					bind:value={anchorInnerFill}
					disabled={useDefaultAnchorInnerFill}
				/>
			</div>

			<div class="space-y-1">
				<div class="flex items-baseline justify-between gap-2">
					<label for="anchor-inner-fill">Anchor Outer Fill: </label>
					<label class="flex items-center justify-end gap-2 text-sm">
						<span>Or, use default</span>
						<input
							class="c-checkbox"
							type="checkbox"
							name="use-default-anchor-outer-fill"
							bind:checked={useDefaultAnchorOuterFill}
						/>
					</label>
				</div>
				<input
					class="c-color-input w-full"
					type="color"
					name="anchor-outer-fill"
					id="anchor-outer-fill"
					bind:value={anchorOuterFill}
					disabled={useDefaultAnchorOuterFill}
				/>
			</div>
		</div>
	</fieldset>

	<fieldset class="pbs-2 border border-current p-4">
		<legend>Algorithm</legend>

		<div class="space-y-4">
			<label class="c-range">
				<span> Version: </span>
				<input type="range" min="0" max="40" step="1" name="version" bind:value={version} />
				<span>({version})</span>
				<i class="c-infobox-anchor i i-[ph--info] ms-auto h-5 w-5"></i>
				<span class="c-infobox">
					Also known as "type number", set as <code>0</code> for auto detection
				</span>
			</label>

			<label class="c-select">
				<span>Correction:</span>
				<select bind:value={correction}>
					{#each ['L', 'M', 'Q', 'H'] as level (level)}
						<option value={level}>
							<span>{level}</span>
						</option>
					{/each}
				</select>
			</label>
		</div>
	</fieldset>
</form>
