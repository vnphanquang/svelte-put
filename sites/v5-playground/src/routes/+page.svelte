<script>
	// eslint-disable-next-line no-undef
	let name = $state('world');
	let obj = {
		key: 'value',
	};
	function func() {
		return 'func';
	}
</script>

<h2>Hello {name}! {obj.key} {func()} {name === 'a' ? 1 : 2}</h2>

<h3 id="override">Something H3</h3>

<svg data-inline-src="phosphor/acorn" width="500" height="500" class="text-blue-500"></svg>

<p>something else</p>
