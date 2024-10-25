<script lang="ts">
	import { toast } from './toast';

	const message = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`;
</script>

<div class="flex flex-wrap gap-2 not-prose items-center">
	<button class="c-btn c-btn--outlined" onclick={() => toast.info(message)}>info</button>
	<button class="c-btn c-btn--outlined" onclick={() => toast.success(message)}>success</button>
	<button class="c-btn c-btn--outlined" onclick={() => toast.warning(message)}>warning</button>
	<button class="c-btn c-btn--outlined" onclick={() => toast.error(message)}>error</button>
</div>