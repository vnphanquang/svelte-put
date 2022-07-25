/**
 * Wrap each `semantic-release` lifecycle step function to inject custom logic into
 * `semantic-release`'s plugin system, augmenting its functionality without making
 * assumptions about what plugins have been configured.
 *
 * This utility returns an array to be explicitly passed as the configuration for the lifecycle
 * step to be augmented, effectively overriding the `semantic-release` plugin configuration for
 * that lifecycle step. Since we don't know ahead of time how many `semantic-release` plugins
 * have been configured, this function returns a length 10 array of step functions to allow for
 * a configuration of up to 9 plugins plus the appended step function.
 *
 * @param {string} stepName Name of the `semantic-release` lifecycle step (e.g. "verifyConditions").
 * @param {Function} wrapFn Function wrapping each plugin-provided step function. Accepts the stepFn
 * and returns a wrapped version.
 * @param {Object} options
 * @param {*} options.defaultReturn Value to return when no step definition is found.
 * @param {*} options.wrapperName Name that identifies the wrapped functions in `semantic-release`'s
 * debug output (will display as "anonymous" by default).
 */
const wrapStep = (
  stepName,
  wrapFn,
  { defaultReturn = undefined, wrapperName = '' } = {}
) => {
  return Array(10)
    .fill(null)
    .map((value, index) => {
      const wrapperFn = async function(_, context) {
        const {
          options: { plugins },
        } = context;
        const pluginDefinition = plugins[index];
        const [pluginName, pluginConfig] = Array.isArray(pluginDefinition)
          ? pluginDefinition
          : [pluginDefinition, {}];

        if (!pluginName) {
          return defaultReturn;
        } else if (typeof pluginName !== 'string') {
          throw new Error(
            `${
              wrapperName ? wrapperName : 'semantic-release-plugin-decorators'
            }: Incorrect plugin name type. Expected string but was ${JSON.stringify(
              pluginName
            )}.`
          );
        }

        const plugin = require(pluginName);
        const step = plugin && plugin[stepName];

        if (!step) {
          return defaultReturn;
        }

        return wrapFn(step)(pluginConfig, context);
      };

      Object.defineProperty(wrapperFn, 'name', { value: wrapperName });

      return wrapperFn;
    });
};

module.exports = wrapStep;
