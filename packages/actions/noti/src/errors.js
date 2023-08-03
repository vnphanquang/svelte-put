export class NotFoundVariantConfig extends Error {
  /**
   * @param {string} variant
   * @param {import('./store').NotificationStoreBuilder} builder
   */
  constructor(variant, builder) {
    super(
      `No config found for variant '${variant}'. Available variants: ${Object.keys(
        builder.variantConfigMap,
      ).join(', ')}`,
    );
  }
}

export class MissingComponentInCustomPush extends Error {
  constructor() {
    super('Notification custom push must have component property specified');
  }
}
