export class Test {
	state = $state(0);

	/**
	 * @param {number} _state
	 */
	constructor(_state) {
		this.state = _state;

		$effect(() => {
			console.log('state', this.state);
		});
	}

	action = (node) => {
		console.log(node)
	};
}
