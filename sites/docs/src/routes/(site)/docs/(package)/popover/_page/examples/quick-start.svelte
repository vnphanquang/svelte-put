<script>
	import { Popover } from '@svelte-put/popover';

	const popover = new Popover();
</script>

<button class="c-btn" {...popover.control.attributes} use:popover.control.actions>
	Open me Popover
</button>

<div
	class="fixed inset-0 p-6 backdrop:bg-black backdrop:opacity-50"
	{...popover.target.attributes}
	use:popover.target.actions
>
	<p>Popover content. Click backdrop to dismiss</p>
</div>
