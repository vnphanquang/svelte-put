<script>
	import { Popover } from '@svelte-put/popover';

	const popover = new Popover();
</script>

<button class="c-btn" {...popover.control.attributes} use:popover.control.actions>
	Open me Popover
</button>

<div
	class="backdrop:bg-black backdrop:opacity-50 p-6"
	{...popover.target.attributes}
	use:popover.target.actions
>
	<p>Popover content. Click backdrop to dismiss</p>
</div>
