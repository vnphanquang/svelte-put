export class NotFoundVariantConfig extends Error {
	/**
	 * @param {string} variant
	 * @param {string[]} variants
	 */
	constructor(variant, variants) {
		super(
			`No config found for variant '${variant}'. Available variants: ${variants.join(', ')}`,
		);
	}
}

export class MissingComponentInCustomPush extends Error {
	constructor() {
		super('Notification custom push must have component property specified');
	}
}
