<script>
	import { modalStack } from './modal-stack';
</script>

<!-- notification portal, typically setup at somewhere global like root layout -->
<aside class="z-modal pointer-events-none fixed inset-0">
	{#each modalStack.items as modal (modal.config.id)}
		<div class="pointer-events-auto h-full w-full" use:modalStack.actions.render={modal}></div>
	{/each}
</aside>
