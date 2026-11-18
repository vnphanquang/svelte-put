<script lang="ts">
	import { notiStack } from '../../../../components/noti-stack';
	import Portal from '../../../../components/portal.svelte';
</script>

<Portal stack={notiStack} />

<div class="border-primary border p-4">
	<button class="c-btn" onclick={() => notiStack.push('timeout')}>
		Push an auto-timeout notification
	</button>
</div>
