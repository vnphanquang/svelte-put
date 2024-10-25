<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	const p = tweened(0);
	onMount(() => {
		p.set(1, {
			duration: 8000,
			easing(t) {
				const steps = [0, 0.2, 0.6, 0.75, 1] as const;
				for (let i = 0; i < steps.length; i++) {
					if (t < steps[i]) {
						const stepDuration = steps[i] - steps[i - 1];
						return cubicInOut((t - steps[i - 1]) / stepDuration) * stepDuration + steps[i - 1];
					}
				}
				return 1;
			},
		});
	});
</script>

<div
	class="fixed left-0 right-0 top-0 z-notification h-0.5 w-full"
	style="--percentage: {$p * 100}%"
>
	<progress max="100" value={$p * 100} aria-label="page loading" class="invisible">{$p}%</progress>
	<div
		class="absolute left-0 top-0 h-full bg-orange"
		style:width="var(--percentage)"
		aria-disabled="true"
	></div>
</div>

