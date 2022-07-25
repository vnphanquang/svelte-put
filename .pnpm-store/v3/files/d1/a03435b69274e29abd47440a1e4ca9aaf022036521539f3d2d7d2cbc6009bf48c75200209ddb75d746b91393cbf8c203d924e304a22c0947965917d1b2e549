/**
 * Run a `semantic-release` lifecycle step function after all plugin-provided
 * step functions have run. This utility allows injecting into the `semantic-release`
 * plugin system to augment its functionality without making assumptions about what
 * plugins have been configured.
 *
 * This utility returns an array to be explicitly passed to the lifecycle step configuration,
 * effectively overriding the `semantic-release` plugin configuration for that lifecycle step.
 * Since we don't know ahead of time how many `semantic-release` plugins have been configured,
 * this function returns a length 10 array of step functions to allow for up to 9 plugins plus
 * the appended step function.
 *
 * @param {string} stepName Name of the `semantic-release` lifecycle step (e.g. "verifyConditions").
 * @param {Function} stepFn Function to run after all plugins with a definition for this step have run.
 * Receives the results of all plugin-provided step functions in `context.stepResults`.
 * @param {Object} options
 * @param {*} options.defaultReturn Value to return when no step definition is found.
 * @param {string} options.wrapperName Name that identifies the wrapped functions in `semantic-release`'s
 * debug output (will display as "anonymous" by default).
 */
const appendStep = (
  stepName,
  stepFn,
  { defaultReturn = undefined, wrapperName = '' } = {}
) => {
  const results = [];

  return Array(10)
    .fill(null)
    .map((value, index) => {
      const wrapperFn = async (pluginConfig, context) => {
        const {
          options: { plugins },
        } = context;
        const pluginDefinition = plugins[index];
        const pluginName = Array.isArray(pluginDefinition)
          ? pluginDefinition[0]
          : pluginDefinition;

        if (index === plugins.length) {
          return stepFn(pluginConfig, {
            ...context,
            stepResults: await Promise.all(results),
          });
        }

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

        const result = step(pluginConfig, context);
        results.push(result);
        return result;
      };

      Object.defineProperty(wrapperFn, 'name', { value: wrapperName });

      return wrapperFn;
    });
};

module.exports = appendStep;
