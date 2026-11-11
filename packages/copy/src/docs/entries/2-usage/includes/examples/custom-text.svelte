<script lang="ts">
	import { copy, type TextResolverInput } from '@svelte-put/copy';

	function copyText(input: TextResolverInput<'click'>) {
		const { node, event, trigger } = input;
		return 'text to be copied';
	}
</script>
<button use:copy={{ text: copyText }} type="button">Click</button>