<script lang="ts">
	import { notiStack } from '../../../components/noti-stack';
	import Portal from '../../../components/portal.svelte';

	function pushToast() {
		notiStack.push('timeout');
	}

	function pushPersistent() {
		notiStack.push('persistent');
	}
</script>

<Portal stack={notiStack} />

<div class="border-primary flex flex-wrap gap-2 border p-4">
	<button class="c-btn" onclick={pushToast}> Push an auto-timeout notification </button>
	<button class="c-btn" onclick={pushPersistent}> Push a persistent notification </button>
</div>
