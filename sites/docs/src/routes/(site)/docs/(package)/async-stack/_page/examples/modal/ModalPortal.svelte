<script>
	import { modalStack } from './modal-stack';
</script>

<!-- notification portal, typically setup at somewhere global like root layout -->
<aside class="pointer-events-none fixed inset-0 z-modal">
	{#each modalStack.items as modal (modal.config.id)}
		<div
			class="pointer-events-auto w-full h-full"
			use:modalStack.actions.render={modal}
		></div>
	{/each}
</aside>

